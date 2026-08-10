import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import SecOps from "@/components/SecOps";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <SecOps />
      <Contact />
      
      <footer className="w-full py-8 text-center text-gray-500 font-mono text-sm border-t border-gray-800">
        <p>Managed by StackVura Technologies © 2026 | Architected by Moses Kariuki Mwihia</p>
      </footer>
    </main>
  );
}
