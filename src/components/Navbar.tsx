'use client';

import Link from 'next/link';
import { Terminal, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenPortal: () => void;
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenPortal, onOpenBooking }: NavbarProps) {
  return (
    <nav className="w-full border-b border-gray-800 bg-charcoal-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link href="/" className="flex items-center space-x-2 group">
          <Terminal className="w-5 h-5 text-matrix group-hover:text-electric transition-colors" />
          <span className="font-mono text-white text-sm md:text-base font-semibold tracking-tight">
            ~/stackvura-technologies
          </span>
        </Link>

        <div className="hidden md:flex space-x-8 font-mono text-sm">
          <Link href="#services" className="text-gray-400 hover:text-matrix transition-colors">
            ./services
          </Link>
          <Link href="#pricing" className="text-gray-400 hover:text-matrix transition-colors">
            ./pricing
          </Link>
          <Link href="#case-studies" className="text-gray-400 hover:text-matrix transition-colors">
            ./case-studies
          </Link>
          <Link href="#secops" className="text-gray-400 hover:text-matrix transition-colors">
            ./infrastructure
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={onOpenBooking} 
            className="hidden sm:inline-flex font-mono text-xs text-charcoal-dark bg-matrix font-bold px-3 py-1.5 rounded hover:bg-matrix-dim transition"
          >
            Book Session
          </button>

          <button 
            onClick={onOpenPortal}
            className="flex items-center space-x-2 border border-gray-700 bg-charcoal-light px-3 py-1.5 rounded cursor-pointer hover:border-gray-500 transition"
          >
            <Lock className="w-3.5 h-3.5 text-matrix" />
            <span className="font-mono text-[10px] text-gray-300 uppercase tracking-wider">
              Client Portal
            </span>
          </button>
        </div>
        
      </div>
    </nav>
  );
}
