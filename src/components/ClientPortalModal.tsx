'use client';

import { useState } from 'react';
import { X, Lock, CheckCircle2, FileText, Printer, Shield, Clock } from 'lucide-react';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClientPortalModal({ isOpen, onClose }: ClientPortalModalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-mono">
      <div className="bg-charcoal-dark border border-gray-700 w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-gray-900 px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-matrix" />
            <span className="text-white font-bold text-sm">StackVura Client Portal</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isLoggedIn ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white">Client Access Dashboard</h3>
                <p className="text-xs text-gray-400 mt-1">Access project telemetry, invoices, and printing deliverables.</p>
              </div>

              <div className="space-y-2 text-sm">
                <label className="text-gray-300">Corporate Email</label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="client@company.com" 
                  className="w-full bg-charcoal border border-gray-700 rounded p-3 text-white focus:border-matrix focus:outline-none"
                />
              </div>

              <div className="space-y-2 text-sm">
                <label className="text-gray-300">Access Passkey / Password</label>
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••••••" 
                  className="w-full bg-charcoal border border-gray-700 rounded p-3 text-white focus:border-matrix focus:outline-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-matrix text-charcoal-dark font-bold py-3 rounded hover:bg-matrix-dim transition mt-4"
              >
                Authenticate Session
              </button>

              <div className="text-center pt-2">
                <p className="text-[11px] text-gray-500">
                  Demo Credentials: Enter any email to test the client dashboard preview locally.
                </p>
              </div>
            </form>
          ) : (
            /* Authenticated Portal Dashboard */
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Welcome back, {email.split('@')[0]}</h3>
                  <p className="text-xs text-matrix">Account Status: Active Client [Enterprise Tier]</p>
                </div>
                <button 
                  onClick={() => setIsLoggedIn(false)} 
                  className="text-xs text-red-400 hover:underline"
                >
                  Sign Out
                </button>
              </div>

              {/* Active Projects Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-charcoal p-4 rounded border border-gray-800">
                  <div className="flex items-center space-x-2 text-electric mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">Active Build</span>
                  </div>
                  <h4 className="text-white font-bold text-sm">Web3 Loyalty Portal & ERP Integration</h4>
                  <p className="text-xs text-gray-400 mt-1">Progress: 85% (Staging QA)</p>
                </div>

                <div className="bg-charcoal p-4 rounded border border-gray-800">
                  <div className="flex items-center space-x-2 text-matrix mb-2">
                    <Printer className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">Printing Batch</span>
                  </div>
                  <h4 className="text-white font-bold text-sm">NFC Smart Business Cards (500 units)</h4>
                  <p className="text-xs text-gray-400 mt-1">Status: Ready for Dispatch</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <h4 className="text-xs text-gray-400 uppercase tracking-wider">Client Quick Actions</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button className="bg-charcoal border border-gray-700 p-3 rounded text-xs text-gray-300 hover:border-matrix hover:text-white flex flex-col items-center justify-center space-y-2">
                    <FileText className="w-4 h-4 text-matrix" />
                    <span>Download Invoices</span>
                  </button>
                  <button className="bg-charcoal border border-gray-700 p-3 rounded text-xs text-gray-300 hover:border-matrix hover:text-white flex flex-col items-center justify-center space-y-2">
                    <Printer className="w-4 h-4 text-electric" />
                    <span>Re-order Printing</span>
                  </button>
                  <button className="bg-charcoal border border-gray-700 p-3 rounded text-xs text-gray-300 hover:border-matrix hover:text-white flex flex-col items-center justify-center space-y-2 col-span-2 sm:col-span-1">
                    <Shield className="w-4 h-4 text-matrix" />
                    <span>Security Logs</span>
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
