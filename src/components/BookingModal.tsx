'use client';

import { useState } from 'react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function BookingModal({ isOpen, onClose, preselectedService }: BookingModalProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [service, setService] = useState(preselectedService || 'Custom Web & Software Development');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 AM');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `New Enterprise Booking: ${formData.get('service')}`,
          service_requested: formData.get('service'),
          preferred_date: formData.get('date'),
          time_slot: formData.get('time'),
          client_name: formData.get('fullName'),
          contact_number: formData.get('phone'),
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white border border-gray-200 w-full max-w-xl rounded-xl shadow-2xl overflow-hidden relative">
        
        <div className="bg-blue-900 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-yellow-500" />
            <span className="text-white font-bold text-lg">Schedule Consultation</span>
          </div>
          <button onClick={() => { setStatus('idle'); onClose(); }} className="text-blue-200 hover:text-white transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {status !== 'success' ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-2 text-sm">
                <label className="font-semibold text-slate-700">Target Service</label>
                <select name="service" value={service} onChange={(e) => setService(e.target.value)} className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none">
                  <option value="SME Starter Package">SME Starter Package (KES 25,000)</option>
                  <option value="Automation & Cloud Makeover">Enterprise Operations (KES 65,000)</option>
                  <option value="Web3 Protocol & Audit">Web3 Protocol & Audit (Custom Quote)</option>
                  <option value="Custom Web & Software Development">Custom Web & Software Development</option>
                  <option value="Business Workflow Automation">Business Workflow Automation</option>
                  <option value="Cloud Architecture & AWS Setup">Cloud Architecture & AWS Setup</option>
                  <option value="Enterprise Printing & Branding">Enterprise Printing & Hardware Branding</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <label className="font-semibold text-slate-700">Preferred Date</label>
                  <input type="date" name="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-slate-700">Time Slot (EAT)</label>
                  <select name="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none">
                    <option value="09:00 AM EAT">09:00 AM EAT</option>
                    <option value="11:00 AM EAT">11:00 AM EAT</option>
                    <option value="02:00 PM EAT">02:00 PM EAT</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <label className="font-semibold text-slate-700">Full Name / Business Title</label>
                <input type="text" name="fullName" required placeholder="John Doe - Director" className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
              </div>

              <div className="space-y-2 text-sm">
                <label className="font-semibold text-slate-700">Phone Number</label>
                <input type="tel" name="phone" required placeholder="+254 7XX XXX XXX" className="w-full bg-slate-50 border border-gray-300 rounded-md p-3 text-slate-900 focus:border-blue-900 focus:ring-1 focus:outline-none" />
              </div>

              {status === 'error' && <div className="text-red-600 bg-red-50 p-3 rounded-md text-sm border border-red-200">Error submitting request. Please try again.</div>}

              <button type="submit" disabled={status === 'submitting'} className="w-full bg-blue-900 text-white font-bold py-3 rounded-md hover:bg-blue-800 transition disabled:opacity-50 mt-4 shadow-md">
                {status === 'submitting' ? 'Transmitting...' : 'Confirm Booking'}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed</h3>
              <p className="text-slate-600 mb-6">We have received your request. Our team will contact you shortly.</p>
              <button onClick={() => { setStatus('idle'); onClose(); }} className="bg-slate-100 border border-gray-300 px-8 py-2 text-slate-700 font-semibold rounded-md hover:bg-gray-200 transition">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
