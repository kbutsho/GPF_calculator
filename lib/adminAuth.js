import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { requireAdmin } from "@/lib/auth";
import { UserRole, UserStatus } from "@/lib/constants";

/**
 * Admin API guard. The token's role is only as fresh as the last login, so an
 * admin who was demoted or deactivated since then is rejected here via the DB.
 */
export async function requireActiveAdmin(request) {
  const session = requireAdmin(request);
  if (!session) return null;
  await dbConnect();
  const user = await User.findById(session.id).select("role status").lean();
  if (!user || user.role !== UserRole.ADMIN || user.status !== UserStatus.ACTIVE) return null;
  return session;
}
