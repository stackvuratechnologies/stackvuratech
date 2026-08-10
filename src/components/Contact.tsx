'use client';

import { useState } from 'react';
import { Send, TerminalSquare } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // NOTE: Replace this URL with your actual n8n Production Webhook URL in Step 3
      const response = await fetch('YOUR_N8N_WEBHOOK_URL_HERE', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: formData.get('companyName'),
          contact_name: formData.get('contactName'),
          email: formData.get('email'),
          service_requested: formData.get('service'),
          project_details: formData.get('details')
        }),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
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
              <option value="Custom Web & Software">Custom Web & Software Development</option>
              <option value="Workflow Automation">Business Workflow Automation</option>
              <option value="Cloud Architecture">Cloud Architecture & Server Management</option>
              <option value="Cybersecurity">Cybersecurity & Auditing</option>
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
              [-] Error: Connection failed. Please try again.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
