import Link from "next/link";

export default function CtaBanner({
  title = "আজই নিজের GPF হিসাব শুরু করুন",
  text = "অ্যাকাউন্ট খুলতে এক মিনিটও লাগে না — মোবাইল নম্বর আর একটা পাসওয়ার্ডই যথেষ্ট। সম্পূর্ণ বিনামূল্যে।",
}) {
  return (
    <section className="py-5">
      <div className="container">
        <div className="cta-banner">
          <div className="row align-items-center g-3">
            <div className="col-lg-8">
              <h3 className="fw-bold mb-2">{title}</h3>
              <p className="mb-0 opacity-75">{text}</p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link href="/register" className="btn btn-light btn-lg fw-semibold">
                <i className="bi bi-person-plus me-2" />
                ফ্রি অ্যাকাউন্ট খুলুন
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
