'use client';

import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // Dynamic Global Settings
  const [phone, setPhone] = useState('+254 726 396 632');
  const [email, setEmail] = useState('admin@stackvuratechnologies.online');
  const [location, setLocation] = useState('Machakos, Kenya');

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('*');
      if (data) {
        data.forEach((setting) => {
          if (setting.setting_key === 'contact_phone') setPhone(setting.setting_value);
          if (setting.setting_key === 'contact_email') setEmail(setting.setting_value);
          if (setting.setting_key === 'contact_location') setLocation(setting.setting_value);
        });
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact', // Tells the backend which format to use
          companyName: formData.get('companyName'),
          contactName: formData.get('contactName'),
          email: formData.get('email'),
          service: formData.get('service'),
          details: formData.get('details')
        }),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error: any) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="w-full py-24 px-4 bg-white border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Contact Architecture Team
          </h2>
          <p className="text-slate-600">Submit your project details for a technical review.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-50 border border-gray-200 p-6 rounded-xl text-center shadow-sm">
            <p className="text-slate-500 text-sm font-semibold mb-2 uppercase tracking-wide">Direct Line</p>
            <p className="text-blue-900 font-bold text-lg">{phone}</p>
          </div>
          <div className="bg-blue-900 border border-blue-800 p-6 rounded-xl text-center shadow-md">
            <p className="text-blue-200 text-sm font-semibold mb-2 uppercase tracking-wide">Enterprise Email</p>
            <p className="text-white font-bold text-base md:text-lg overflow-hidden text-ellipsis">{email}</p>
          </div>
          <div className="bg-slate-50 border border-gray-200 p-6 rounded-xl text-center shadow-sm">
            <p className="text-slate-500 text-sm font-semibold mb-2 uppercase tracking-wide">Headquarters</p>
            <p className="text-blue-900 font-bold text-lg">{location}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Company Name</label>
              <input name="companyName" type="text" className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 focus:outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Contact Name</label>
              <input required name="contactName" type="text" className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 focus:outline-none transition" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <input required name="email" type="email" className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 focus:outline-none transition" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Service Required</label>
            <select required name="service" className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 focus:outline-none transition">
              <option value="">-- Select Solution --</option>
              <option value="Custom Web & Software Development">Custom Web & Software Development</option>
              <option value="Business Workflow Automation">Business Workflow Automation</option>
              <option value="Cloud Architecture & AWS Setup">Cloud Architecture & AWS Setup</option>
              <option value="Cybersecurity & Auditing">Cybersecurity & SecOps Auditing</option>
              <option value="Enterprise Printing & Branding">Enterprise Printing & Hardware Branding</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Project Specifications</label>
            <textarea required name="details" rows={4} className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 focus:outline-none transition"></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center space-x-2 bg-blue-900 text-white p-4 rounded-md font-bold hover:bg-blue-800 transition-colors disabled:opacity-50 shadow-md"
          >
            <Send className="w-5 h-5" />
            <span>{status === 'submitting' ? 'Sending Request...' : 'Submit Request'}</span>
          </button>

          {status === 'success' && (
            <div className="text-green-700 mt-4 p-4 border border-green-200 rounded-md bg-green-50 text-sm font-medium">
              Success: Request transmitted to the architecture team.
            </div>
          )}
          {status === 'error' && (
            <div className="text-red-700 mt-4 p-4 border border-red-200 rounded-md bg-red-50 text-sm font-medium">
              Error: Transmission failed. Our engineers have been notified.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}