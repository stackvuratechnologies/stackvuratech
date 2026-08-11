'use client';

import { CheckCircle2, Lock, Database, Code2, ExternalLink } from 'lucide-react';

interface ProjectsProps {
  onOpenDemo: () => void;
}

export default function Projects({ onOpenDemo }: ProjectsProps) {
  return (
    <section id="case-studies" className="w-full py-24 px-4 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Architecture & Previous Works
          </h2>
          <p className="text-slate-600 text-lg">
            Review our proprietary Web3 integrations and DevSecOps Infrastructure code.
          </p>
        </div>

        {/* SoulVault Project Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg"><Lock className="w-6 h-6 text-blue-900" /></div>
              <h3 className="text-2xl font-bold text-slate-900">SoulVault Enterprise</h3>
            </div>
            <div className="space-y-4 text-slate-600">
              <p><strong className="text-slate-900">The Problem:</strong> Academic credential fraud and inefficient manual verification processes.</p>
              <p><strong className="text-slate-900">The Solution:</strong> A decentralized National Education Ledger utilizing Zero-Knowledge proofs for instant, private verification.</p>
            </div>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" /><span>M-Pesa API integration for automated verification fee splits</span></li>
              <li className="flex items-start space-x-2"><CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" /><span>ZK-Snarks for privacy-preserving credential checks</span></li>
            </ul>
            <div className="pt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button onClick={onOpenDemo} className="bg-blue-900 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-blue-800 transition shadow-md flex items-center justify-center space-x-2">
                <Code2 className="w-4 h-4" />
                <span>Run Interactive Demo</span>
              </button>
            </div>
          </div>
          <div className="bg-slate-50 border border-gray-200 rounded-xl p-8 shadow-sm flex items-center justify-center min-h-[300px]">
             <div className="text-center">
               <Database className="w-16 h-16 text-blue-200 mx-auto mb-4" />
               <h4 className="text-slate-700 font-bold mb-2">Zero-Knowledge Proof Verification</h4>
               <p className="text-sm text-slate-500">Live staging environment connected to testnet.</p>
             </div>
          </div>
        </div>

        {/* NexusRWA & Blueprints */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold text-slate-900 mb-3">NexusRWA Tokenization</h3>
            <p className="text-slate-600 text-sm mb-6">A smart contract bridge linking physical high-value assets to decentralized liquidity pools using the ERC-3643 standard.</p>
            <a href="https://github.com/captain-lgtm/stackvura" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-blue-900 font-bold hover:text-blue-700 transition">
              <span>View Source Code on GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-blue-900 border border-blue-800 p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold text-white mb-3">Infrastructure as Code (IaC)</h3>
            <p className="text-blue-100 text-sm mb-6">Review our proprietary DevSecOps blueprints. We deploy Dockerized Next.js and n8n environments securely via Tailscale and AWS.</p>
            <a href="https://github.com/captain-lgtm/stackvura/tree/main/infrastructure-blueprints" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-yellow-400 font-bold hover:text-yellow-300 transition">
              <span>Inspect Our Deploy Blueprints</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
