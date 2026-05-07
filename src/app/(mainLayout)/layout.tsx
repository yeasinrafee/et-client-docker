import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
}
