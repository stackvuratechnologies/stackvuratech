'use client';

import { useState } from 'react';
import { X, Lock, Clock, UserPlus, LifeBuoy, Send, Loader2, Building2, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClientPortalModal({ isOpen, onClose }: ClientPortalModalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState<'login' | 'register'>('login');
  const [dashView, setDashView] = useState<'overview' | 'support'>('overview');
  
  // Auth State
  const [clientType, setClientType] = useState<'individual' | 'firm'>('firm');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Support Ticket State
  const [ticketType, setTicketType] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [supportStatus, setSupportStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setAuthError(error.message);
    } else {
      setIsLoggedIn(true);
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
          company: company, // Storing company as well for future use
          client_type: clientType
        }
      }
    });

    if (error) {
      setAuthError(error.message);
    } else {
      // Show success message or ask user to check their email
      setAuthError('Registration successful! Please check your email to confirm your account.');
    }
    
    setLoading(false);
  };
    
  const handleSupportSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSupportStatus('submitting');
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    // 1. Save the ticket to the Supabase database
    const { error: dbError } = await supabase.from('support_tickets').insert({
      client_id: user.id,
      ticket_type: ticketType,
      subject: ticketSubject,
      message: ticketMessage
    });
    
    if (dbError) {
      setSupportStatus('error');
      return;
    } 

    // 2. Trigger the Resend email to the operations inbox
    // 2. Trigger the Resend email to the operations inbox
