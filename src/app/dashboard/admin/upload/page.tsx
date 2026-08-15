'use client';

import { useState, useEffect } from 'react';
import { Send, Shield, Loader2, Lock, Database, Plus, Trash2, Settings, CheckCircle2, Edit2, Save, X as CloseIcon, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [authError, setAuthError] = useState(false);
  const [adminView, setAdminView] = useState<'dispatch' | 'services' | 'settings'>('dispatch');

  // Email Dispatch State
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Service CMS State
  const [services, setServices] = useState<any[]>([]);
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [dbStatus, setDbStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Service CMS Edit State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Global Settings State
  const [githubUrl, setGithubUrl] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactLocation, setContactLocation] = useState('');
  const [settingsStatus, setSettingsStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isAuthorized) {
      fetchServices();
      fetchSettings();
    }
  }, [isAuthorized]);

  const fetchServices = async () => {
    const { data } = await supabase.from('pricing_services').select('*').order('id', { ascending: true });
    if (data) setServices(data);
  };

  const fetchSettings = async () => {
    const { data } = await supabase.from('site_settings').select('*');
    if (data) {
      data.forEach((setting) => {
        if (setting.setting_key === 'github_url') setGithubUrl(setting.setting_value);
        if (setting.setting_key === 'contact_phone') setContactPhone(setting.setting_value);
        if (setting.setting_key === 'contact_email') setContactEmail(setting.setting_value);
        if (setting.setting_key === 'contact_location') setContactLocation(setting.setting_value);
      });
    }
  };

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
        setEmail(''); setName(''); setMessage('');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setDbStatus('saving');
    const { error } = await supabase.from('pricing_services').insert({
      service_name: serviceName, price: servicePrice, description: serviceDesc
    });
    if (error) {
      setDbStatus('error');
    } else {
      setDbStatus('success');
      setServiceName(''); setServicePrice(''); setServiceDesc('');
      fetchServices();
      setTimeout(() => setDbStatus('idle'), 4000);
    }
  };

  const handleDeleteService = async (id: number) => {
    await supabase.from('pricing_services').delete().eq('id', id);
    fetchServices();
  };

  const startEdit = (service: any) => {
    setEditingId(service.id);
    setEditName(service.service_name);
    setEditPrice(service.price);
    setEditDesc(service.description);
  };

  const handleSaveEdit = async (id: number) => {
    await supabase.from('pricing_services').update({
      service_name: editName,
      price: editPrice,
      description: editDesc
    }).eq('id', id);
    setEditingId(null);
    fetchServices();
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsStatus('saving');
    
    const updates = [
      { setting_key: 'github_url', setting_value: githubUrl },
      { setting_key: 'contact_phone', setting_value: contactPhone },
      { setting_key: 'contact_email', setting_value: contactEmail },
      { setting_key: 'contact_location', setting_value: contactLocation }
    ];

    const { error } = await supabase.from('site_settings').upsert(updates);
    
    if (error) {
      setSettingsStatus('error');
    } else {
      setSettingsStatus('success');
      setTimeout(() => setSettingsStatus('idle'), 4000);
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
            <input type="password" required value={passkey} onChange={(e) => setPasskey(e.target.value)} placeholder="Enter Passkey" className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none text-center tracking-widest" />
            {authError && <p className="text-red-600 text-xs font-bold text-center">Invalid Passkey. Access Denied.</p>}
            <button type="submit" className="w-full bg-blue-900 text-white font-bold py-3 rounded-md hover:bg-blue-800 transition shadow-md">Authenticate</button>
          </form>
          <div className="mt-6 text-center">
             <Link href="/" className="text-sm text-slate-500 hover:text-blue-900 font-semibold transition">&larr; Return to Public Site</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <button onClick={() => setIsAuthorized(false)} className="flex items-center space-x-2 text-slate-500 hover:text-blue-900 transition">
            <Lock className="w-4 h-4" />
            <span className="text-sm font-bold">Lock Console</span>
          </button>
          <div className="flex items-center space-x-2 text-blue-900 bg-blue-100 px-4 py-2 rounded-md border border-blue-200">
            <Shield className="w-5 h-5" />
            <span className="font-bold text-sm">ERP Admin Override Active</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 min-h-[60vh]">
          {/* Admin Navigation */}
          <div className="flex flex-wrap gap-4 border-b border-gray-200 mb-8 pb-2">
            <button onClick={() => setAdminView('dispatch')} className={`font-bold text-sm pb-2 border-b-2 transition-colors flex items-center space-x-2 ${adminView === 'dispatch' ? 'border-blue-900 text-blue-900' : 'border-transparent text-slate-500 hover:text-blue-900'}`}>
              <Send className="w-4 h-4" /><span>Communication Dispatch</span>
            </button>
            <button onClick={() => setAdminView('services')} className={`font-bold text-sm pb-2 border-b-2 transition-colors flex items-center space-x-2 ${adminView === 'services' ? 'border-blue-900 text-blue-900' : 'border-transparent text-slate-500 hover:text-blue-900'}`}>
              <Database className="w-4 h-4" /><span>Service & Pricing CMS</span>
            </button>
            <button onClick={() => setAdminView('settings')} className={`font-bold text-sm pb-2 border-b-2 transition-colors flex items-center space-x-2 ${adminView === 'settings' ? 'border-blue-900 text-blue-900' : 'border-transparent text-slate-500 hover:text-blue-900'}`}>
              <Settings className="w-4 h-4" /><span>Global Config</span>
            </button>
            
            {/* NEW: Admin Dispatch Link */}
            <Link href="/dashboard/admin/upload" className="font-bold text-sm pb-2 border-b-2 border-transparent text-slate-500 hover:text-blue-900 transition-colors flex items-center space-x-2">
              <UploadCloud className="w-4 h-4" /><span>Asset Vault Dispatch</span>
            </Link>
          </div>

          {adminView === 'dispatch' && (
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
                <textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none"></textarea>
              </div>
              {status === 'success' && <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-md text-sm font-bold">Email successfully transmitted.</div>}
              {status === 'error' && <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-md text-sm font-bold">Failed to dispatch email.</div>}
              <button type="submit" disabled={status === 'sending'} className="bg-blue-900 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-800 transition shadow-md flex items-center space-x-2">
                {status === 'sending' ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /><span>Dispatch Notification</span></>}
              </button>
            </form>
          )}

          {adminView === 'services' && (
            <div className="animate-in fade-in duration-300 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Manage Core Services</h2>
                  <p className="text-sm text-slate-500 mt-1">Push new services and pricing tiers directly to the database.</p>
                </div>
                <form onSubmit={handleAddService} className="space-y-5 bg-slate-50 p-6 border border-gray-200 rounded-xl">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Service / Tier Name</label>
                    <input type="text" required value={serviceName} onChange={(e) => setServiceName(e.target.value)} placeholder="e.g. Enterprise Operations" className="w-full bg-white border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Base Price</label>
                    <input type="text" required value={servicePrice} onChange={(e) => setServicePrice(e.target.value)} placeholder="e.g. KES 65,000" className="w-full bg-white border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Service Description</label>
                    <textarea required value={serviceDesc} onChange={(e) => setServiceDesc(e.target.value)} rows={3} className="w-full bg-white border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none"></textarea>
                  </div>
                  {dbStatus === 'success' && <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-md text-sm font-bold">Service saved to database.</div>}
                  <button type="submit" disabled={dbStatus === 'saving'} className="w-full bg-blue-900 text-white font-bold py-3 rounded-md hover:bg-blue-800 transition shadow-md flex justify-center items-center space-x-2">
                    {dbStatus === 'saving' ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plus className="w-4 h-4" /><span>Add Service</span></>}
                  </button>
                </form>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">Active Services in Production</h3>
                <div className="space-y-4">
                  {services.length === 0 ? (
                    <p className="text-sm text-slate-500 italic">No custom services found. Add one to overwrite default pricing.</p>
                  ) : (
                    services.map((service) => (
                      <div key={service.id} className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                        {editingId === service.id ? (
                          <div className="space-y-3">
                            <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} className="w-full bg-slate-50 border border-gray-300 rounded-md p-2 text-sm text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
                            <input type="text" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} className="w-full bg-slate-50 border border-gray-300 rounded-md p-2 text-sm text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
                            <div className="flex space-x-2 mt-2">
                              <button onClick={() => handleSaveEdit(service.id)} className="flex-1 bg-green-600 text-white text-xs font-bold py-2 rounded-md hover:bg-green-700 transition flex items-center justify-center space-x-1"><Save className="w-3 h-3" /><span>Save</span></button>
                              <button onClick={() => setEditingId(null)} className="flex-1 bg-gray-200 text-slate-700 text-xs font-bold py-2 rounded-md hover:bg-gray-300 transition flex items-center justify-center space-x-1"><CloseIcon className="w-3 h-3" /><span>Cancel</span></button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-blue-900 text-sm">{service.service_name}</h4>
                              <p className="text-xs text-slate-500 mt-1">{service.price}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button onClick={() => startEdit(service)} className="text-slate-400 hover:text-blue-600 transition p-1">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDeleteService(service.id)} className="text-slate-400 hover:text-red-600 transition p-1">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {adminView === 'settings' && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Global Settings Configuration</h2>
                <p className="text-sm text-slate-500 mt-1">Change your contact placement data and GitHub repository links across the entire public UI.</p>
              </div>
              
              <form onSubmit={handleUpdateSettings} className="space-y-6 max-w-2xl bg-slate-50 p-6 border border-gray-200 rounded-xl">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">GitHub Landing Page URL</label>
                  <input type="url" required value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="w-full bg-white border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Contact Phone Number</label>
                    <input type="text" required value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="w-full bg-white border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Contact Email Address</label>
                    <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full bg-white border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Headquarters Location</label>
                  <input type="text" required value={contactLocation} onChange={(e) => setContactLocation(e.target.value)} className="w-full bg-white border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
                </div>
                
                {settingsStatus === 'success' && <div className="flex items-center space-x-2 bg-green-50 text-green-700 border border-green-200 p-4 rounded-md text-sm font-bold"><CheckCircle2 className="w-5 h-5" /><span>Global configurations updated successfully.</span></div>}
                
                <button type="submit" disabled={settingsStatus === 'saving'} className="bg-blue-900 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-800 transition shadow-md flex items-center space-x-2">
                  {settingsStatus === 'saving' ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Settings className="w-4 h-4" /><span>Update Global Layout</span></>}
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}