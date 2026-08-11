'use client';

import { useState, useEffect } from 'react';
import { Check, Zap, Server, Shield, Printer } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface PricingProps {
  onOpenBooking: (serviceName?: string) => void;
}

export default function Pricing({ onOpenBooking }: PricingProps) {
  const [prices, setPrices] = useState({
    starter: 'KES 25,000',
    branding: 'Custom Quote',
    enterprise: 'KES 65,000',
    web3: 'Custom Quote'
  });

  useEffect(() => {
    const fetchPricing = async () => {
      const { data, error } = await supabase.from('pricing_services').select('service_name, price');
      
      if (data && !error) {
        const updatedPrices = { ...prices };
        
        data.forEach((service) => {
          const name = service.service_name.toLowerCase();
          if (name.includes('starter') || name.includes('sme')) {
            updatedPrices.starter = service.price;
          } else if (name.includes('print') || name.includes('brand')) {
            updatedPrices.branding = service.price;
          } else if (name.includes('enterprise') || name.includes('automation')) {
            updatedPrices.enterprise = service.price;
          } else if (name.includes('web3') || name.includes('audit')) {
            updatedPrices.web3 = service.price;
          }
        });
        
        setPrices(updatedPrices);
      }
    };

    fetchPricing();
  }, []);

  return (
    <section id="pricing" className="w-full py-24 px-4 bg-slate-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-slate-600 text-lg">
            Software, Infrastructure, and Physical Corporate Branding Services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Tier 1 */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-blue-900 mb-4">
                <Zap className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wide">Starter Digital</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Web Presence</h3>
              <p className="text-xs text-slate-500 mb-4">Perfect for SMEs needing a fast website and payment links.</p>
              <div className="text-2xl font-bold text-slate-900 mb-6">{prices.starter}</div>
              <ul className="space-y-3 text-sm text-slate-700 mb-8">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-yellow-500" /><span>High-Speed Website</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-yellow-500" /><span>M-Pesa Payment Link</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-yellow-500" /><span>Basic Domain Setup</span></li>
              </ul>
            </div>
            <button onClick={() => onOpenBooking('SME Starter Package')} className="w-full py-2.5 border border-blue-900 text-blue-900 font-semibold rounded-md hover:bg-blue-50 transition text-sm">Order Web Package</button>
          </div>

          {/* Tier 2 */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-blue-900 mb-4">
                <Printer className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wide">Design & Print</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Corporate Branding</h3>
              <p className="text-xs text-slate-500 mb-4">Professional graphic design and enterprise-grade physical printing.</p>
              <div className="text-2xl font-bold text-slate-900 mb-6">{prices.branding}</div>
              <ul className="space-y-3 text-sm text-slate-700 mb-8">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-yellow-500" /><span>Graphic & Logo Design</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-yellow-500" /><span>Smart NFC Business Cards</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-yellow-500" /><span>Staff ID Badges & Merch</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-yellow-500" /><span>Architectural Prints</span></li>
              </ul>
            </div>
            <button onClick={() => onOpenBooking('Enterprise Printing & Branding')} className="w-full py-2.5 border border-blue-900 text-blue-900 font-semibold rounded-md hover:bg-blue-50 transition text-sm">Request Print Quote</button>
          </div>

          {/* Tier 3 */}
          <div className="bg-white border-2 border-blue-900 p-6 rounded-xl shadow-xl flex flex-col justify-between relative transform md:-translate-y-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-blue-900 px-3 py-0.5 text-[10px] font-bold uppercase rounded-full shadow-sm">Popular</div>
            <div>
              <div className="flex items-center space-x-2 text-blue-900 mb-4">
                <Server className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wide">Automation</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise Ops</h3>
              <p className="text-xs text-slate-500 mb-4">Complete business overhaul with workflow bots and AWS cloud.</p>
              <div className="text-2xl font-bold text-slate-900 mb-6">{prices.enterprise}</div>
              <ul className="space-y-3 text-sm text-slate-700 mb-8">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-yellow-500" /><span>Full Custom App + Portal</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-yellow-500" /><span>WhatsApp Automation Bot</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-yellow-500" /><span>AWS Production Setup</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-yellow-500" /><span>Starter Branding Kit included</span></li>
              </ul>
            </div>
            <button onClick={() => onOpenBooking('Automation & Cloud Makeover')} className="w-full py-2.5 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-800 transition shadow-md text-sm">Select Enterprise</button>
          </div>

          {/* Tier 4 */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-blue-900 mb-4">
                <Shield className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wide">Architecture</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Web3 & Audit</h3>
              <p className="text-xs text-slate-500 mb-4">For blockchain protocols and complex zero-knowledge ledgers.</p>
              <div className="text-2xl font-bold text-slate-900 mb-6">{prices.web3}</div>
              <ul className="space-y-3 text-sm text-slate-700 mb-8">
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-yellow-500" /><span>Smart Contract Dev</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-yellow-500" /><span>Security Audit Reports</span></li>
                <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-yellow-500" /><span>Zero-Trust SecOps Mesh</span></li>
              </ul>
            </div>
            <button onClick={() => onOpenBooking('Web3 Protocol & Audit')} className="w-full py-2.5 border border-blue-900 text-blue-900 font-semibold rounded-md hover:bg-blue-50 transition text-sm">Request Architecture</button>
          </div>

        </div>
      </div>
    </section>
  );
}
