import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import PfYear from "@/models/PfYear";
import YearsOverview, { withResults } from "@/components/dashboard/YearsOverview";
import { getSession } from "@/lib/session";
import { getLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export const dynamic = "force-dynamic";

async function loadYears(userId) {
  try {
    await dbConnect();
    const rows = await PfYear.find({ userId }).sort({ startYear: -1, createdAt: -1 }).lean();
    return { rows, error: null };
  } catch (e) {
    return { rows: [], error: e.message };
  }
}

export default async function DashboardPage() {
  const [session, lang] = await Promise.all([getSession(), getLang()]);
  const t = tr(lang);
  const { rows, error } = await loadYears(session.id);
  const years = withResults(rows);

  const newButton = (label) => (
    <Link href="/dashboard/year/new" className="btn btn-brand">
      <i className="bi bi-plus-lg me-1" />
      {label}
    </Link>
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-end flex-wrap gap-2 mb-4">
        <div>
          <h1 className="h4 mb-1">{t(`স্বাগতম, ${session.name}`, `Welcome, ${session.name}`)}</h1>
          <div className="section-hint">
            {t(
              "প্রতিটি অর্থবছরের ওপেনিং ব্যালেন্স, চাঁদা আর রেট দিয়ে প্রফিট ও ক্লোজিং ব্যালেন্স হিসাব",
              "Profit and closing balance for each fiscal year from its opening balance, subscriptions and rates"
            )}
          </div>
        </div>
        {newButton(t("নতুন হিসাব", "New calculation"))}
      </div>

      {error && (
        <div className="alert alert-danger">
          <i className="bi bi-exclamation-octagon me-2" />
          {t("ডেটাবেজে যুক্ত হওয়া যায়নি", "Could not connect to the database")} — <code>{error}</code>
        </div>
      )}

      {!error && (
        <YearsOverview
          years={years}
          lang={lang}
          hrefBase="/dashboard/year"
          emptyAction={newButton(t("প্রথম হিসাবটি করুন", "Make your first calculation"))}
        />
      )}
    </>
  );
}
