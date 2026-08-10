'use client';

import { Workflow, ShieldAlert, CloudCog, Code } from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="w-full py-24 px-4 bg-charcoal-dark border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-2">
            <span className="text-matrix">./</span>core-solutions
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            [Deploying: Technology that drives revenue and reduces overhead]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Service 1: Web & Software */}
          <div className="bg-charcoal border border-gray-800 p-8 rounded-lg hover:border-electric transition-colors group">
            <Code className="w-10 h-10 text-matrix mb-6 group-hover:text-electric transition-colors" />
            <h3 className="text-xl font-bold text-white mb-3">Custom Web & Software Development</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your digital presence needs to convert. We build high-performance corporate websites, customer portals, and full-scale web applications. For enterprises ready for the future, we seamlessly integrate blockchain for secure, transparent digital ledgers.
            </p>
            <span className="text-electric font-mono text-xs uppercase tracking-wider">Websites & Custom Platforms</span>
          </div>

          {/* Service 2: Automation */}
          <div className="bg-charcoal border border-gray-800 p-8 rounded-lg hover:border-electric transition-colors group">
            <Workflow className="w-10 h-10 text-matrix mb-6 group-hover:text-electric transition-colors" />
            <h3 className="text-xl font-bold text-white mb-3">Business Workflow Automation</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Stop losing hours to manual data entry. We connect your disjointed systems. We build pipelines that link M-Pesa billing directly to your databases and automate WhatsApp customer responses, putting your daily operations on autopilot.
            </p>
            <span className="text-electric font-mono text-xs uppercase tracking-wider">Process Automation</span>
          </div>

          {/* Service 3: Cloud Architecture */}
          <div className="bg-charcoal border border-gray-800 p-8 rounded-lg hover:border-electric transition-colors group">
            <CloudCog className="w-10 h-10 text-matrix mb-6 group-hover:text-electric transition-colors" />
            <h3 className="text-xl font-bold text-white mb-3">Cloud Architecture & Modernization</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Is your software slow or crashing under load? We migrate legacy systems to highly available, cost-effective AWS cloud environments. We manage the servers and infrastructure so your business stays online 24/7 without needing an in-house IT team.
            </p>
            <span className="text-electric font-mono text-xs uppercase tracking-wider">AWS Server Management</span>
          </div>

          {/* Service 4: Cybersecurity */}
          <div className="bg-charcoal border border-gray-800 p-8 rounded-lg hover:border-electric transition-colors group">
            <ShieldAlert className="w-10 h-10 text-matrix mb-6 group-hover:text-electric transition-colors" />
            <h3 className="text-xl font-bold text-white mb-3">Cybersecurity & SecOps Auditing</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              A data breach can destroy a business. We provide end-to-end security audits. From penetration testing your current websites and locking down administrative cloud access, to rigorous security reviews of Web3 smart contracts before they go live.
            </p>
            <span className="text-electric font-mono text-xs uppercase tracking-wider">Enterprise Protection</span>
          </div>

        </div>
      </div>
    </section>
  );
}
