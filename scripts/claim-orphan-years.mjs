// One-off migration from the single-user version: creates (or finds) the owner
// account and hands it every pf_years row that has no userId yet.
//
// Credentials come from the environment so they never land in git:
//   OWNER_NAME="..." OWNER_EMAIL="..." OWNER_PHONE="01..." OWNER_PASSWORD="..." \
//     node --env-file=.env.local scripts/claim-orphan-years.mjs
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { MONGODB_URI, OWNER_NAME, OWNER_EMAIL, OWNER_PHONE, OWNER_PASSWORD } = process.env;

if (!MONGODB_URI) throw new Error("MONGODB_URI missing — run with --env-file=.env.local");
if (!OWNER_NAME || !OWNER_PHONE || !OWNER_PASSWORD) {
  throw new Error("Set OWNER_NAME, OWNER_PHONE and OWNER_PASSWORD (OWNER_EMAIL optional)");
}

await mongoose.connect(MONGODB_URI);
const db = mongoose.connection.db;
const users = db.collection("users");
const years = db.collection("pf_years");

// Same indexes the User model declares, so the first register call doesn't race them.
await users.createIndex({ phone: 1 }, { unique: true });
await users.createIndex({ email: 1 }, { unique: true, sparse: true });

const email = OWNER_EMAIL ? OWNER_EMAIL.trim().toLowerCase() : undefined;
const phone = OWNER_PHONE.replace(/\D/g, "").replace(/^880/, "0");

let owner = await users.findOne({ $or: [{ phone }, ...(email ? [{ email }] : [])] });
if (owner) {
  console.log(`Owner already exists: ${owner._id}`);
} else {
  const now = new Date();
  const doc = {
    name: OWNER_NAME.trim(),
    phone,
    password: await bcrypt.hash(OWNER_PASSWORD, 10),
    designation: "",
    office: "",
    status: 1,
    createdAt: now,
    updatedAt: now,
  };
  if (email) doc.email = email;
  const { insertedId } = await users.insertOne(doc);
  owner = { _id: insertedId };
  console.log(`Created owner: ${insertedId}`);
}

const { modifiedCount } = await years.updateMany(
  { userId: { $exists: false } },
  { $set: { userId: owner._id } }
);
console.log(`Assigned ${modifiedCount} year(s) to the owner.`);

await years.createIndex({ userId: 1, startYear: -1 });
await mongoose.disconnect();
