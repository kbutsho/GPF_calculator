import { cookies } from "next/headers";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import { UserStatus } from "@/lib/constants";

/** Token payload only — cheap, no DB round trip. */
export async function getSession() {
  const store = await cookies();
  const payload = verifyToken(store.get(COOKIE_NAME)?.value);
  return payload?.id ? payload : null;
}

/** Full user row for the dashboard; null if the token is stale or the account was disabled. */
export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;
  await dbConnect();
  const user = await User.findById(session.id).select("-password").lean();
  if (!user || user.status !== UserStatus.ACTIVE) return null;
  return { ...user, _id: String(user._id) };
}
