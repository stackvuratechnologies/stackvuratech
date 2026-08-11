'use client';

import { Workflow, ShieldAlert, CloudCog, Code, Printer, CheckCircle } from 'lucide-react';

interface ServicesProps {
  onOpenBooking: (serviceName?: string) => void;
}

export default function Services({ onOpenBooking }: ServicesProps) {
  return (
    <section id="services" className="w-full py-24 px-4 bg-charcoal-dark border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-2">
            <span className="text-matrix">./</span>core-solutions
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            [Deploying: End-to-End Technology, Software, Infrastructure & Enterprise Printing]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Service 1: Custom Software & Web2/Web3 */}
          <div className="bg-charcoal border border-gray-800 p-8 rounded-lg hover:border-electric transition-colors group flex flex-col justify-between">
            <div>
              <Code className="w-10 h-10 text-matrix mb-6 group-hover:text-electric transition-colors" />
              <h3 className="text-xl font-bold text-white mb-3">Custom Web & Software Development</h3>
              
              <div className="mb-4 bg-charcoal-dark p-3 rounded border border-gray-800 text-xs text-gray-300 space-y-1">
                <p className="font-bold text-electric">Why Your Business Needs It:</p>
                <p>A slow or outdated website loses customers. We build fast, high-converting platforms, client portals, and secure Web3 apps.</p>
              </div>

              <ul className="text-xs text-gray-400 space-y-2 mb-6 font-mono">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-matrix" />
                  <span>Corporate Websites & Web Apps</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-matrix" />
                  <span>Customer Login & ERP Dashboards</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-matrix" />
                  <span>Blockchain & Smart Contract Integration</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onOpenBooking('Custom Web & Software')} 
              className="w-full py-2 bg-charcoal-light border border-gray-700 text-matrix font-mono text-xs hover:bg-matrix hover:text-charcoal-dark font-bold transition rounded"
            >
              Book Development Discovery
            </button>
          </div>

          {/* Service 2: Business Automation */}
          <div className="bg-charcoal border border-gray-800 p-8 rounded-lg hover:border-electric transition-colors group flex flex-col justify-between">
            <div>
              <Workflow className="w-10 h-10 text-matrix mb-6 group-hover:text-electric transition-colors" />
              <h3 className="text-xl font-bold text-white mb-3">Business Workflow & M-Pesa Automation</h3>
              
              <div className="mb-4 bg-charcoal-dark p-3 rounded border border-gray-800 text-xs text-gray-300 space-y-1">
                <p className="font-bold text-electric">Why Your Business Needs It:</p>
                <p>Manual receipt checking wastes staff time. We connect M-Pesa payments directly to your systems and automate customer WhatsApp notifications.</p>
              </div>

              <ul className="text-xs text-gray-400 space-y-2 mb-6 font-mono">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-matrix" />
                  <span>Automated M-Pesa Payment Receipts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-matrix" />
                  <span>WhatsApp & SMS Customer Bots</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-matrix" />
                  <span>n8n Custom Workflow Pipelines</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onOpenBooking('Workflow Automation')} 
              className="w-full py-2 bg-charcoal-light border border-gray-700 text-matrix font-mono text-xs hover:bg-matrix hover:text-charcoal-dark font-bold transition rounded"
            >
              Automate My Business
            </button>
          </div>

          {/* Service 3: Cloud & Server Management */}
          <div className="bg-charcoal border border-gray-800 p-8 rounded-lg hover:border-electric transition-colors group flex flex-col justify-between">
            <div>
              <CloudCog className="w-10 h-10 text-matrix mb-6 group-hover:text-electric transition-colors" />
              <h3 className="text-xl font-bold text-white mb-3">Cloud Architecture & AWS Setup</h3>
              
              <div className="mb-4 bg-charcoal-dark p-3 rounded border border-gray-800 text-xs text-gray-300 space-y-1">
                <p className="font-bold text-electric">Why Your Business Needs It:</p>
                <p>Prevent site crashes during high traffic. We set up reliable AWS cloud servers and dockerized environments that stay online 24/7.</p>
              </div>

              <ul className="text-xs text-gray-400 space-y-2 mb-6 font-mono">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-matrix" />
                  <span>AWS EC2 & Nginx Deployment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-matrix" />
                  <span>Docker Containerization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-matrix" />
                  <span>Cost Optimization (Zero Waste)</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onOpenBooking('Cloud Architecture')} 
              className="w-full py-2 bg-charcoal-light border border-gray-700 text-matrix font-mono text-xs hover:bg-matrix hover:text-charcoal-dark font-bold transition rounded"
            >
              Request Cloud Audit
            </button>
          </div>

          {/* Service 4: Cybersecurity */}
          <div className="bg-charcoal border border-gray-800 p-8 rounded-lg hover:border-electric transition-colors group flex flex-col justify-between">
            <div>
              <ShieldAlert className="w-10 h-10 text-matrix mb-6 group-hover:text-electric transition-colors" />
              <h3 className="text-xl font-bold text-white mb-3">Cybersecurity & SecOps Auditing</h3>
              
              <div className="mb-4 bg-charcoal-dark p-3 rounded border border-gray-800 text-xs text-gray-300 space-y-1">
                <p className="font-bold text-electric">Why Your Business Needs It:</p>
                <p>Protect your client data and reputation from hackers. We run penetration tests on websites and perform static audits on smart contracts.</p>
              </div>

              <ul className="text-xs text-gray-400 space-y-2 mb-6 font-mono">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-matrix" />
                  <span>Vulnerability Penetration Testing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-matrix" />
                  <span>Solidity & Smart Contract Auditing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-matrix" />
                  <span>Tailscale Secure VPN Setup</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onOpenBooking('Cybersecurity & Auditing')} 
              className="w-full py-2 bg-charcoal-light border border-gray-700 text-matrix font-mono text-xs hover:bg-matrix hover:text-charcoal-dark font-bold transition rounded"
            >
              Schedule Security Audit
            </button>
          </div>

          {/* Service 5: Enterprise Printing & Branding Services */}
          <div className="bg-charcoal border border-gray-800 p-8 rounded-lg hover:border-electric transition-colors group flex flex-col justify-between lg:col-span-2">
            <div>
              <Printer className="w-10 h-10 text-electric mb-6 group-hover:text-matrix transition-colors" />
              <h3 className="text-xl font-bold text-white mb-3">Enterprise Printing & Hardware Branding</h3>
              
              <div className="mb-4 bg-charcoal-dark p-3 rounded border border-gray-800 text-xs text-gray-300 space-y-1">
                <p className="font-bold text-electric">Why Your Business Needs It:</p>
                <p>Physical presentation matters. We produce high-grade printed corporate assets, smart NFC business cards, technical documentation, staff ID badges, and custom merchandise.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-400 font-mono mb-6">
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-electric" />
                    <span>Smart NFC & Digital Business Cards</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-electric" />
                    <span>RFID Staff ID Badges & Lanyards</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-electric" />
                    <span>Technical Manuals & Architectural Prints</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-electric" />
                    <span>Custom Corporate Tech Apparel & Merch</span>
                  </li>
                </ul>
              </div>
            </div>

            <button 
              onClick={() => onOpenBooking('Enterprise Printing & Branding')} 
              className="w-full py-2 bg-electric text-charcoal-dark font-mono text-xs font-bold hover:bg-electric-deep transition rounded"
            >
              Request Printing & Collateral Quote
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
