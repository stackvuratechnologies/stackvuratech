'use client';

import { useState } from 'react';
import { Send, Shield, Loader2, Lock, Database, Plus, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [authError, setAuthError] = useState(false);
  const [adminView, setAdminView] = useState<'dispatch' | 'services'>('dispatch');

  // Email Dispatch State
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Service CMS State
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [dbStatus, setDbStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      setIsAuthorized(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setPasskey('');
    }
  };

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

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setDbStatus('saving');
    
    const { error } = await supabase.from('pricing_services').insert({
      service_name: serviceName,
      price: servicePrice,
      description: serviceDesc
    });

    if (error) {
      console.error(error);
      setDbStatus('error');
    } else {
      setDbStatus('success');
      setServiceName('');
      setServicePrice('');
      setServiceDesc('');
      setTimeout(() => setDbStatus('idle'), 4000);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-900" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Restricted Access</h2>
            <p className="text-sm text-slate-500 mt-2">Enter the Master Passkey to access the StackVura ERP Override Panel.</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <input 
              type="password" 
              required 
              value={passkey} 
              onChange={(e) => setPasskey(e.target.value)} 
              placeholder="Enter Passkey" 
              className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none text-center tracking-widest" 
            />
            {authError && <p className="text-red-600 text-xs font-bold text-center">Invalid Passkey. Access Denied.</p>}
            <button type="submit" className="w-full bg-blue-900 text-white font-bold py-3 rounded-md hover:bg-blue-800 transition shadow-md">
              Authenticate
            </button>
          </form>
          
          <div className="mt-6 text-center">
             <Link href="/" className="text-sm text-slate-500 hover:text-blue-900 font-semibold transition">
               &larr; Return to Public Site
             </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setIsAuthorized(false)} className="flex items-center space-x-2 text-slate-500 hover:text-blue-900 transition">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-bold">Lock Console</span>
          </button>
          <div className="flex items-center space-x-2 text-blue-900 bg-blue-100 px-4 py-2 rounded-md border border-blue-200">
            <Shield className="w-5 h-5" />
            <span className="font-bold">ERP Admin Override Active</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8">
          
          {/* Admin Navigation */}
          <div className="flex space-x-6 border-b border-gray-200 mb-8">
            <button 
              onClick={() => setAdminView('dispatch')}
              className={`font-bold text-sm pb-4 -mb-[1px] border-b-2 transition-colors flex items-center space-x-2 ${adminView === 'dispatch' ? 'border-blue-900 text-blue-900' : 'border-transparent text-slate-500 hover:text-blue-900'}`}
            >
              <Send className="w-4 h-4" />
              <span>Communication Dispatch</span>
            </button>
            <button 
              onClick={() => setAdminView('services')}
              className={`font-bold text-sm pb-4 -mb-[1px] border-b-2 transition-colors flex items-center space-x-2 ${adminView === 'services' ? 'border-blue-900 text-blue-900' : 'border-transparent text-slate-500 hover:text-blue-900'}`}
            >
              <Database className="w-4 h-4" />
              <span>Service & Pricing CMS</span>
            </button>
          </div>

          {adminView === 'dispatch' ? (
            <form onSubmit={handleSendEmail} className="space-y-5 max-w-2xl animate-in fade-in duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Client Communication Dispatch</h2>
                <p className="text-sm text-slate-500 mt-1">Send branded, automated updates to clients when their software or printing jobs are complete.</p>
              </div>
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
                <textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="e.g. Your NFC Smart Cards have been printed and dispatched." className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none"></textarea>
              </div>
              {status === 'success' && <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-md text-sm font-bold">Email successfully transmitted.</div>}
              {status === 'error' && <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-md text-sm font-bold">Failed to dispatch email. Check API credentials.</div>}
              <button type="submit" disabled={status === 'sending'} className="bg-blue-900 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-800 transition shadow-md flex items-center space-x-2">
                {status === 'sending' ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /><span>Dispatch Notification</span></>}
              </button>
            </form>
          ) : (
            <div className="animate-in fade-in duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Manage Core Services</h2>
                <p className="text-sm text-slate-500 mt-1">Push new services and pricing tiers directly to the database.</p>
              </div>
              
              <form onSubmit={handleAddService} className="space-y-5 max-w-2xl bg-slate-50 p-6 border border-gray-200 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Service / Tier Name</label>
                    <input type="text" required value={serviceName} onChange={(e) => setServiceName(e.target.value)} placeholder="e.g. Enterprise Operations" className="w-full bg-white border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Base Price</label>
                    <input type="text" required value={servicePrice} onChange={(e) => setServicePrice(e.target.value)} placeholder="e.g. KES 65,000" className="w-full bg-white border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Service Description</label>
                  <textarea required value={serviceDesc} onChange={(e) => setServiceDesc(e.target.value)} rows={3} placeholder="Briefly describe the value proposition..." className="w-full bg-white border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none"></textarea>
                </div>
                
                {dbStatus === 'success' && <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-md text-sm font-bold">Service successfully added to database.</div>}
                {dbStatus === 'error' && <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-md text-sm font-bold">Failed to save service to database.</div>}
                
                <button type="submit" disabled={dbStatus === 'saving'} className="bg-blue-900 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-800 transition shadow-md flex items-center space-x-2">
                  {dbStatus === 'saving' ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plus className="w-4 h-4" /><span>Deploy Service to Database</span></>}
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
