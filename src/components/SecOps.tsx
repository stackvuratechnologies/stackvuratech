'use client';

import { Server, ShieldCheck, Container, Network } from 'lucide-react';

export default function SecOps() {
  return (
    <section id="secops" className="w-full py-24 px-4 bg-charcoal">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-2">
            <span className="text-matrix">./</span>infrastructure-pipeline
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            [Executing: DevSecOps CI/CD Sequence]
          </p>
        </div>

        {/* Terminal Window UI */}
        <div className="bg-charcoal-dark border border-gray-700 rounded-lg shadow-2xl overflow-hidden font-mono">
          
          {/* Mac/Linux Window Header */}
          <div className="bg-gray-900 px-4 py-2 border-b border-gray-700 flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-xs text-gray-500">kali@cloud-instance: ~/deployment</div>
          </div>

          <div className="p-6 md:p-10 space-y-12">
            
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="p-3 bg-charcoal-light border border-gray-700 rounded-lg shrink-0 w-fit">
                <ShieldCheck className="w-6 h-6 text-matrix" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">1. Security & Static Analysis</h3>
                <p className="text-gray-400 text-sm mb-3">
                  All pushes to the main branch trigger automated vulnerability scans. Solidity contracts undergo deep static analysis using <span className="text-electric">Slither</span> in an isolated Kali Linux environment before merging.
                </p>
                <div className="bg-black p-3 rounded text-xs text-matrix leading-relaxed">
                  &gt; slither ./contracts/SoulVaultVerifier.sol --detect reentrancy,suicidal<br/>
                  [+] No vulnerabilities detected.
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="p-3 bg-charcoal-light border border-gray-700 rounded-lg shrink-0 w-fit">
                <Container className="w-6 h-6 text-matrix" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">2. Containerization & CI/CD</h3>
                <p className="text-gray-400 text-sm mb-3">
                  GitHub Actions triggers test suites on PR merges. The application is packaged into isolated <span className="text-electric">Docker</span> containers, bypassing standard Vercel deployments for complete environment control.
                </p>
                <div className="bg-black p-3 rounded text-xs text-gray-300 leading-relaxed">
                  &gt; docker build -t moses-portfolio:latest .<br/>
                  =&gt; [internal] load build definition from Dockerfile<br/>
                  =&gt; =&gt; exporting to image
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="p-3 bg-charcoal-light border border-gray-700 rounded-lg shrink-0 w-fit">
                <Server className="w-6 h-6 text-matrix" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">3. AWS Cloud Configuration</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Multi-tenant deployment on an AWS EC2 instance. Traffic is routed efficiently through an <span className="text-electric">Nginx</span> reverse proxy, ensuring high availability and secure request handling.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="p-3 bg-charcoal-light border border-gray-700 rounded-lg shrink-0 w-fit">
                <Network className="w-6 h-6 text-matrix" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">4. Zero Trust Network Layer</h3>
                <p className="text-gray-400 text-sm">
                  Public-facing endpoints are secured with strict SSL/TLS certificates. Remote administrative access to the VPS is entirely locked down behind a <span className="text-electric">Tailscale</span> VPN mesh network.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
