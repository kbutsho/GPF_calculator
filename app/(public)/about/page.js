import Link from "next/link";
import PageHero from "@/components/public/PageHero";
import CtaBanner from "@/components/public/CtaBanner";
import { SITE, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "আমাদের সম্পর্কে",
  description: "GPF ক্যালকুলেটর কেন ও কীভাবে তৈরি হলো, এর পেছনের মানুষ ও লক্ষ্য।",
  path: "/about",
});

const VALUES = [
  { icon: "bi-bullseye", title: "নির্ভুলতা", text: "প্রতিটি নিয়ম বাস্তব স্টেটমেন্টের সাথে পয়সা পর্যন্ত মিলিয়ে তৈরি।" },
  { icon: "bi-eye", color: "amber", title: "স্বচ্ছতা", text: "শুধু ফলাফল নয় — কোন অঙ্ক কোথা থেকে এল, সবটা খুলে দেখানো হয়।" },
  { icon: "bi-translate", color: "blue", title: "বাংলায়", text: "পুরো অ্যাপ বাংলায়, যাতে সবাই সহজে বুঝতে পারেন।" },
  { icon: "bi-heart", color: "rose", title: "বিনামূল্যে", text: "সহকর্মীদের কাজে লাগবে — এটুকুই উদ্দেশ্য, কোনো ব্যবসা নয়।" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        icon="bi-people"
        eyebrow="আমাদের সম্পর্কে"
        title="একটা স্টেটমেন্ট বোঝার চেষ্টা থেকে শুরু"
        text="নিজের GPF-এর হিসাব মেলাতে গিয়ে তৈরি হয়েছিল এই ক্যালকুলেটর — এখন সবার জন্য উন্মুক্ত।"
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="prose">
            <p>
              প্রতি বছর GPF স্টেটমেন্ট হাতে পেয়ে একটা প্রশ্নই মাথায় আসত — মুনাফার এই অঙ্কটা আসলে কীভাবে
              এল? প্রচলিত ধারণা ছিল চাঁদার উপর ৮.৫% বসে, কিন্তু সেভাবে হিসাব করলে স্টেটমেন্টের সাথে কিছুতেই
              মিলত না।
            </p>
            <p>
              তাই একটা বাস্তব স্টেটমেন্ট ধরে ধরে উল্টো দিক থেকে হিসাব শুরু হলো। বের হলো তিনটা নিয়ম —
              প্রারম্ভিক জমায় স্ল্যাব হার, নতুন চাঁদায় সর্বোচ্চ ধাপের হার মাস অনুপাতে, আর পয়সার পরের অংশ
              বাদ। এই তিন নিয়মে হিসাব করতেই স্টেটমেন্টের মুনাফা আর সমাপনী জমা{" "}
              <strong>পয়সা পর্যন্ত মিলে গেল</strong>।
            </p>
            <p>
              মনে হলো, এই সমস্যা শুধু একজনের নয় — হাজারো সরকারি চাকরিজীবী প্রতি বছর একই প্রশ্ন নিয়ে বসে
              থাকেন। সেই ভাবনা থেকেই <strong>{SITE.name}</strong>: যেকোনো চাকরিজীবী নিজের অ্যাকাউন্টে বছরের পর
              বছর নিজের ভবিষ্য তহবিলের হিসাব রাখতে, মিলিয়ে দেখতে আর বুঝতে পারবেন।
            </p>
          </div>

          <div className="row g-4 my-4">
            {VALUES.map((v) => (
              <div className="col-sm-6" key={v.title}>
                <div className="feature-card">
                  <div className={`feature-icon ${v.color || ""}`}>
                    <i className={`bi ${v.icon}`} />
                  </div>
                  <h5 className="fw-semibold">{v.title}</h5>
                  <p className="text-secondary mb-0">{v.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-body d-flex flex-wrap align-items-center gap-3">
              <div className="brand-mark" style={{ width: 56, height: 56, fontSize: "1.5rem" }}>
                <i className="bi bi-person" />
              </div>
              <div className="flex-grow-1">
                <div className="fw-semibold fs-5">{SITE.contact.name}</div>
                <div className="text-secondary small">নির্মাতা ও রক্ষণাবেক্ষণকারী</div>
              </div>
              <Link href="/contact" className="btn btn-brand">
                যোগাযোগ করুন
              </Link>
            </div>
          </div>

          <div className="info-box warn mt-4 small">
            <i className="bi bi-info-circle me-1" />
            {SITE.name} একটি ব্যক্তিগত উদ্যোগ। এটি কোনো সরকারি দপ্তর, হিসাবরক্ষণ অফিস বা ব্যাংকের অফিসিয়াল
            সেবা নয় এবং তাদের সাথে সংশ্লিষ্ট নয়।
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