try {
  const response = await fetch('/api/notify-support', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: user.email,
      ticketType,
      ticketSubject,
      ticketMessage
    }),
  });
  
  // Explicitly check for HTTP errors from the backend
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Server rejected the request');
  }
  
  setSupportStatus('submitted');
  setTicketType('');
  setTicketSubject('');
  setTicketMessage('');
  setTimeout(() => setSupportStatus('idle'), 4000);
} catch (emailError) {
  console.error("Email API Failed:", emailError);
  // Optional: You can change the status here to notify the user, 
  // or keep it 'submitted' since the DB still captured it.
  setSupportStatus('error'); 
  setTimeout(() => setSupportStatus('idle'), 4000);
}

  const handleClose = () => {
    setIsLoggedIn(false);
    setView('login');
    setDashView('overview');
    setEmail('');
    setPassword('');
    setFullName('');
    setCompany('');
    setAuthError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white border border-gray-200 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
        
        <div className="bg-blue-900 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center space-x-2 text-white">
            <Lock className="w-5 h-5 text-yellow-500" />
            <span className="font-bold text-lg">Client Access Dashboard</span>
          </div>
          <button onClick={handleClose} className="text-blue-200 hover:text-white transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {!isLoggedIn ? (
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">{view === 'login' ? 'Welcome Back' : 'Register Account'}</h3>
                <p className="text-slate-600 text-sm mt-2">
                  {view === 'login' ? 'Log in to follow up on your project status, invoices, and deliverables.' : 'Create an account to track your project progress and request new services.'}
                </p>
              </div>

              <form onSubmit={view === 'login' ? handleLogin : handleRegister} className="space-y-4">
                {view === 'register' && (
                  <>
                    <div className="flex bg-slate-100 p-1 rounded-lg mb-4">
                      <button 
                        type="button"
                        onClick={() => setClientType('individual')}
                        className={`flex-1 flex items-center justify-center space-x-2 py-2 text-sm font-semibold rounded-md transition ${clientType === 'individual' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        <User className="w-4 h-4" />
                        <span>Individual</span>
                      </button>
                      <button 
                        type="button"
                        onClick={() => setClientType('firm')}
                        className={`flex-1 flex items-center justify-center space-x-2 py-2 text-sm font-semibold rounded-md transition ${clientType === 'firm' ? 'bg-white text-blue-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        <Building2 className="w-4 h-4" />
                        <span>Company</span>
                      </button>
                    </div>

                    <div className="space-y-2 text-sm">
                      <label className="font-semibold text-slate-700">Full Name</label>
                      <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
                    </div>
                    
                    {clientType === 'firm' && (
                      <div className="space-y-2 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="font-semibold text-slate-700">Company / Firm Name</label>
                        <input type="text" required value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
                      </div>
                    )}
                  </>
                )}
                
                <div className="space-y-2 text-sm">
                  <label className="font-semibold text-slate-700">Email Address</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
                </div>
                
                <div className="space-y-2 text-sm">
                  <label className="font-semibold text-slate-700">Password / Access Passkey</label>
                  <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
                </div>
                
                {authError && <div className={`p-3 rounded-md text-sm font-semibold ${authError.includes('successful') ? 'text-green-700 bg-green-50 border border-green-200' : 'text-red-600 bg-red-50 border border-red-200'}`}>{authError}</div>}

                <button type="submit" disabled={loading} className="w-full bg-blue-900 text-white font-bold py-3 rounded-md hover:bg-blue-800 transition shadow-md flex justify-center items-center">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (view === 'login' ? 'Secure Login' : 'Register Account')}
                </button>
              </form>

              <div className="mt-6 text-center border-t border-gray-200 pt-4">
                <button 
                  onClick={() => { setView(view === 'login' ? 'register' : 'login'); setAuthError(''); }} 
                  className="text-sm text-blue-900 font-bold hover:underline flex items-center justify-center w-full space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>{view === 'login' ? 'Need an account? Register here.' : 'Already have an account? Log in.'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <div className="flex space-x-6">
                  <button onClick={() => setDashView('overview')} className={`font-bold text-sm pb-4 -mb-4 border-b-2 transition-colors ${dashView === 'overview' ? 'border-blue-900 text-blue-900' : 'border-transparent text-slate-500 hover:text-blue-900'}`}>
                    Project Overview
                  </button>
                  <button onClick={() => setDashView('support')} className={`font-bold text-sm pb-4 -mb-4 border-b-2 transition-colors flex items-center space-x-1 ${dashView === 'support' ? 'border-blue-900 text-blue-900' : 'border-transparent text-slate-500 hover:text-blue-900'}`}>
                    <LifeBuoy className="w-4 h-4" />
                    <span>Support & Complaints</span>
                  </button>
                </div>
                <button onClick={async () => { await supabase.auth.signOut(); setIsLoggedIn(false); }} className="text-sm font-semibold text-red-600 hover:underline">
                  Sign Out
                </button>
              </div>

              {dashView === 'overview' ? (
                <>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Welcome, {company || fullName || email.split('@')[0]}</h3>
                    <p className="text-sm text-green-600 font-medium mt-1">Status: Active Client Dashboard</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-slate-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="flex items-center space-x-2 text-blue-900 mb-3">
                        <Clock className="w-5 h-5" />
                        <span className="text-sm font-bold uppercase tracking-wide">Active Build</span>
                      </div>
                      <h4 className="text-slate-900 font-bold text-lg">Requirements Analysis</h4>
                      <p className="text-sm text-slate-600 mt-2">Progress: Initializing (Awaiting Specs)</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Open a Support Ticket</h3>
                    <p className="text-sm text-slate-600 mt-1">File a complaint, report a bug, or request a project update. This goes directly to our engineering database.</p>
                  </div>
                  
                  <form onSubmit={handleSupportSubmit} className="space-y-4 bg-slate-50 p-6 rounded-xl border border-gray-200">
                    <div className="space-y-2 text-sm">
                      <label className="font-semibold text-slate-700">Ticket Type</label>
                      <select required value={ticketType} onChange={(e) => setTicketType(e.target.value)} className="w-full bg-white border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none">
                        <option value="">Select Category</option>
                        <option value="bug">Software Bug / Error</option>
                        <option value="complaint">Service Complaint</option>
                        <option value="update">Request Project Update</option>
                        <option value="billing">Billing / Invoice Issue</option>
                      </select>
                    </div>
                    <div className="space-y-2 text-sm">
                      <label className="font-semibold text-slate-700">Subject</label>
                      <input type="text" required value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} placeholder="Brief description of the issue" className="w-full bg-white border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <label className="font-semibold text-slate-700">Detailed Message</label>
                      <textarea required value={ticketMessage} onChange={(e) => setTicketMessage(e.target.value)} rows={4} placeholder="Please provide as much detail as possible..." className="w-full bg-white border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none"></textarea>
                    </div>
                    
                    {supportStatus === 'submitted' && <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md text-sm font-bold text-center">Ticket Successfully Logged in Database.</div>}
                    {supportStatus === 'error' && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md text-sm font-bold text-center">Failed to log ticket. Please try again.</div>}
                    
                    {supportStatus !== 'submitted' && (
                      <button type="submit" disabled={supportStatus === 'submitting'} className="w-full bg-blue-900 text-white font-bold py-3 rounded-md hover:bg-blue-800 transition shadow-md flex items-center justify-center space-x-2">
                        {supportStatus === 'submitting' ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /><span>Submit Ticket to Engineering</span></>}
                      </button>
                    )}
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}