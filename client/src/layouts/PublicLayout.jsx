import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-stone-50 to-white">
      <Navbar />
      <ScrollToTop />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
