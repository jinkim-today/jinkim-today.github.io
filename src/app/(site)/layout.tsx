import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
