import mongoose from "mongoose";
import { UserStatus, UserRole } from "@/lib/constants";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    // Either one can be used to sign in; phone is stored as 01XXXXXXXXX.
    // Regular users always have a phone; an admin may have only an email.
    email: { type: String, trim: true, lowercase: true, default: undefined },
    phone: { type: String, trim: true, default: undefined },
    password: { type: String, required: true },
    designation: { type: String, trim: true, default: "" },
    office: { type: String, trim: true, default: "" },
    status: { type: Number, default: UserStatus.ACTIVE },
    role: { type: Number, default: UserRole.USER },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true, sparse: true });
UserSchema.index({ phone: 1 }, { unique: true, sparse: true });

export default mongoose.models.User || mongoose.model("User", UserSchema, "users");
