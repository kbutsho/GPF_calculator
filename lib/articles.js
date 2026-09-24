// Long-form SEO articles. Each body is a list of blocks rendered by
// app/(public)/articles/[slug]/page.js:
//   ["h2", text] ["p", text] ["ul", [items]] ["formula", text] ["note", text]
//   ["projection"] -> a multi-year table computed live by lib/calc.js
export const ARTICLES = [
  {
    slug: "how-gpf-profit-is-calculated",
    date: "2026-09-23",
    icon: "bi-calculator",
    bn: {
      title: "GPF মুনাফা কীভাবে হিসাব হয় — ধাপে ধাপে সম্পূর্ণ নিয়ম",
      description:
        "সাধারণ ভবিষ্য তহবিলের বার্ষিক মুনাফা দুই ভাগে হিসাব হয়: প্রারম্ভিক জমায় স্ল্যাব হার আর চাঁদায় মাস অনুপাতে হার। উদাহরণসহ পুরো পদ্ধতি।",
      keywords: ["GPF মুনাফা হিসাব", "GPF সুদ হিসাবের নিয়ম", "ভবিষ্য তহবিলের মুনাফা কীভাবে হয়"],
      body: [
        ["p", "অনেকেই জানেন GPF-এ বছর শেষে মুনাফা যোগ হয়, কিন্তু সেই অঙ্কটা কীভাবে আসে তা স্পষ্ট নয়। আসলে বার্ষিক মুনাফা দুটি আলাদা অংশের যোগফল।"],
        ["h2", "অংশ ১: প্রারম্ভিক জমার মুনাফা"],
        ["p", "১ জুলাই তারিখে তহবিলে যা থাকে (Opening Balance) তা পুরো ১২ মাস তহবিলে থাকে, তাই পুরো বছরের মুনাফা পায়। কিন্তু একটাই হার বসে না — জমাকে ধাপে ভাগ করা হয়:"],
        ["ul", ["প্রথম ১৫ লক্ষ টাকায় ১৩%", "পরবর্তী ১৫ লক্ষ টাকায় ১২%", "৩০ লক্ষের উপরের অংশে ১১%"]],
        ["formula", "উদাহরণ: প্রারম্ভিক জমা ৪০,০০,০০০\n\n১৫,০০,০০০ × ১৩% = ১,৯৫,০০০\n১৫,০০,০০০ × ১২% = ১,৮০,০০০\n১০,০০,০০০ × ১১% = ১,১০,০০০\n─────────────────────────\nমোট            = ৪,৮৫,০০০"],
        ["h2", "অংশ ২: এ বছরের চাঁদার মুনাফা"],
        ["p", "বছরের মধ্যে জমা হওয়া চাঁদা যত মাস তহবিলে থাকে, তত মাসের মুনাফা পায়। জুলাইয়ের চাঁদা ১২ মাস, জুনের চাঁদা ১ মাস। হার হিসেবে বসে প্রারম্ভিক জমা যে ধাপে পৌঁছেছে সেই ধাপের হার (উপরের উদাহরণে ১১%)।"],
        ["formula", "মাসের মুনাফা = চাঁদা × হার × (তহবিলে থাকা মাস ÷ ১২)\n\nমাসে ১০,০০০ চাঁদা, হার ১১% হলে:\n১০,০০০ × ১১% × (১২+১১+…+১)/১২ = ১০,০০০ × ১১% × ৬.৫ = ৭,১৫০"],
        ["h2", "অংশ ৩: যোগফল ও সমাপনী জমা"],
        ["formula", "বছরের মুনাফা = প্রারম্ভিক জমার মুনাফা + চাঁদার মুনাফা\nসমাপনী জমা = প্রারম্ভিক জমা + চাঁদা + রিফান্ড − উত্তোলন + মুনাফা"],
        ["p", "শেষ ধাপে অফিসিয়াল হিসাব দুই দশমিকের পরের অংশ ফেলে দেয় (ট্রাংকেট)। GPF ক্যালকুলেটর এই তিনটি নিয়মই মেনে হিসাব করে, তাই একটি বাস্তব স্টেটমেন্টের সাথে পয়সা পর্যন্ত মিলেছে।"],
        ["note", "হার সরকার সময়ে সময়ে বদলাতে পারে। অ্যাপে প্রতিটি ধাপের পরিমাণ ও হার নিজে বদলানো যায়।"],
      ],
    },
    en: {
      title: "How GPF profit is calculated — the complete rules, step by step",
      description:
        "Annual General Provident Fund profit has two parts: slab rates on the opening balance and a month-wise rate on subscriptions. The full method with worked examples.",
      keywords: ["how GPF profit is calculated", "GPF interest calculation rules", "GPF profit formula"],
      body: [
        ["p", "Most people know GPF adds profit at year end, but not how the figure is reached. The annual profit is really the sum of two separate parts."],
        ["h2", "Part 1: profit on the opening balance"],
        ["p", "What the fund holds on 1 July (the Opening Balance) stays in all 12 months, so it earns a full year's profit. But no single rate applies — the balance is split into bands:"],
        ["ul", ["13% on the first 15 lakh taka", "12% on the next 15 lakh taka", "11% on anything above 30 lakh"]],
        ["formula", "Example: opening balance 40,00,000\n\n15,00,000 × 13% = 1,95,000\n15,00,000 × 12% = 1,80,000\n10,00,000 × 11% = 1,10,000\n─────────────────────────\nTotal            = 4,85,000"],
        ["h2", "Part 2: profit on this year's subscriptions"],
        ["p", "Money subscribed during the year earns profit only for the months it sits in the fund — July's subscription for 12 months, June's for one. The rate is that of the band the opening balance has reached (11% in the example above)."],
        ["formula", "Monthly profit = subscription × rate × (months held ÷ 12)\n\n10,000 a month at 11%:\n10,000 × 11% × (12+11+…+1)/12 = 10,000 × 11% × 6.5 = 7,150"],
        ["h2", "Part 3: total and closing balance"],
        ["formula", "Profit for the year = opening-balance profit + subscription profit\nClosing balance = opening + subscriptions + refunds − withdrawals + profit"],
        ["p", "Finally, the official calculation drops everything past two decimals (truncation). GPF Calculator follows all three rules, which is why it matched a real statement to the paisa."],
        ["note", "The government can revise rates. Every band's size and rate can be edited in the app."],
      ],
    },
  },
  {
    slug: "gpf-subscription-rate-8-5-or-11",
    date: "2026-09-23",
    icon: "bi-percent",
    bn: {
      title: "GPF চাঁদার উপর মুনাফা ৮.৫% নাকি ১১%? একটি বাস্তব স্টেটমেন্টের বিশ্লেষণ",
      description:
        "চাঁদার উপর ৮.৫% মুনাফা বসে — এই প্রচলিত ধারণা কি ঠিক? একটি অফিসিয়াল GPF স্টেটমেন্ট উল্টো দিক থেকে হিসাব করে দেখা গেছে আসল হার কত।",
      keywords: ["GPF ৮.৫%", "GPF চাঁদার মুনাফার হার", "জিপিএফ চাঁদা সুদ"],
      body: [
        ["p", "সরকারি চাকরিজীবীদের মধ্যে একটা কথা প্রচলিত — প্রারম্ভিক জমায় স্ল্যাব হার বসলেও বছরের চাঁদার উপর বসে ৮.৫%। কিন্তু এই নিয়মে হিসাব করলে অফিসের স্টেটমেন্টের সাথে মেলে না।"],
        ["h2", "যেভাবে যাচাই করা হলো"],
        ["p", "একটি বাস্তব স্টেটমেন্টে প্রারম্ভিক জমা ছিল ৪৬,৩১,৯৭৪.২৪, বছরের মুনাফা ৫,৬১,৮২৬.৬৬ আর সমাপনী জমা ৫৩,১৬,৯০০.৯০। প্রারম্ভিক জমার স্ল্যাব মুনাফা বাদ দিলে যা থাকে, তা চাঁদার মুনাফা। সেখান থেকে উল্টো দিকে হিসাব করে বের করা হলো চাঁদায় কত শতাংশ বসেছে।"],
        ["h2", "ফলাফল"],
        ["ul", [
          "৮.৫% বা এর কোনো রূপ (ফ্ল্যাট, অর্ধ-বছর, মাস অনুপাতে) স্টেটমেন্টের সাথে মেলেনি।",
          "১১% — অর্থাৎ প্রারম্ভিক জমা যে ধাপে (৩০ লক্ষের উপরে) ছিল সেই ধাপের হার — মাস অনুপাতে বসালে পয়সা পর্যন্ত মিলে গেছে।",
          "৮.৫% সম্ভবত বেতন থেকে চাঁদা কাটার শতাংশ, মুনাফার হার নয়।",
        ]],
        ["h2", "আপনার জন্য কী মানে"],
        ["p", "আপনার প্রারম্ভিক জমা ১৫ লক্ষের কম হলে নতুন চাঁদা সম্ভবত ১৩% পাবে, ১৫–৩০ লক্ষের মধ্যে হলে ১২%, আর ৩০ লক্ষের বেশি হলে ১১%। তবে প্রতিটি ফান্ডের নিয়ম একই — এমন নিশ্চয়তা নেই।"],
        ["note", "GPF ক্যালকুলেটরে স্টেটমেন্টের “Profit for the year” বসালে অ্যাপ নিজেই হিসাব করে দেখাবে আপনার ফান্ড চাঁদায় আসলে কত হার দিয়েছে।"],
      ],
    },
    en: {
      title: "Does GPF pay 8.5% or 11% on subscriptions? Analysis of a real statement",
      description:
        "Is the common belief that subscriptions earn 8.5% true? An official GPF statement, worked backwards, shows the rate actually used.",
      keywords: ["GPF 8.5 percent", "GPF subscription profit rate", "GPF deposit interest rate"],
      body: [
        ["p", "A common belief among government employees is that while the opening balance earns slab rates, the year's subscriptions earn 8.5%. Calculated that way, though, the figures never match the official statement."],
        ["h2", "How it was checked"],
        ["p", "A real statement showed an opening balance of 46,31,974.24, profit for the year of 5,61,826.66 and a closing balance of 53,16,900.90. Removing the slab profit on the opening balance leaves the subscription profit — and working backwards from that gives the rate applied to subscriptions."],
        ["h2", "The result"],
        ["ul", [
          "8.5% in any form (flat, half-year, month-wise) did not match the statement.",
          "11% — the rate of the band the opening balance sat in (above 30 lakh) — applied month-wise matched to the paisa.",
          "8.5% is most likely the payroll deduction percentage, not a profit rate.",
        ]],
        ["h2", "What it means for you"],
        ["p", "If your opening balance is under 15 lakh, new subscriptions probably earn 13%; between 15 and 30 lakh, 12%; above 30 lakh, 11%. There is no guarantee every fund works the same way, though."],
        ["note", "Enter your statement's “Profit for the year” in GPF Calculator and it will work out the rate your fund actually applied to subscriptions."],
      ],
    },
  },
  {
    slug: "check-your-gpf-statement",
    date: "2026-09-23",
    icon: "bi-clipboard-check",
    bn: {
      title: "GPF স্টেটমেন্ট সঠিক কিনা যাচাই করার ৫টি ধাপ",
      description:
        "বছর শেষের GPF স্টেটমেন্টে ভুল আছে কিনা বুঝবেন কীভাবে? চাঁদা, মুনাফা ও সমাপনী জমা মিলিয়ে দেখার সহজ ৫টি ধাপ।",
      keywords: ["GPF স্টেটমেন্ট যাচাই", "GPF স্লিপ চেক", "জিপিএফ হিসাব মিলানো"],
      body: [
        ["p", "হিসাবরক্ষণ অফিস থেকে পাওয়া GPF স্টেটমেন্ট সাধারণত ঠিকই থাকে, তবে কোনো মাসের চাঁদা বাদ পড়া বা ভুল প্রারম্ভিক জমা ধরা — এমন ভুল হতেই পারে। নিচের ধাপগুলো মেনে নিজেই যাচাই করুন।"],
        ["h2", "১. প্রারম্ভিক জমা মিলান"],
        ["p", "এ বছরের Opening Balance আর গত বছরের Closing Balance হুবহু এক হওয়া উচিত।"],
        ["h2", "২. মাসিক চাঁদা মিলান"],
        ["p", "১২ মাসের বেতন স্লিপে কাটা GPF চাঁদা যোগ করে স্টেটমেন্টের Subscription-এর সাথে মিলান। কোনো মাস বাদ পড়লে সেটা মুনাফাতেও প্রভাব ফেলে।"],
        ["h2", "৩. অগ্রিম ও উত্তোলন দেখুন"],
        ["p", "অগ্রিমের কিস্তি (Refund) আর উত্তোলন (Withdrawal) সঠিক মাসে বসেছে কিনা দেখুন — মাস বদলালে মুনাফাও বদলায়।"],
        ["h2", "৪. মুনাফা নিজে হিসাব করুন"],
        ["p", "GPF ক্যালকুলেটরে প্রারম্ভিক জমা আর মাসিক চাঁদা বসান। অ্যাপ স্ল্যাব আর মাসভিত্তিক নিয়মে মুনাফা দেখাবে।"],
        ["h2", "৫. পার্থক্য থাকলে কারণ খুঁজুন"],
        ["ul", [
          "কয়েক পয়সার পার্থক্য — পয়সার নিয়ম (ট্রাংকেট/রাউন্ড) দেখুন।",
          "বড় পার্থক্য — স্টেটমেন্টের মুনাফা বসিয়ে দেখুন অ্যাপ কোন হার বের করে; সেটা অস্বাভাবিক হলে চাঁদার অঙ্কগুলো আবার মিলান।",
          "তারপরও না মিললে অ্যাপের “হিসাবটা কীভাবে হলো” অংশ প্রিন্ট করে অফিসে যোগাযোগ করুন।",
        ]],
      ],
    },
    en: {
      title: "5 steps to check whether your GPF statement is correct",
      description:
        "How can you tell if your year-end GPF statement has an error? Five simple steps to check subscriptions, profit and closing balance.",
      keywords: ["check GPF statement", "verify GPF slip", "GPF statement error"],
      body: [
        ["p", "The GPF statement from the accounts office is usually right, but a missed month's subscription or a wrong opening balance can happen. Use these steps to check it yourself."],
        ["h2", "1. Match the opening balance"],
        ["p", "This year's Opening Balance should equal last year's Closing Balance exactly."],
        ["h2", "2. Match the monthly subscriptions"],
        ["p", "Add up the GPF deducted on your 12 salary slips and compare with the statement's Subscription. A missing month also affects profit."],
        ["h2", "3. Check advances and withdrawals"],
        ["p", "Make sure advance instalments (Refund) and withdrawals sit in the right months — changing the month changes the profit."],
        ["h2", "4. Calculate the profit yourself"],
        ["p", "Enter the opening balance and monthly subscriptions in GPF Calculator. It shows the profit using the slab and month-wise rules."],
        ["h2", "5. If there's a difference, find the cause"],
        ["ul", [
          "A few paisa — check the rounding rule (truncate vs round).",
          "A large gap — enter the statement's profit and see which rate the app works out; if it looks odd, re-check the subscription figures.",
          "Still no match — print the app's “How was this calculated” section and take it to your office.",
        ]],
      ],
    },
  },
  {
    slug: "gpf-truncate-vs-round",
    date: "2026-09-23",
    icon: "bi-scissors",
    bn: {
      title: "GPF হিসাবে এক পয়সার গরমিল কেন হয়? ট্রাংকেট বনাম রাউন্ড",
      description:
        "এক্সেলে GPF মুনাফা হিসাব করলে স্টেটমেন্ট থেকে এক পয়সা বেশি আসে কেন? কারণ অফিসিয়াল হিসাব রাউন্ড নয়, ট্রাংকেট করে।",
      keywords: ["GPF পয়সার গরমিল", "GPF ট্রাংকেট", "GPF এক্সেল হিসাব"],
      body: [
        ["p", "নিজে হিসাব করে দেখলেন সব ঠিক, কিন্তু স্টেটমেন্টের সাথে ঠিক এক পয়সা পার্থক্য — এমনটা খুব সাধারণ। কারণটা পয়সার নিয়মে।"],
        ["h2", "রাউন্ড আর ট্রাংকেটের পার্থক্য"],
        ["formula", "আসল হিসাব : ১৭৯,৫১৭.১৬৬৪\nরাউন্ড     : ১৭৯,৫১৭.১৭   (কাছের পয়সায়)\nট্রাংকেট   : ১৭৯,৫১৭.১৬   (পয়সার পরের অংশ ফেলে দেওয়া)"],
        ["p", "এক্সেলের ROUND ফাংশন কাছের পয়সায় নেয়, কিন্তু অফিসিয়াল GPF হিসাব সাধারণত পয়সার পরের অংশ কেটে ফেলে। তাই এক পয়সা পার্থক্য হয়।"],
        ["h2", "কোথায় কাটা হয়"],
        ["p", "প্রতিটি মাসের মুনাফা আলাদা করে কাটা হয় না — প্রারম্ভিক জমার মোট মুনাফা আর চাঁদার মোট মুনাফা পূর্ণ নির্ভুলতায় হিসাব করে শেষে একবার কাটা হয়। প্রতি লাইনে কাটলে আবার অন্য রকম পার্থক্য আসে।"],
        ["note", "GPF ক্যালকুলেটরে “পয়সার নিয়ম” ডিফল্টভাবে ট্রাংকেট, চাইলে রাউন্ডও বেছে নিতে পারেন।"],
      ],
    },
    en: {
      title: "Why is my GPF calculation one paisa off? Truncate vs round",
      description:
        "Why does a spreadsheet GPF calculation come out one paisa above the statement? Because the official calculation truncates instead of rounding.",
      keywords: ["GPF one paisa difference", "GPF truncate", "GPF Excel calculation"],
      body: [
        ["p", "You worked it all out and everything looks right, yet you're exactly one paisa off the statement. This is very common, and the cause is the rounding rule."],
        ["h2", "Rounding vs truncating"],
        ["formula", "Exact     : 179,517.1664\nRound     : 179,517.17   (to the nearest paisa)\nTruncate  : 179,517.16   (drop everything past the paisa)"],
        ["p", "Excel's ROUND goes to the nearest paisa, but the official GPF calculation usually cuts off what's past it. Hence the one-paisa gap."],
        ["h2", "Where the cut happens"],
        ["p", "Monthly profits aren't cut one by one — the total opening-balance profit and total subscription profit are calculated at full precision and cut once at the end. Cutting every line produces a different mismatch."],
        ["note", "GPF Calculator truncates by default, and you can switch to rounding."],
      ],
    },
  },
  {
    slug: "gpf-balance-at-retirement",
    date: "2026-09-23",
    icon: "bi-graph-up-arrow",
    bn: {
      title: "অবসরের আগে GPF-এ কত জমবে? ১০ বছরের একটি হিসাব",
      description:
        "প্রতি মাসে নির্দিষ্ট চাঁদা দিলে স্ল্যাব হারে মুনাফাসহ ১০ বছরে সাধারণ ভবিষ্য তহবিলে কত জমে — একটি বছরওয়ারি উদাহরণ।",
      keywords: ["অবসরে GPF কত পাব", "GPF ১০ বছরের হিসাব", "ভবিষ্য তহবিল বৃদ্ধি"],
      body: [
        ["p", "GPF-এর মুনাফা প্রতি বছর মূল জমার সাথে যোগ হয়, আর পরের বছর সেই বড় অঙ্কের উপর আবার মুনাফা আসে। তাই সময়ের সাথে তহবিল দ্রুত বাড়ে। নিচে একটি কাল্পনিক উদাহরণ — প্রারম্ভিক জমা ১০ লক্ষ, প্রতি মাসে ১০,০০০ চাঁদা, বর্তমান স্ল্যাব হার অপরিবর্তিত ধরে:"],
        ["projection"],
        ["p", "লক্ষ করুন, জমা ১৫ লক্ষ আর ৩০ লক্ষ পেরোনোর পর নতুন চাঁদার হার কমে ১২% ও ১১% হয় — কিন্তু মোট মুনাফা প্রতি বছরই বাড়তে থাকে।"],
        ["note", "এটি শুধু ধারণার জন্য; বাস্তবে চাঁদা, হার ও অগ্রিম-উত্তোলন বদলায়। নিজের অঙ্কে প্রতিটি বছর হিসাব করে GPF ক্যালকুলেটরে সংরক্ষণ করুন — “পরের বছর” বাটনে সমাপনী জমা নিজেই পরের বছরে চলে যায়।"],
      ],
    },
    en: {
      title: "How much will your GPF hold by retirement? A 10-year example",
      description:
        "With a fixed monthly subscription and slab-rate profit, how much does a General Provident Fund grow in 10 years? A year-by-year example.",
      keywords: ["GPF balance at retirement", "GPF 10 year projection", "provident fund growth"],
      body: [
        ["p", "GPF profit is added to the balance every year, and the next year earns profit on that larger amount — so the fund grows faster over time. Below is an illustrative example: opening balance 10 lakh, 10,000 a month in subscriptions, current slab rates unchanged:"],
        ["projection"],
        ["p", "Notice that once the balance passes 15 lakh and 30 lakh, new subscriptions drop to 12% and 11% — yet total profit keeps rising every year."],
        ["note", "This is only an illustration; in practice subscriptions, rates, advances and withdrawals change. Calculate each year with your own figures and save it in GPF Calculator — the “Next year” button carries the closing balance forward for you."],
      ],
    },
  },
  {
    slug: "gpf-profit-month-by-month",
    date: "2026-09-24",
    icon: "bi-calendar3",
    bn: {
      title: "GPF চাঁদার মাসভিত্তিক মুনাফা — জুলাই থেকে জুন, প্রতি মাসের হিসাব",
      description:
        "প্রতি মাসে ১০,০০০ টাকা চাঁদা ১৩% হারে হলে কোন মাসের চাঁদা কত মুনাফা পায়? জুলাই থেকে জুন পর্যন্ত মাসওয়ারি পূর্ণ তালিকা।",
      keywords: ["GPF মাসিক মুনাফা", "জিপিএফ মাসভিত্তিক হিসাব", "GPF চাঁদার সুদ"],
      body: [
        ["p", "GPF-এ বছরের মধ্যে জমা হওয়া চাঁদা যত মাস তহবিলে থাকে, ঠিক তত মাসের মুনাফা পায়। নিচে প্রতি মাসে ১০,০০০ টাকা চাঁদা আর ১৩% হার ধরে (প্রারম্ভিক জমা ১৫ লক্ষের কম হলে যা হয়) প্রতিটি মাসের হিসাব:"],
        ["formula", "মাস        থাকে   হিসাব                        মুনাফা\nজুলাই       ১২    ১০,০০০ × ১৩% × ১২/১২       ১,৩০০.০০\nআগস্ট       ১১    ১০,০০০ × ১৩% × ১১/১২       ১,১৯১.৬৭\nসেপ্টেম্বর  ১০    ১০,০০০ × ১৩% × ১০/১২       ১,০৮৩.৩৩\nঅক্টোবর      ৯    ১০,০০০ × ১৩% × ৯/১২          ৯৭৫.০০\nনভেম্বর      ৮    ১০,০০০ × ১৩% × ৮/১২          ৮৬৬.৬৭\nডিসেম্বর     ৭    ১০,০০০ × ১৩% × ৭/১২          ৭৫৮.৩৩\nজানুয়ারি    ৬    ১০,০০০ × ১৩% × ৬/১২          ৬৫০.০০\nফেব্রুয়ারি  ৫    ১০,০০০ × ১৩% × ৫/১২          ৫৪১.৬৭\nমার্চ        ৪    ১০,০০০ × ১৩% × ৪/১২          ৪৩৩.৩৩\nএপ্রিল       ৩    ১০,০০০ × ১৩% × ৩/১২          ৩২৫.০০\nমে           ২    ১০,০০০ × ১৩% × ২/১২          ২১৬.৬৭\nজুন          ১    ১০,০০০ × ১৩% × ১/১২          ১০৮.৩৩\n──────────────────────────────────────────────────\nমোট চাঁদা ১,২০,০০০                        মুনাফা ৮,৪৫০.০০"],
        ["h2", "শর্টকাট সূত্র"],
        ["p", "১২ মাসে সমান চাঁদা হলে মাসের সংখ্যাগুলোর যোগফল ১২+১১+…+১ = ৭৮। তাই বছরের চাঁদার মুনাফা = মাসিক চাঁদা × হার × ৭৮/১২ = মাসিক চাঁদা × হার × ৬.৫। উপরের উদাহরণে ১০,০০০ × ১৩% × ৬.৫ = ৮,৪৫০।"],
        ["h2", "এ থেকে যা বোঝা যায়"],
        ["ul", [
          "জুলাইয়ের চাঁদা জুনের চাঁদার ১২ গুণ মুনাফা আনে।",
          "মোট চাঁদার উপর গড় মুনাফা ১৩% নয়, প্রায় ৭.০৪% (৮,৪৫০ ÷ ১,২০,০০০) — কারণ টাকা গড়ে ৬.৫ মাস তহবিলে ছিল। এটা ভুল নয়।",
          "বছরের মাঝখানে চাঁদা বাড়ালে বাকি মাসগুলোতে বাড়তি অংশ কম মাসের মুনাফা পায়।",
        ]],
        ["note", "GPF ক্যালকুলেটরে প্রতিটি মাসের চাঁদা আলাদা বসানো যায় — মাসের মাঝে চাঁদা বদলালেও হিসাব নির্ভুল থাকে।"],
      ],
    },
    en: {
      title: "GPF subscription profit month by month — July to June",
      description:
        "With 10,000 a month at 13%, how much profit does each month's GPF subscription earn? A full month-by-month table from July to June.",
      keywords: ["GPF monthly profit", "GPF month-wise calculation", "GPF subscription interest"],
      body: [
        ["p", "A GPF subscription paid during the year earns profit for exactly the months it sits in the fund. Here is every month with 10,000 a month at 13% (the rate when the opening balance is under 15 lakh):"],
        ["formula", "Month      Held   Working                      Profit\nJuly        12    10,000 × 13% × 12/12       1,300.00\nAugust      11    10,000 × 13% × 11/12       1,191.67\nSeptember   10    10,000 × 13% × 10/12       1,083.33\nOctober      9    10,000 × 13% × 9/12          975.00\nNovember     8    10,000 × 13% × 8/12          866.67\nDecember     7    10,000 × 13% × 7/12          758.33\nJanuary      6    10,000 × 13% × 6/12          650.00\nFebruary     5    10,000 × 13% × 5/12          541.67\nMarch        4    10,000 × 13% × 4/12          433.33\nApril        3    10,000 × 13% × 3/12          325.00\nMay          2    10,000 × 13% × 2/12          216.67\nJune         1    10,000 × 13% × 1/12          108.33\n──────────────────────────────────────────────────\nTotal subscribed 1,20,000               profit 8,450.00"],
        ["h2", "The shortcut"],
        ["p", "With equal monthly amounts the months add up to 12+11+…+1 = 78. So a year's subscription profit = monthly subscription × rate × 78/12 = monthly subscription × rate × 6.5. Above: 10,000 × 13% × 6.5 = 8,450."],
        ["h2", "What this tells you"],
        ["ul", [
          "July's subscription earns 12 times as much as June's.",
          "The average return on the year's subscriptions is not 13% but about 7.04% (8,450 ÷ 1,20,000) — because the money was in for 6.5 months on average. That's not a mistake.",
          "Raising your subscription mid-year means the extra only earns for the remaining months.",
        ]],
        ["note", "GPF Calculator takes each month's subscription separately, so a mid-year change is still calculated exactly."],
      ],
    },
  },
  {
    slug: "gpf-15-lakh-30-lakh-slab-limits",
    date: "2026-09-24",
    icon: "bi-bar-chart-steps",
    bn: {
      title: "GPF জমা ১৫ লক্ষ বা ৩০ লক্ষ পেরোলে কী হয়? স্ল্যাব সীমার সহজ ব্যাখ্যা",
      description:
        "GPF-এ জমা ১৫ লক্ষ পেরোলে কি পুরো টাকার মুনাফা ১২% হয়ে যায়? না — শুধু বাড়তি অংশ। স্ল্যাব সীমা পেরোনোর আগে ও পরের উদাহরণ।",
      keywords: ["GPF ১৫ লক্ষ", "GPF ৩০ লক্ষ", "GPF স্ল্যাব সীমা", "জিপিএফ মুনাফা কমে"],
      body: [
        ["p", "অনেকে ভয় পান — জমা ১৫ লক্ষ পেরোলেই বুঝি পুরো টাকার মুনাফা ১৩% থেকে ১২% হয়ে যাবে। আসলে তা হয় না। স্ল্যাব মানে ধাপ: প্রথম ১৫ লক্ষ সবসময় ১৩%-ই পায়, শুধু ১৫ লক্ষের উপরের অংশ ১২% পায়।"],
        ["h2", "১৪ লক্ষ বনাম ১৬ লক্ষ"],
        ["formula", "প্রারম্ভিক জমা ১৪,০০,০০০\n১৪,০০,০০০ × ১৩% = ১,৮২,০০০\n\nপ্রারম্ভিক জমা ১৬,০০,০০০\n১৫,০০,০০০ × ১৩% = ১,৯৫,০০০\n ১,০০,০০০ × ১২% =    ১২,০০০\n─────────────────────────\nমোট              = ২,০৭,০০০"],
        ["p", "দেখুন, ১৬ লক্ষে মুনাফা ১৪ লক্ষের চেয়ে ২৫,০০০ টাকা বেশি। জমা বাড়লে মোট মুনাফা কখনো কমে না — শুধু উপরের বাড়তি অংশের হার একটু কম।"],
        ["h2", "নতুন চাঁদার হারে প্রভাব"],
        ["p", "প্রারম্ভিক জমা যে ধাপে পৌঁছায়, এ বছরের নতুন চাঁদা সাধারণত সেই ধাপের হার পায়। তাই ১৪ লক্ষে থাকলে নতুন চাঁদা ১৩%, ১৬ লক্ষে থাকলে ১২%, আর ৩০ লক্ষ পেরোলে ১১%।"],
        ["h2", "৩০ লক্ষের সীমা"],
        ["p", "একই নিয়ম ৩০ লক্ষেও: প্রথম ১৫ লক্ষ ১৩%, পরের ১৫ লক্ষ ১২%, আর ৩০ লক্ষের উপরের অংশ ১১%। যত বড় জমাই হোক, প্রথম ৩০ লক্ষের মুনাফা (১,৯৫,০০০ + ১,৮০,০০০ = ৩,৭৫,০০০) সবসময় একই থাকে।"],
        ["note", "বিভিন্ন জমার অঙ্কে বছরে কত মুনাফা হয়, তার পূর্ণ তালিকা “মুনাফার হার” পেজে দেখুন।"],
      ],
    },
    en: {
      title: "What happens when your GPF passes 15 lakh or 30 lakh? Slab limits explained",
      description:
        "Does your whole GPF balance drop to 12% once it passes 15 lakh? No — only the extra part does. Examples before and after each slab limit.",
      keywords: ["GPF 15 lakh", "GPF 30 lakh", "GPF slab limit", "GPF profit rate drop"],
      body: [
        ["p", "Many people worry that once their balance passes 15 lakh, the whole amount drops from 13% to 12%. It doesn't. Slabs are bands: the first 15 lakh always earns 13%; only the part above 15 lakh earns 12%."],
        ["h2", "14 lakh vs 16 lakh"],
        ["formula", "Opening balance 14,00,000\n14,00,000 × 13% = 1,82,000\n\nOpening balance 16,00,000\n15,00,000 × 13% = 1,95,000\n 1,00,000 × 12% =    12,000\n─────────────────────────\nTotal            = 2,07,000"],
        ["p", "At 16 lakh the profit is 25,000 more than at 14 lakh. A bigger balance never earns less in total — only the extra part earns a slightly lower rate."],
        ["h2", "Effect on the rate for new subscriptions"],
        ["p", "This year's new subscriptions usually earn the rate of the band the opening balance reaches. So at 14 lakh new money earns 13%, at 16 lakh 12%, and above 30 lakh 11%."],
        ["h2", "The 30 lakh limit"],
        ["p", "The same rule applies at 30 lakh: 13% on the first 15 lakh, 12% on the next 15 lakh, 11% above 30 lakh. However large the balance, the profit on the first 30 lakh (1,95,000 + 1,80,000 = 3,75,000) stays the same."],
        ["note", "See the full table of yearly profit at different balances on the “Profit rates” page."],
      ],
    },
  },
  {
    slug: "increase-gpf-subscription-benefit",
    date: "2026-09-24",
    icon: "bi-piggy-bank",
    bn: {
      title: "GPF চাঁদা বাড়ালে কত লাভ? মাসে ৫,০০০ টাকা বাড়ানোর হিসাব",
      description:
        "মাসিক GPF চাঁদা ৫,০০০ টাকা বাড়ালে বছরে কত বাড়তি মুনাফা আসে? ১৩%, ১২% ও ১১% হারে সহজ হিসাব ও কখন চাঁদা বাড়ানো সবচেয়ে লাভজনক।",
      keywords: ["GPF চাঁদা বাড়ানো", "GPF বেশি চাঁদা লাভ", "জিপিএফ সঞ্চয়"],
      body: [
        ["p", "অনেকে ভাবেন GPF-এ চাঁদা বাড়িয়ে লাভ আছে কিনা। সহজ সূত্র দিয়েই বের করা যায়: পুরো বছর সমান চাঁদা দিলে বাড়তি অংশের মুনাফা = বাড়তি মাসিক চাঁদা × হার × ৬.৫।"],
        ["h2", "মাসে ৫,০০০ টাকা বাড়ালে প্রথম বছরে"],
        ["formula", "হার ১৩%:  ৫,০০০ × ১৩% × ৬.৫ = ৪,২২৫\nহার ১২%:  ৫,০০০ × ১২% × ৬.৫ = ৩,৯০০\nহার ১১%:  ৫,০০০ × ১১% × ৬.৫ = ৩,৫৭৫\n\nবছরে বাড়তি জমা: ৫,০০০ × ১২ = ৬০,০০০"],
        ["h2", "পরের বছর থেকে লাভ আরও বেশি"],
        ["p", "প্রথম বছরের বাড়তি ৬০,০০০ টাকা (আর তার মুনাফা) পরের বছর প্রারম্ভিক জমায় যোগ হয় এবং পুরো ১২ মাসের মুনাফা পায়। যেমন ১২% হারে শুধু ঐ ৬৩,৯০০ টাকাই পরের বছর আনে ৭,৬৬৮ টাকা — সাথে নতুন বছরের বাড়তি চাঁদার মুনাফা তো আছেই।"],
        ["h2", "কখন বাড়ানো সবচেয়ে ভালো"],
        ["ul", [
          "অর্থবছরের শুরুতে (জুলাই) — বাড়তি টাকা পুরো ১২ মাস মুনাফা পায়।",
          "ঝুঁকিমুক্ত দীর্ঘমেয়াদি সঞ্চয় চাইলে — GPF-এর হার সাধারণত ব্যাংকের সাধারণ সঞ্চয়ের চেয়ে বেশি।",
          "চাঁদার সর্বোচ্চ সীমা ও বদলানোর নিয়ম আপনার অফিস থেকে জেনে নিন।",
        ]],
        ["note", "GPF ক্যালকুলেটরে একই বছরের দুটি সংস্করণ বানিয়ে (একটায় বেশি চাঁদা) পাশাপাশি তুলনা করতে পারেন।"],
      ],
    },
    en: {
      title: "How much do you gain by raising your GPF subscription? 5,000 a month worked out",
      description:
        "Raise your monthly GPF subscription by 5,000 — how much extra profit does it earn in a year? Simple working at 13%, 12% and 11%, and when raising it pays most.",
      keywords: ["increase GPF subscription", "GPF higher subscription benefit", "GPF savings"],
      body: [
        ["p", "Is it worth raising your GPF subscription? A simple formula answers it: for a full year of equal payments, the profit on the extra = extra monthly subscription × rate × 6.5."],
        ["h2", "5,000 more a month, first year"],
        ["formula", "At 13%:  5,000 × 13% × 6.5 = 4,225\nAt 12%:  5,000 × 12% × 6.5 = 3,900\nAt 11%:  5,000 × 11% × 6.5 = 3,575\n\nExtra saved in the year: 5,000 × 12 = 60,000"],
        ["h2", "It pays more from the second year"],
        ["p", "The first year's extra 60,000 (plus its profit) joins the next opening balance and earns a full 12 months. At 12%, that 63,900 alone brings 7,668 the next year — on top of the profit on the new year's extra subscriptions."],
        ["h2", "When it's best to raise it"],
        ["ul", [
          "At the start of the fiscal year (July) — the extra earns all 12 months.",
          "When you want safe long-term saving — GPF rates are usually above an ordinary bank savings account.",
          "Ask your office about the maximum subscription and how to change it.",
        ]],
        ["note", "In GPF Calculator you can make two versions of the same year (one with a higher subscription) and compare them side by side."],
      ],
    },
  },
];

