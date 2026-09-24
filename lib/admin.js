import PfYear from "@/models/PfYear";
import { withResults } from "@/components/dashboard/YearsOverview";

/**
 * Per-user year summary for the admin screens: how many years each user has
 * saved and the result of their most recent one. One query for the whole page.
 */
export async function yearSummaries(userIds) {
  const rows = await PfYear.find({ userId: { $in: userIds } })
    .sort({ startYear: -1, createdAt: -1 })
    .lean();
  const byUser = new Map();
  for (const y of withResults(rows)) {
    const key = String(y.userId);
    const entry = byUser.get(key) || { count: 0, latest: null };
    entry.count += 1;
    if (!entry.latest) entry.latest = y; // rows are newest first
    byUser.set(key, entry);
  }
  return byUser;
}

export const fmtDate = (value, lang, withTime = false) => {
  if (!value) return "—";
  return new Date(value).toLocaleString(lang === "en" ? "en-GB" : "bn-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
    timeZone: "Asia/Dhaka",
  });
};
