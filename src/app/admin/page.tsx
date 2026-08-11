'use client';

import { useState } from 'react';
import { Send, Shield, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, message }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setName('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center space-x-2 text-slate-500 hover:text-blue-900 transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-bold">Return to Main Site</span>
          </Link>
          <div className="flex items-center space-x-2 text-blue-900 bg-blue-100 px-4 py-2 rounded-md">
            <Shield className="w-5 h-5" />
            <span className="font-bold">ERP Admin Override</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Client Communication Dispatch</h2>
            <p className="text-sm text-slate-500 mt-1">Send branded, automated updates to clients when their software or printing jobs are complete.</p>
          </div>

          <form onSubmit={handleSendEmail} className="space-y-5 max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Client Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Client Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Project Update Message</label>
              <textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="e.g. Your NFC Smart Cards have been printed and dispatched. The Web3 ERP integration is now live on the staging network." className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none"></textarea>
            </div>

            {status === 'success' && <div className="flex items-center space-x-2 bg-green-50 text-green-700 border border-green-200 p-4 rounded-md text-sm font-bold"><CheckCircle2 className="w-5 h-5" /><span>Email successfully transmitted via Resend.</span></div>}
            {status === 'error' && <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-md text-sm font-bold">Failed to dispatch email. Check API credentials.</div>}

            <button type="submit" disabled={status === 'sending'} className="bg-blue-900 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-800 transition shadow-md flex items-center space-x-2">
              {status === 'sending' ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /><span>Dispatch Client Notification</span></>}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
