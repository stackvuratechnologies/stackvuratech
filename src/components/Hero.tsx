'use client';

import { Server, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="w-full py-24 px-4 flex flex-col items-center text-center justify-center max-w-4xl mx-auto min-h-[70vh]">
      
      <div className="mb-6 inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full text-sm font-semibold text-blue-900">
        <span>Enterprise Technology Solutions</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
        Building Scalable <span className="text-blue-900">Infrastructure</span> For Your Business
      </h1>
      
      <p className="text-slate-600 text-lg md:text-xl max-w-3xl leading-relaxed mb-10">
        We solve complex business bottlenecks. From building lightning-fast enterprise websites and securing cloud architectures, to automating daily workflows and integrating next-generation software solutions.
      </p>

      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto justify-center">
        <a href="#services" className="flex items-center justify-center space-x-2 bg-blue-900 text-white px-8 py-3.5 rounded-md font-semibold hover:bg-blue-800 transition-colors shadow-md">
          <Globe className="w-5 h-5" />
          <span>Explore Solutions</span>
        </a>
        <a href="#case-studies" className="flex items-center justify-center space-x-2 border border-slate-300 bg-white text-slate-700 px-8 py-3.5 rounded-md font-semibold hover:bg-slate-50 transition-colors shadow-sm">
          <Server className="w-5 h-5 text-blue-900" />
          <span>View Case Studies</span>
        </a>
      </div>
      
    </section>
  );
}
