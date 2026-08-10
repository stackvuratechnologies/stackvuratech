'use client';

import { Server, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="w-full py-24 px-4 flex flex-col items-start justify-center max-w-6xl mx-auto min-h-[70vh]">
      
      <div className="mb-6 inline-flex items-center space-x-2 bg-charcoal-light border border-gray-800 px-3 py-1 rounded font-mono text-xs text-matrix">
        <span className="text-gray-500">$</span>
        <span>systemctl status stackvura-infrastructure</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
        StackVura Technologies
      </h1>
      
      <h2 className="text-xl md:text-3xl font-mono text-electric-deep mb-6">
        Enterprise Software, Cloud & Cybersecurity
      </h2>
      
      <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
        We solve complex business bottlenecks. From building lightning-fast enterprise websites and securing cloud architectures, to automating daily workflows and integrating next-generation blockchain solutions. We build technology that makes your business faster, safer, and more profitable.
      </p>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
        <a href="#services" className="flex items-center justify-center space-x-2 bg-matrix text-charcoal-dark px-6 py-3 rounded font-mono font-bold hover:bg-matrix-dim transition-colors">
          <Globe className="w-4 h-4" />
          <span>Explore Our Solutions</span>
        </a>
        <a href="#case-studies" className="flex items-center justify-center space-x-2 border border-gray-700 bg-charcoal-light text-white px-6 py-3 rounded font-mono hover:border-gray-500 transition-colors">
          <Server className="w-4 h-4 text-electric" />
          <span>View Architecture Case Studies</span>
        </a>
      </div>
      
    </section>
  );
}
