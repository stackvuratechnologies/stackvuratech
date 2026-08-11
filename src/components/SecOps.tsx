'use client';

import { Server, ShieldCheck, Container, Network } from 'lucide-react';

export default function SecOps() {
  return (
    <section id="secops" className="w-full py-24 px-4 bg-slate-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Infrastructure Pipeline
          </h2>
          <p className="text-slate-600 text-lg">
            Our Enterprise DevSecOps Workflow
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="flex space-x-4">
              <div className="bg-blue-50 p-4 rounded-full h-fit"><ShieldCheck className="w-6 h-6 text-blue-900" /></div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">1. Security & Static Analysis</h3>
                <p className="text-slate-600 text-sm">Automated vulnerability scans and deep static analysis in isolated environments before any deployment.</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="bg-blue-50 p-4 rounded-full h-fit"><Container className="w-6 h-6 text-blue-900" /></div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">2. Containerization & CI/CD</h3>
                <p className="text-slate-600 text-sm">Applications are packaged into secure Docker containers, ensuring stable and repeatable environment control.</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="bg-blue-50 p-4 rounded-full h-fit"><Server className="w-6 h-6 text-blue-900" /></div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">3. Cloud Configuration</h3>
                <p className="text-slate-600 text-sm">Multi-tenant deployment on AWS EC2 instances, routed efficiently through Nginx reverse proxies for high availability.</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="bg-blue-50 p-4 rounded-full h-fit"><Network className="w-6 h-6 text-blue-900" /></div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">4. Zero Trust Network</h3>
                <p className="text-slate-600 text-sm">Strict SSL/TLS certificates on all public endpoints. Administrative access is locked behind a secure VPN mesh network.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