// Short labels for tight spots such as the footer.
const SHORT = {
  "how-gpf-profit-is-calculated": ["GPF মুনাফা কীভাবে হয়", "How GPF profit works"],
  "gpf-subscription-rate-8-5-or-11": ["চাঁদায় ৮.৫% নাকি ১১%?", "8.5% or 11% on subscriptions?"],
  "check-your-gpf-statement": ["স্টেটমেন্ট যাচাইয়ের ৫ ধাপ", "Check your statement in 5 steps"],
  "gpf-truncate-vs-round": ["এক পয়সার গরমিল কেন", "Why one paisa off?"],
  "gpf-balance-at-retirement": ["অবসরে GPF কত হবে", "GPF at retirement"],
  "gpf-profit-month-by-month": ["মাসভিত্তিক মুনাফার তালিকা", "Month-by-month profit"],
  "gpf-15-lakh-30-lakh-slab-limits": ["১৫ ও ৩০ লক্ষের সীমা", "The 15 & 30 lakh limits"],
  "increase-gpf-subscription-benefit": ["চাঁদা বাড়ালে কত লাভ", "Raising your subscription"],
};
for (const a of ARTICLES) {
  const [bn, en] = SHORT[a.slug] || [];
  a.bn.short = bn;
  a.en.short = en;
}

export const findArticle = (slug) => ARTICLES.find((a) => a.slug === slug);
