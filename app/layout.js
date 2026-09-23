import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "PF Calculator — বছর সমাপনী হিসাব",
  description: "প্রভিডেন্ট ফান্ডের স্ল্যাব-ভিত্তিক বছর সমাপনী প্রফিট ও ক্লোজিং ব্যালেন্স হিসাব",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <nav className="navbar navbar-expand-lg app-navbar sticky-top">
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center gap-2" href="/">
              <i className="bi bi-calculator-fill" />
              <span>PF Calculator</span>
            </Link>
            <div className="d-flex gap-2">
              <Link className="btn btn-sm btn-outline-light" href="/">
                <i className="bi bi-list-ul me-1" />
                সব বছর
              </Link>
              <Link className="btn btn-sm btn-light" href="/year/new">
                <i className="bi bi-plus-lg me-1" />
                নতুন হিসাব
              </Link>
            </div>
          </div>
        </nav>

        <main className="container py-4">{children}</main>

        <footer className="text-center text-muted small py-4">
          জুলাই – জুন অর্থবছর • স্ল্যাব ভিত্তিক প্রফিট হিসাব
        </footer>

        <ToastContainer position="top-right" autoClose={2500} newestOnTop theme="colored" />
      </body>
    </html>
  );
}
