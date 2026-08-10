'use client';

import { CheckCircle2, Lock, Database, Code2 } from 'lucide-react';

export default function Projects() {
  return (
    <section id="case-studies" className="w-full py-24 px-4 bg-charcoal-dark border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-mono text-white mb-2">
            <span className="text-matrix">./</span>proprietary-infrastructure
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            [Status: StackVura Internal R&D Staging Deployments]
          </p>
        </div>

        {/* SoulVault Project Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          
          {/* Left Column: Problem/Solution */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Lock className="w-8 h-8 text-electric" />
              <h3 className="text-2xl font-bold text-white">SoulVault Enterprise</h3>
            </div>
            
            <div className="space-y-4 text-gray-400">
              <p>
                <strong className="text-white">The Problem:</strong> Academic credential fraud and inefficient manual verification processes across Kenyan institutions.
              </p>
              <p>
                <strong className="text-white">The Solution:</strong> A decentralized National Education Ledger. Utilizes Zero-Knowledge (ZK) proofs to maintain student privacy while offering instant, immutable verification.
              </p>
            </div>

            <ul className="space-y-3 font-mono text-sm">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-matrix" />
                <span>Base Network Staging Deployment</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-matrix" />
                <span>M-Pesa API integration for automated verification fee splits</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-matrix" />
                <span>ZK-Snarks for privacy-preserving credential checks</span>
              </li>
            </ul>

            <div className="pt-4">
              <button className="bg-electric text-charcoal-dark px-6 py-2 rounded font-mono font-bold hover:bg-electric-deep transition-colors">
                Run Verify Demo
              </button>
            </div>
          </div>

          {/* Right Column: Code/Architecture Visual */}
          <div className="bg-charcoal border border-gray-700 rounded-lg p-6 font-mono text-xs text-gray-300 shadow-2xl overflow-x-auto">
            <div className="flex items-center space-x-2 mb-4 border-b border-gray-700 pb-2">
              <Code2 className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">SoulVaultVerifier.sol</span>
            </div>
            <pre>
{`function verifyCredential(
    bytes32 institutionId, 
    bytes32 studentId, 
    bytes calldata zkProof
) external payable returns (bool) {
    require(msg.value == verificationFee, "Invalid fee");
    
    // Split M-Pesa mapped fee to authorities
    _distributeFees();
    
    // Verify zero-knowledge proof
    bool isValid = zkVerifier.verifyProof(zkProof);
    require(isValid, "Invalid credential proof");
    
    emit CredentialVerified(institutionId, studentId);
    return true;
}`}
            </pre>
          </div>
        </div>

        {/* NexusRWA Project Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-col-reverse lg:flex-row">
          
          {/* Left Column: Architecture Visual (Swapped for layout variety) */}
          <div className="bg-charcoal border border-gray-700 rounded-lg p-6 shadow-2xl order-2 lg:order-1">
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
               <Database className="w-12 h-12 text-matrix opacity-50" />
               <p className="font-mono text-gray-500 text-sm text-center">
                 [ Foundry Test Suite & Gas Optimization Reports ]<br/><br/>
                 100% Contract Coverage<br/>
                 Slither Audited
               </p>
            </div>
          </div>

          {/* Right Column: Problem/Solution */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="flex items-center space-x-3">
              <Database className="w-8 h-8 text-matrix" />
              <h3 className="text-2xl font-bold text-white">NexusRWA</h3>
            </div>
            
            <div className="space-y-4 text-gray-400">
              <p>
                <strong className="text-white">The Problem:</strong> Illiquidity in traditional physical markets and high barriers to entry for high-value asset investment.
              </p>
              <p>
                <strong className="text-white">The Solution:</strong> Next-generation Real-World Asset (RWA) tokenization. A smart contract bridge linking physical assets to decentralized liquidity pools.
              </p>
            </div>

            <ul className="space-y-3 font-mono text-sm">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-matrix" />
                <span>ERC-3643 Permissioned Token Standard</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-matrix" />
                <span>Rigorous Foundry testing & gas optimization</span>
              </li>
            </ul>
             <div className="pt-4">
              <a href="#" className="text-electric hover:text-white font-mono underline underline-offset-4 transition-colors">
                View GitHub Repository -&gt;
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
