'use client';

import { Workflow, ShieldAlert, CloudCog, Code, Printer, CheckCircle } from 'lucide-react';

interface ServicesProps {
  onOpenBooking: (serviceName?: string) => void;
}

export default function Services({ onOpenBooking }: ServicesProps) {
  return (
    <section id="services" className="w-full py-24 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Core Solutions
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            End-to-End Technology, Software, Infrastructure & Enterprise Printing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Service 1 */}
          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <Code className="w-10 h-10 text-blue-900 mb-6" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Custom Software Development</h3>
              
              <div className="mb-4 bg-blue-50 p-4 rounded-md border border-blue-100 text-sm text-slate-700">
                <p className="font-bold text-blue-900 mb-1">Business Value:</p>
                <p>We build fast, high-converting platforms and secure client portals to drive revenue.</p>
              </div>

              <ul className="text-sm text-slate-600 space-y-3 mb-8">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>Corporate Websites & Web Apps</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>Customer Login & ERP Dashboards</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>Blockchain & Protocol Integration</span>
                </li>
              </ul>
            </div>
            <button onClick={() => onOpenBooking('Custom Web & Software')} className="w-full py-3 border border-blue-900 text-blue-900 font-semibold rounded-md hover:bg-blue-50 transition">
              Book Discovery
            </button>
          </div>

          {/* Service 2 */}
          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <Workflow className="w-10 h-10 text-blue-900 mb-6" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Business Workflow Automation</h3>
              
              <div className="mb-4 bg-blue-50 p-4 rounded-md border border-blue-100 text-sm text-slate-700">
                <p className="font-bold text-blue-900 mb-1">Business Value:</p>
                <p>Connect payments directly to your systems and automate customer notifications.</p>
              </div>

              <ul className="text-sm text-slate-600 space-y-3 mb-8">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>Automated Payment Receipts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>WhatsApp & SMS Customer Bots</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>Custom Workflow Pipelines</span>
                </li>
              </ul>
            </div>
            <button onClick={() => onOpenBooking('Workflow Automation')} className="w-full py-3 border border-blue-900 text-blue-900 font-semibold rounded-md hover:bg-blue-50 transition">
              Automate My Business
            </button>
          </div>

          {/* Service 3 */}
          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <CloudCog className="w-10 h-10 text-blue-900 mb-6" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Cloud & Server Architecture</h3>
              
              <div className="mb-4 bg-blue-50 p-4 rounded-md border border-blue-100 text-sm text-slate-700">
                <p className="font-bold text-blue-900 mb-1">Business Value:</p>
                <p>Prevent crashes during high traffic. We set up reliable AWS environments.</p>
              </div>

              <ul className="text-sm text-slate-600 space-y-3 mb-8">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>AWS EC2 Deployment</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>Docker Containerization</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0" />
                  <span>Cost Optimization</span>
                </li>
              </ul>
            </div>
            <button onClick={() => onOpenBooking('Cloud Architecture')} className="w-full py-3 border border-blue-900 text-blue-900 font-semibold rounded-md hover:bg-blue-50 transition">
              Request Cloud Audit
            </button>
          </div>

          {/* Service 4 & 5... */}
        </div>
      </div>
    </section>
  );
}
