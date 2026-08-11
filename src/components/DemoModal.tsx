'use client';

import { useState } from 'react';
import { X, ShieldCheck, Search, CheckCircle2, Loader2 } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success'>('idle');
  const [credentialId, setCredentialId] = useState('SV-2026-8921-MACHAKOS');

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('verifying');
    // Simulate Blockchain ZK-Proof Verification delay
    setTimeout(() => {
      setStatus('success');
    }, 2500);
  };

  const handleClose = () => {
    setStatus('idle');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white border border-gray-200 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative">
        
        <div className="bg-blue-900 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 text-white">
            <ShieldCheck className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-lg">SoulVault Live Demo</span>
          </div>
          <button onClick={handleClose} className="text-blue-200 hover:text-white transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {status === 'idle' && (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">Zero-Knowledge Verification</h3>
                <p className="text-sm text-slate-600 mt-2">Test the staging environment. Enter a sample student credential ID to verify it against the blockchain ledger without revealing personal data.</p>
              </div>

              <div className="space-y-2 text-sm">
                <label className="font-semibold text-slate-700">Credential ID / Hash</label>
                <input 
                  type="text" 
                  value={credentialId} 
                  onChange={(e) => setCredentialId(e.target.value)} 
                  className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 font-mono focus:border-blue-900 focus:ring-1 focus:outline-none" 
                />
              </div>

              <button type="submit" className="w-full flex items-center justify-center space-x-2 bg-blue-900 text-white font-bold py-3 rounded-md hover:bg-blue-800 transition shadow-md">
                <Search className="w-5 h-5" />
                <span>Verify Credential on Chain</span>
              </button>
            </form>
          )}

          {status === 'verifying' && (
            <div className="text-center py-12 space-y-4">
              <Loader2 className="w-12 h-12 text-blue-900 animate-spin mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">Querying Network...</h3>
              <p className="text-sm text-slate-600 font-mono">Generating ZK-Snark Proof...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Authentic Credential</h3>
              <div className="bg-slate-50 border border-gray-200 p-4 rounded-md text-left mb-6 font-mono text-xs text-slate-700 space-y-2 shadow-inner">
                <p><span className="font-bold text-blue-900">Institution:</span> Machakos University</p>
                <p><span className="font-bold text-blue-900">Status:</span> Valid & Immutable</p>
                <p><span className="font-bold text-blue-900">Block Confirmations:</span> 12</p>
                <p className="text-[10px] text-slate-500 break-all">Tx: 0x8f3b2a1c9e4d...7b5f</p>
              </div>
              <button onClick={handleClose} className="w-full bg-slate-100 border border-gray-300 py-3 text-slate-700 font-semibold rounded-md hover:bg-gray-200 transition">
                End Demo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
