'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Projects from "@/components/Projects";
import SecOps from "@/components/SecOps";
import Contact from "@/components/Contact";
import ClientPortalModal from "@/components/ClientPortalModal";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceName?: string) => {
    setSelectedService(serviceName);
    setIsBookingOpen(true);
  };

  return (
    <main className="flex min-h-screen flex-col w-full">
      <Navbar 
        onOpenPortal={() => setIsPortalOpen(true)} 
        onOpenBooking={() => handleOpenBooking()} 
      />
      
      <Hero />
      <Services onOpenBooking={handleOpenBooking} />
      <Pricing onOpenBooking={handleOpenBooking} />
      <Projects />
      <SecOps />
      <Contact />
      
      <footer className="w-full py-8 text-center text-gray-500 font-mono text-sm border-t border-gray-800">
        <p>Managed by StackVura Technologies © 2026 | Architected by Moses Kariuki Mwihia</p>
      </footer>

      {/* Interactive Modals */}
      <ClientPortalModal 
        isOpen={isPortalOpen} 
        onClose={() => setIsPortalOpen(false)} 
      />
      
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        preselectedService={selectedService}
      />
    </main>
  );
}
