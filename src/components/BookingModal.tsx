'use client';

import { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Send } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function BookingModal({ isOpen, onClose, preselectedService }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState(preselectedService || 'Custom Web & Software');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00 AM');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-mono">
      <div className="bg-charcoal-dark border border-gray-700 w-full max-w-xl rounded-lg shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-gray-900 px-6 py-4 border-b border-gray-800 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-electric" />
            <span className="text-white font-bold text-sm">Schedule Technical Consultation</span>
          </div>
          <button onClick={() => { setSubmitted(false); onClose(); }} className="text-gray-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-gray-400">
                Book a 1-on-1 technical discovery session with our lead architects or order custom enterprise printing collateral.
              </p>

              <div className="space-y-2 text-sm">
                <label className="text-gray-300">Target Service</label>
                <select 
                  value={service} 
                  onChange={(e) => setService(e.target.value)} 
                  className="w-full bg-charcoal border border-gray-700 rounded p-3 text-white focus:border-electric focus:outline-none"
                >
                  <option value="Custom Web & Software">Custom Web & Software Development</option>
                  <option value="Workflow Automation">Business Workflow Automation</option>
                  <option value="Cloud Architecture">Cloud Architecture & AWS Server Setup</option>
                  <option value="Cybersecurity & Auditing">Cybersecurity & Smart Contract Audit</option>
                  <option value="Enterprise Printing & Branding">Enterprise Printing & Branding Services</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <label className="text-gray-300">Preferred Date</label>
                  <input 
                    type="date" 
                    required 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-charcoal border border-gray-700 rounded p-3 text-white focus:border-electric focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-300">Time Slot (EAT)</label>
                  <select 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-charcoal border border-gray-700 rounded p-3 text-white focus:border-electric focus:outline-none"
                  >
                    <option value="09:00 AM">09:00 AM EAT</option>
                    <option value="11:00 AM">11:00 AM EAT</option>
                    <option value="02:00 PM">02:00 PM EAT</option>
                    <option value="04:00 PM">04:00 PM EAT</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <label className="text-gray-300">Your Full Name / Business Title</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. John Doe - Tech Director" 
                  className="w-full bg-charcoal border border-gray-700 rounded p-3 text-white focus:border-electric focus:outline-none"
                />
              </div>

              <div className="space-y-2 text-sm">
                <label className="text-gray-300">WhatsApp / Phone Number</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="+254 7XX XXX XXX" 
                  className="w-full bg-charcoal border border-gray-700 rounded p-3 text-white focus:border-electric focus:outline-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-electric text-charcoal-dark font-bold py-3 rounded hover:bg-electric-deep transition mt-4 flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Confirm Booking Request</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-matrix mx-auto" />
              <h3 className="text-xl font-bold text-white">Booking Reserved!</h3>
              <p className="text-xs text-gray-400 max-w-md mx-auto">
                We have logged your slot for <span className="text-matrix font-bold">{date || 'Upcoming Date'}</span> at <span className="text-matrix font-bold">{time}</span> for <span className="text-white font-bold">{service}</span>. Our architecture team will contact you via WhatsApp/Email to confirm details.
              </p>
              <button 
                onClick={() => { setSubmitted(false); onClose(); }} 
                className="bg-charcoal border border-gray-700 px-6 py-2 text-xs text-white rounded hover:border-matrix"
              >
                Close Window
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
