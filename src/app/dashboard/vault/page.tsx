'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export default function EnterpriseVault() {
  const [vaultData, setVaultData] = useState({
    blueprints: [] as any[],
    branding: [] as any[],
    compliance: [] as any[]
  });
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  
  // Modern SSR Browser Client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function fetchCategorizedAssets() {
      try {
        const { data: { user }, error: sessionError } = await supabase.auth.getUser();
        
        // If there is no user session, show the access denied message instead of freezing
        if (sessionError || !user) {
          console.error("Session verification failed.");
          setAuthError(true);
          return;
        }

        // Helper function with built-in error catching for Supabase Storage
        const getFiles = async (folder: string) => {
          const { data, error } = await supabase.storage
            .from('client-vault')
            .list(`${user.id}/${folder}`);
            
          if (error) {
            console.error(`Failed to load ${folder}:`, error.message);
            return [];
          }
          return data ? data.filter(file => file.name !== '.emptyFolderPlaceholder') : [];
        };

        // Fetch all three categories concurrently
        const [blueprints, branding, compliance] = await Promise.all([
          getFiles('blueprints'),
          getFiles('branding'),
          getFiles('compliance')
        ]);

        setVaultData({ blueprints, branding, compliance });

      } catch (err) {
        console.error("Critical Vault Error:", err);
      } finally {
        // This guarantees the skeleton loader ALWAYS turns off
        setLoading(false);
      }
    }

    fetchCategorizedAssets();
  }, [supabase]);

  const downloadAsset = async (folder: string, fileName: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.storage
      .from('client-vault')
      .createSignedUrl(`${user.id}/${folder}/${fileName}`, 60); 

    if (error) {
      alert(`Download failed: ${error.message}`);
      return;
    }

    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank');
    }
  };

  const CategoryBlock = ({ title, description, files, folder }: { title: string, description: string, files: any[], folder: string }) => (
    <div className="mb-8 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="bg-slate-50 border-b border-slate-200 p-5">
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </div>
      <div className="p-5">
        {files.length === 0 ? (
          <p className="text-sm text-slate-400 italic">No assets available in this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {files.map((file) => (
              <div key={file.name} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-300 transition">
                <div>
                  <p className="font-medium text-slate-700">{file.name}</p>
                  <p className="text-xs text-slate-400 uppercase mt-1">
                    {file.metadata?.size ? (file.metadata.size / 1024 / 1024).toFixed(2) : '0.00'} MB
                  </p>
                </div>
                <button 
                  onClick={() => downloadAsset(folder, file.name)}
                  className="px-4 py-2 bg-[#0F172A] text-white text-sm font-medium rounded hover:bg-slate-700 transition shadow-sm"
                >
                  Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // If the user isn't logged in properly, show them this strict error
  if (authError) {
    return (
      <div className="max-w-3xl mx-auto p-12 text-center mt-12 bg-red-50 border border-red-200 rounded-xl">
        <h2 className="text-2xl font-bold text-red-700 mb-2">Access Denied</h2>
        <p className="text-red-600">You must be logged into your enterprise account to view the secure vault.</p>
        <button onClick={() => window.location.href = '/'} className="mt-6 bg-red-700 text-white px-6 py-2 rounded font-bold hover:bg-red-800 transition">
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Secure Asset Vault</h1>
      <p className="text-slate-500 mb-8">Encrypted, centralized repository for your project deliverables.</p>

      {loading ? (
        // The skeleton loader
        <div className="flex flex-col space-y-8 animate-pulse">
          <div className="h-32 bg-slate-200 rounded-xl w-full"></div>
          <div className="h-32 bg-slate-200 rounded-xl w-full"></div>
        </div>
      ) : (
        <>
          <CategoryBlock 
            title="Infrastructure Blueprints" 
            description="Server architecture diagrams, container configurations, and mesh network details."
            files={vaultData.blueprints} 
            folder="blueprints"
          />
          <CategoryBlock 
            title="Branding Kits" 
            description="High-resolution logos, vector graphics, and identity assets."
            files={vaultData.branding} 
            folder="branding"
          />
          <CategoryBlock 
            title="Compliance & Security" 
            description="Vulnerability scans, DevSecOps reports, and smart contract audit PDFs."
            files={vaultData.compliance} 
            folder="compliance"
          />
        </>
      )}
    </div>
  );
}