import jwt from "jsonwebtoken";
import { UserRole } from "@/lib/constants";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = "30d";
const MAX_AGE = 30 * 24 * 60 * 60;

export const COOKIE_NAME = "gpf_token";

export function signToken(payload) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined. Add it to your .env.local file.");
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export function verifyToken(token) {
  if (!JWT_SECRET || !token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}

/** Admin-only API handlers: null unless the token carries the admin role. */
export function requireAdmin(request) {
  const session = requireAuth(request);
  return session?.role === UserRole.ADMIN ? session : null;
}

/** Where a user lands after signing in. */
export const homeFor = (role) => (role === UserRole.ADMIN ? "/admin" : "/dashboard");

/** API route handlers call this; proxy only guards page routes, not /api/*. */
export function requireAuth(request) {
  const payload = verifyToken(request.cookies.get(COOKIE_NAME)?.value);
  return payload?.id ? payload : null;
}

export function authCookie(token) {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}${
    process.env.NODE_ENV === "production" ? "; Secure" : ""
  }`;
}

export function clearAuthCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

export function tokenFor(user) {
  return signToken({ id: String(user._id), name: user.name, role: user.role || UserRole.USER });
}

/** Bangladeshi mobile numbers are stored as 01XXXXXXXXX regardless of how they were typed. */
export function normalizePhone(value) {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.startsWith("880")) digits = "0" + digits.slice(3);
  else if (digits.startsWith("88")) digits = digits.slice(2);
  return digits;
}

export const isValidPhone = (phone) => /^01[3-9]\d{8}$/.test(phone);
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
