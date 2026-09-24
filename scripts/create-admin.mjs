// Creates the admin account, or promotes an existing account with that email.
// Credentials come from the environment so they never land in git:
//   ADMIN_NAME="..." ADMIN_EMAIL="..." ADMIN_PASSWORD="..." \
//     node --env-file=.env.local scripts/create-admin.mjs
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const ADMIN = 2;
const ACTIVE = 1;
const { MONGODB_URI, ADMIN_NAME = "Admin", ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

if (!MONGODB_URI) throw new Error("MONGODB_URI missing — run with --env-file=.env.local");
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD");

await mongoose.connect(MONGODB_URI);
const users = mongoose.connection.db.collection("users");

// Phone used to be unique and required; an admin may have only an email, so the
// index must be sparse or a second phone-less account would collide on null.
const indexes = await users.indexes();
const phoneIndex = indexes.find((i) => i.name === "phone_1");
if (phoneIndex && !phoneIndex.sparse) {
  await users.dropIndex("phone_1");
  console.log("Dropped non-sparse phone_1 index");
}
await users.createIndex({ phone: 1 }, { unique: true, sparse: true });
await users.createIndex({ email: 1 }, { unique: true, sparse: true });

const email = ADMIN_EMAIL.trim().toLowerCase();
const password = await bcrypt.hash(ADMIN_PASSWORD, 10);
const now = new Date();

const existing = await users.findOne({ email });
if (existing) {
  await users.updateOne(
    { _id: existing._id },
    { $set: { role: ADMIN, status: ACTIVE, password, updatedAt: now } }
  );
  console.log(`Promoted existing account to admin: ${existing._id}`);
} else {
  const { insertedId } = await users.insertOne({
    name: ADMIN_NAME.trim(),
    email,
    password,
    designation: "",
    office: "",
    status: ACTIVE,
    role: ADMIN,
    lastLoginAt: null,
    createdAt: now,
    updatedAt: now,
  });
  console.log(`Created admin: ${insertedId}`);
}

// Accounts created before roles existed have no role field; make them plain users.
const { modifiedCount } = await users.updateMany({ role: { $exists: false } }, { $set: { role: 1 } });
if (modifiedCount) console.log(`Set role=user on ${modifiedCount} older account(s)`);

await mongoose.disconnect();
