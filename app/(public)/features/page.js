import PageHero from "@/components/public/PageHero";
import CtaBanner from "@/components/public/CtaBanner";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "সুবিধাসমূহ",
  description:
    "স্ল্যাব-ভিত্তিক মুনাফা, মাসভিত্তিক চাঁদার মুনাফা, স্টেটমেন্ট মিলানো, হার খুঁজে বের করা, পরের বছরে ব্যালেন্স নেওয়া — GPF ক্যালকুলেটরের সব সুবিধা।",
  path: "/features",
});

const GROUPS = [
  {
    title: "হিসাবের ইঞ্জিন",
    items: [
      {
        icon: "bi-bar-chart-steps",
        title: "স্ল্যাব-ভিত্তিক মুনাফা",
        text: "প্রারম্ভিক জমাকে ধাপে ভাগ করে প্রতিটি ধাপে আলাদা হার বসায়। কোন ধাপে কত টাকা পড়ল আর তাতে কত মুনাফা এল — সব আলাদা লাইনে দেখায়।",
      },
      {
        icon: "bi-plus-slash-minus",
        color: "amber",
        title: "ধাপ যোগ/বাদ, হার বদল",
        text: "ধাপের পরিমাণ ও হার নিজের মতো বদলান, নতুন ধাপ যোগ করুন। সরকার হার বদলালে অ্যাপ বদলানোর জন্য অপেক্ষা করতে হবে না।",
      },
      {
        icon: "bi-calendar3",
        color: "blue",
        title: "মাস অনুপাতে চাঁদার মুনাফা",
        text: "জুলাইয়ে জমা হওয়া চাঁদা ১২ মাস, আগস্টের ১১ মাস… জুনের ১ মাস — প্রতিটি মাসের চাঁদা যত মাস তহবিলে ছিল, ঠিক ততটুকুর মুনাফা।",
      },
      {
        icon: "bi-arrow-left-right",
        color: "rose",
        title: "রিফান্ড ও উত্তোলন",
        text: "অগ্রিম ফেরত (রিফান্ড) জমার মতো মুনাফা পায়; উত্তোলন করা টাকা বাকি মাসগুলোর মুনাফা হারায় — দুটোই মাস ধরে হিসাব হয়।",
      },
      {
        icon: "bi-scissors",
        title: "ট্রাংকেট নাকি রাউন্ড",
        text: "অফিসিয়াল স্টেটমেন্ট পয়সার পরের অংশ ফেলে দেয় (১৭৯,৫১৭.১৬৬৪ → ১৭৯,৫১৭.১৬)। চাইলে রাউন্ডও বেছে নিতে পারেন।",
      },
      {
        icon: "bi-shuffle",
        color: "amber",
        title: "তিন পদ্ধতির তুলনা",
        text: "মাস অনুপাতে, পুরো বছর ফ্ল্যাট, আর অর্ধ-বছর — একই ডেটায় তিনভাবে মুনাফা কত হয় পাশাপাশি দেখে নিন।",
      },
    ],
  },
  {
    title: "স্টেটমেন্ট যাচাই",
    items: [
      {
        icon: "bi-clipboard-check",
        color: "blue",
        title: "এক নজরে মিল/অমিল",
        text: "স্টেটমেন্টের Profit for the year আর Closing Balance বসালেই সবুজ টিক (মিলেছে) বা পার্থক্যের পরিমাণ দেখায়।",
      },
      {
        icon: "bi-search",
        title: "আসল হার খুঁজে বের করা",
        text: "না মিললে অ্যাপ উল্টো দিক থেকে হিসাব করে বলে দেয় ফান্ড চাঁদার উপর আসলে কত শতাংশ হার বসিয়েছে — এক ক্লিকে সেই হার বসানোও যায়।",
      },
      {
        icon: "bi-journal-text",
        color: "amber",
        title: "ধাপে ধাপে ব্যাখ্যা",
        text: "“হিসাবটা কীভাবে হলো” অংশে প্রতিটি সূত্র আর অঙ্ক খুলে দেখানো হয় — অফিসে প্রশ্ন তুলতে হলে হাতে প্রমাণ থাকে।",
      },
    ],
  },
  {
    title: "আপনার অ্যাকাউন্ট",
    items: [
      {
        icon: "bi-speedometer2",
        color: "rose",
        title: "ব্যক্তিগত ড্যাশবোর্ড",
        text: "সর্বশেষ সমাপনী জমা, মোট মুনাফা, বছরওয়ারি বৃদ্ধি — সব এক পাতায়।",
      },
      {
        icon: "bi-arrow-right-circle",
        title: "পরের বছরে নিয়ে যাওয়া",
        text: "এক ক্লিকে এ বছরের সমাপনী জমা পরের বছরের প্রারম্ভিক জমা হয়ে যায়, সাথে স্ল্যাব আর সেটিংসও।",
      },
      {
        icon: "bi-phone",
        color: "blue",
        title: "মোবাইল বা ইমেইলে লগইন",
        text: "রেজিস্ট্রেশনের মোবাইল নম্বর বা ইমেইল — যেটা মনে থাকে সেটা দিয়েই ঢুকুন। ফোন, ট্যাবলেট, কম্পিউটার সবখানে চলে।",
      },
      {
        icon: "bi-shield-lock",
        color: "amber",
        title: "গোপনীয়তা",
        text: "আপনার হিসাব শুধু আপনার। পাসওয়ার্ড এনক্রিপ্ট করে রাখা হয়, কোনো তথ্য বিক্রি বা শেয়ার করা হয় না।",
      },
      {
        icon: "bi-printer",
        title: "প্রিন্ট-বান্ধব",
        text: "প্রিন্ট বাটনে চাপলে শুধু হিসাবটুকু পরিষ্কারভাবে ছাপা হয় — ফাইলে রাখার জন্য উপযুক্ত।",
      },
      {
        icon: "bi-gift",
        color: "rose",
        title: "সম্পূর্ণ ফ্রি",
        text: "কোনো চার্জ, সাবস্ক্রিপশন বা বিজ্ঞাপন নেই।",
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        icon="bi-grid"
        eyebrow="সুবিধাসমূহ"
        title="আপনার ভবিষ্য তহবিলের পূর্ণাঙ্গ হিসাবখাতা"
        text="সঠিক হিসাব, স্বচ্ছ ব্যাখ্যা আর বছরের পর বছর সংরক্ষণ — যা যা দরকার সবই এক জায়গায়।"
      />
      {GROUPS.map((g, gi) => (
        <section className={`section ${gi % 2 ? "section-alt" : ""}`} key={g.title}>
          <div className="container">
            <h2 className="section-title mb-4">{g.title}</h2>
            <div className="row g-4">
              {g.items.map((f) => (
                <div className="col-md-6 col-lg-4" key={f.title}>
                  <div className="feature-card">
                    <div className={`feature-icon ${f.color || ""}`}>
                      <i className={`bi ${f.icon}`} />
                    </div>
                    <h5 className="fw-semibold">{f.title}</h5>
                    <p className="text-secondary mb-0">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
      <CtaBanner />
    </>
  );
}
