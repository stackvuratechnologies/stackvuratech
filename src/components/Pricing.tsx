'use client';

import { Check, Zap, Server, Shield, Printer } from 'lucide-react';

interface PricingProps {
  onOpenBooking: (serviceName?: string) => void;
}

export default function Pricing({ onOpenBooking }: PricingProps) {
  return (
    <section id="pricing" className="w-full py-24 px-4 bg-charcoal border-t border-gray-800">
      <div className="max-w-6xl mx-auto font-mono">
        
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            <span className="text-matrix">./</span>transparent-pricing
          </h2>
          <p className="text-gray-400 text-sm">
            [Flexible Service Tiering for Bootstrapping SMEs & Scaling Enterprises]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Tier 1 */}
          <div className="bg-charcoal-dark border border-gray-800 p-8 rounded-lg flex flex-col justify-between hover:border-gray-600 transition">
            <div>
              <div className="flex items-center space-x-2 text-matrix mb-4">
                <Zap className="w-5 h-5" />
                <span className="text-xs font-bold uppercase">SME Starter Package</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Business Digital Package</h3>
              <p className="text-xs text-gray-400 mb-6">Perfect for businesses needing a fast website, M-Pesa receipts, and starter printed cards.</p>
              
              <div className="text-3xl font-bold text-white mb-6">
                KES 25,000 <span className="text-xs font-normal text-gray-400">/ project</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-300 mb-8">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-matrix" />
                  <span>High-Speed Corporate Web Presence</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-matrix" />
                  <span>Basic M-Pesa Payment Notification Link</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-matrix" />
                  <span>100 Printed Corporate Business Cards</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-matrix" />
                  <span>Basic Domain & SSL Certificate Setup</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onOpenBooking('SME Starter Package')} 
              className="w-full py-3 bg-charcoal border border-gray-700 text-white text-xs font-bold hover:border-matrix hover:text-matrix transition rounded"
            >
              Order Starter Package
            </button>
          </div>

          {/* Tier 2 - Highlighted */}
          <div className="bg-charcoal-dark border-2 border-matrix p-8 rounded-lg flex flex-col justify-between relative shadow-2xl">
            <div className="absolute -top-3 right-6 bg-matrix text-charcoal-dark px-3 py-0.5 text-[10px] font-bold uppercase rounded">
              Most Popular
            </div>

            <div>
              <div className="flex items-center space-x-2 text-electric mb-4">
                <Server className="w-5 h-5" />
                <span className="text-xs font-bold uppercase">Automation & Cloud Makeover</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise Operations</h3>
              <p className="text-xs text-gray-400 mb-6">Complete business overhaul with full automated pipelines and AWS cloud migration.</p>
              
              <div className="text-3xl font-bold text-white mb-6">
                KES 65,000 <span className="text-xs font-normal text-gray-400">/ project</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-300 mb-8">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-matrix" />
                  <span>Full Next.js Custom App + Client Portal</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-matrix" />
                  <span>n8n Business Workflow & WhatsApp Bot</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-matrix" />
                  <span>AWS Docker & Nginx Production Setup</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-matrix" />
                  <span>25 Smart NFC Cards + Staff ID Badges</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onOpenBooking('Automation & Cloud Makeover')} 
              className="w-full py-3 bg-matrix text-charcoal-dark text-xs font-bold hover:bg-matrix-dim transition rounded"
            >
              Select Enterprise Package
            </button>
          </div>

          {/* Tier 3 */}
          <div className="bg-charcoal-dark border border-gray-800 p-8 rounded-lg flex flex-col justify-between hover:border-gray-600 transition">
            <div>
              <div className="flex items-center space-x-2 text-electric mb-4">
                <Shield className="w-5 h-5" />
                <span className="text-xs font-bold uppercase">Web3 & Custom Architecture</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Web3 Protocol & Audit</h3>
              <p className="text-xs text-gray-400 mb-6">For blockchain protocols, smart contract audits, and zero-knowledge ledger builds.</p>
              
              <div className="text-3xl font-bold text-white mb-6">
                Custom Quote
              </div>

              <ul className="space-y-3 text-xs text-gray-300 mb-8">
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-electric" />
                  <span>Solidity Smart Contract Development</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-electric" />
                  <span>Slither & Foundry Security Audit Reports</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-electric" />
                  <span>Zero-Trust SecOps & Tailscale Mesh</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-electric" />
                  <span>Custom Hardware & Printing Collateral</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onOpenBooking('Web3 Protocol & Audit')} 
              className="w-full py-3 bg-charcoal border border-gray-700 text-white text-xs font-bold hover:border-electric hover:text-electric transition rounded"
            >
              Request Custom Quote
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
