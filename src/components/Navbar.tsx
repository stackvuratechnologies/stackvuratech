'use client';

import Link from 'next/link';
import { Layers, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenPortal: () => void;
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenPortal, onOpenBooking }: NavbarProps) {
  return (
    <nav className="w-full border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link href="/" className="flex items-center space-x-2 group">
          <Layers className="w-6 h-6 text-blue-900" />
          <span className="font-sans text-blue-900 text-sm md:text-lg font-bold tracking-tight">
            StackVura Technologies
          </span>
        </Link>

        <div className="hidden md:flex space-x-8 font-sans text-sm font-medium">
          <Link href="#services" className="text-slate-600 hover:text-blue-900 transition-colors">
            Services
          </Link>
          <Link href="#pricing" className="text-slate-600 hover:text-blue-900 transition-colors">
            Pricing
          </Link>
          <Link href="#case-studies" className="text-slate-600 hover:text-blue-900 transition-colors">
            Case Studies
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={onOpenBooking} 
            className="hidden sm:inline-flex font-sans text-sm text-white bg-blue-900 font-semibold px-4 py-2 rounded-md hover:bg-blue-800 transition shadow-sm"
          >
            Book Consultation
          </button>

          <button 
            onClick={onOpenPortal}
            className="flex items-center space-x-2 border border-gray-300 bg-gray-50 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition shadow-sm"
          >
            <Lock className="w-4 h-4 text-blue-900" />
            <span className="font-sans text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Client Portal
            </span>
          </button>
        </div>
        
      </div>
    </nav>
  );
}
