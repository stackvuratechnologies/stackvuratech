'use client';

import { useState } from 'react';
import { Send, TerminalSquare } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Discord Telemetry Function
  const sendDiscordAlert = async (errorMsg: string, formDataObj: any) => {
    const webhook = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;
    if (!webhook) return;
    
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🚨 **StackVura Telemetry Alert** 🚨\n**Issue:** ${errorMsg}\n**Attempted Payload:**\n\`\`\`json\n${JSON.stringify(formDataObj, null, 2)}\n\`\`\``
        })
      });
    } catch (e) {
      console.error("Discord telemetry failed to transmit.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Package data for both Web3Forms and potential Discord logging
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
        // Ping Discord with the exact reason Web3Forms rejected it
        await sendDiscordAlert(`Web3Forms API Rejected Request: ${errorData.message || '400 Bad Request'}`, dataObj);
      }
    } catch (error: any) {
      setStatus('error');
      // Ping Discord if the client's network drops or fetch completely fails
      await sendDiscordAlert(`Network/Client Exception: ${error.message || 'Unknown Error'}`, dataObj);
    }
  };

  return (
    <section id="contact" className="w-full py-24 px-4 bg-charcoal">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold font-mono text-white mb-2 flex items-center">
            <TerminalSquare className="w-6 h-6 mr-3 text-matrix" />
            <span className="text-matrix">./</span>initiate-handshake
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            [Requesting: Technical Discovery Call]
          </p>
        </div>

        {/* Agency Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-center font-mono text-xs">
          <div className="bg-charcoal-dark border border-gray-800 p-4 rounded-lg hover:border-matrix transition-colors">
            <p className="text-gray-500 mb-1">Direct Line / WhatsApp</p>
            <p className="text-matrix font-bold">+254 726 396 632</p>
          </div>
          <div className="bg-charcoal-dark border border-gray-800 p-4 rounded-lg hover:border-electric transition-colors">
            <p className="text-gray-500 mb-1">Enterprise Email</p>
            <p className="text-electric font-bold">admin@stackvuratechnologies.online</p>
          </div>
          <div className="bg-charcoal-dark border border-gray-800 p-4 rounded-lg hover:border-gray-500 transition-colors">
            <p className="text-gray-500 mb-1">Headquarters</p>
            <p className="text-white font-bold">Machakos, Kenya</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-charcoal-dark border border-gray-800 p-8 rounded-lg shadow-2xl space-y-6 font-mono text-sm">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-gray-400">Company / Protocol Name</label>
              <input required name="companyName" type="text" className="w-full bg-charcoal border border-gray-700 rounded p-3 text-white focus:border-matrix focus:outline-none transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-gray-400">Contact Name</label>
              <input required name="contactName" type="text" className="w-full bg-charcoal border border-gray-700 rounded p-3 text-white focus:border-matrix focus:outline-none transition-colors" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-400">Email Address</label>
            <input required name="email" type="email" className="w-full bg-charcoal border border-gray-700 rounded p-3 text-white focus:border-matrix focus:outline-none transition-colors" />
          </div>

          <div className="space-y-2">
            <label className="text-gray-400">Service Required</label>
            <select required name="service" className="w-full bg-charcoal border border-gray-700 rounded p-3 text-white focus:border-matrix focus:outline-none transition-colors appearance-none">
              <option value="">-- Select Solution --</option>
              <option value="Custom Web & Software Development">Custom Web & Software Development</option>
              <option value="Business Workflow Automation">Business Workflow Automation</option>
              <option value="Cloud Architecture & AWS Setup">Cloud Architecture & AWS Setup</option>
              <option value="Cybersecurity & Auditing">Cybersecurity & SecOps Auditing</option>
              <option value="Enterprise Printing & Branding">Enterprise Printing & Hardware Branding</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-gray-400">Project Specifications</label>
            <textarea required name="details" rows={4} className="w-full bg-charcoal border border-gray-700 rounded p-3 text-white focus:border-matrix focus:outline-none transition-colors"></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center space-x-2 bg-matrix text-charcoal-dark p-4 rounded font-bold hover:bg-matrix-dim transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{status === 'submitting' ? 'Executing...' : 'Transmit Request'}</span>
          </button>

          {status === 'success' && (
            <div className="text-matrix mt-4 p-3 border border-matrix rounded bg-matrix/10">
              [+] Transmission successful. Architecture team notified.
            </div>
          )}
          {status === 'error' && (
            <div className="text-red-500 mt-4 p-3 border border-red-500 rounded bg-red-500/10">
              [-] Error: Connection failed. Engineering team has been notified.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
