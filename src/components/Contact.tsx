'use client';

import { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const sendDiscordAlert = async (errorMsg: string, formDataObj: any) => {
    const webhook = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;
    if (!webhook) return;
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🚨 **StackVura Alert** 🚨\n**Issue:** ${errorMsg}\n**Payload:**\n\`\`\`json\n${JSON.stringify(formDataObj, null, 2)}\n\`\`\``
        })
      });
    } catch (e) {
      console.error("Discord telemetry failed.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const dataObj = {
      company_name: formData.get('companyName'),
      contact_name: formData.get('contactName'),
      email: formData.get('email'),
      service_requested: formData.get('service'),
      project_details: formData.get('details')
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          ...dataObj
        }),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        const errorData = await response.json();
        setStatus('error');
        await sendDiscordAlert(`Web3Forms Error: ${errorData.message}`, dataObj);
      }
    } catch (error: any) {
      setStatus('error');
      await sendDiscordAlert(`Network Exception: ${error.message}`, dataObj);
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
            <p className="text-blue-900 font-bold text-lg">+254 726 396 632</p>
          </div>
          <div className="bg-blue-900 border border-blue-800 p-6 rounded-xl text-center shadow-md">
            <p className="text-blue-200 text-sm font-semibold mb-2 uppercase tracking-wide">Enterprise Email</p>
            <p className="text-white font-bold text-base md:text-lg">admin@stackvuratechnologies.online</p>
          </div>
          <div className="bg-slate-50 border border-gray-200 p-6 rounded-xl text-center shadow-sm">
            <p className="text-slate-500 text-sm font-semibold mb-2 uppercase tracking-wide">Headquarters</p>
            <p className="text-blue-900 font-bold text-lg">Machakos, Kenya</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 rounded-xl shadow-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Company Name</label>
              <input required name="companyName" type="text" className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 focus:outline-none transition" />
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
