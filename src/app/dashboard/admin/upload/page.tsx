'use client';
import { useState } from 'react';

export default function AdminVaultUpload() {
  const [adminSecret, setAdminSecret] = useState('');
  const [clientId, setClientId] = useState('');
  const [category, setCategory] = useState('blueprints');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminSecret || !clientId || !file) {
      setStatus('Please provide the Admin Secret, a Client ID, and select a file.');
      return;
    }

    setIsUploading(true);
    setStatus('Encrypting & Uploading...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('clientId', clientId);
    formData.append('category', category);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminSecret}` // Injects your password into the secure header
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed due to a server error.');
      }

      setStatus('Asset successfully secured in client vault.');
      setFile(null); 
      setAdminSecret(''); // Clear the secret for security
      
    } catch (err: any) {
      setStatus(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Admin: Dispatch Deliverables</h1>
      <p className="text-slate-500 mb-8">Securely push assets directly into client enterprise vaults.</p>

      <form onSubmit={handleUpload} className="space-y-6 bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
        
        {/* Admin Secret Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Admin Upload Secret</label>
          <input 
            type="password" 
            placeholder="Enter the master upload password"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#0F172A] outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Target Client (User ID)</label>
          <input 
            type="text" 
            placeholder="e.g. 9048a689-d3fd-4f60-9e89-31e986640370"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#0F172A] outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Asset Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-[#0F172A] outline-none"
          >
            <option value="blueprints">Infrastructure Blueprints</option>
            <option value="branding">Branding Kits</option>
            <option value="compliance">Compliance & Security</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Select File</label>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 border border-slate-300 rounded text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={isUploading}
          className={`w-full py-3 rounded font-bold text-white transition ${isUploading ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#0F172A] hover:bg-slate-700'}`}
        >
          {isUploading ? 'Encrypting & Uploading...' : 'Dispatch to Client Vault'}
        </button>

        {status && (
          <div className={`p-4 rounded text-sm font-medium ${status.includes('failed') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {status}
          </div>
        )}
      </form>
    </div>
  );
}