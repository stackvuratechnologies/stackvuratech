'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Projects from "@/components/Projects";
import SecOps from "@/components/SecOps";
import Contact from "@/components/Contact";
import ClientPortalModal from "@/components/ClientPortalModal";
import BookingModal from "@/components/BookingModal";
import DemoModal from "@/components/DemoModal";
import { ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Home() {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [githubUrl, setGithubUrl] = useState('https://github.com/captain-lgtm');

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('setting_value').eq('setting_key', 'github_url').single();
      if (data) {
        setGithubUrl(data.setting_value);
      }
    };
    fetchSettings();
  }, []);

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
      <Projects onOpenDemo={() => setIsDemoOpen(true)} />
      <SecOps />
      <Contact />
      
      <footer className="w-full bg-slate-50 border-t border-gray-200 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h4 className="text-blue-900 font-bold text-lg mb-2">StackVura Technologies</h4>
            <p className="text-slate-500 text-sm">Enterprise Cloud, Software & Branding</p>
            <p className="text-slate-400 text-xs mt-2">Architected by Moses Kariuki Mwihia © 2026</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex space-x-6">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-900 transition flex items-center space-x-2">
                <GithubIcon className="w-5 h-5" />
                <span className="text-sm font-semibold">Source Code Repository</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-900 transition">
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
            <a href="#case-studies" className="text-sm font-bold text-blue-900 hover:underline flex items-center space-x-1">
              <span>View Previous Work & Case Studies</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
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

      <DemoModal 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
      />
    </main>
  );
}
