import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <Header />
      <main>
        <Hero />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
