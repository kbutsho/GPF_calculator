import mongoose from "mongoose";
import { UserStatus } from "@/lib/constants";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    // Either one can be used to sign in; phone is always stored as 01XXXXXXXXX.
    email: { type: String, trim: true, lowercase: true, default: undefined },
    phone: { type: String, trim: true, required: true },
    password: { type: String, required: true },
    designation: { type: String, trim: true, default: "" },
    office: { type: String, trim: true, default: "" },
    status: { type: Number, default: UserStatus.ACTIVE },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true, sparse: true });
UserSchema.index({ phone: 1 }, { unique: true });

export default mongoose.models.User || mongoose.model("User", UserSchema, "users");
