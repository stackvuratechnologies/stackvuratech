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
  
  // Modern SSR Browser Client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function fetchCategorizedAssets() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Helper function to fetch files from a specific subfolder
      const getFiles = async (folder: string) => {
        const { data } = await supabase.storage
          .from('client-vault')
          .list(`${user.id}/${folder}`);
        return data ? data.filter(file => file.name !== '.emptyFolderPlaceholder') : [];
      };

      // Fetch all three categories concurrently for maximum speed
      const [blueprints, branding, compliance] = await Promise.all([
        getFiles('blueprints'),
        getFiles('branding'),
        getFiles('compliance')
      ]);

      setVaultData({ blueprints, branding, compliance });
      setLoading(false);
    }

    fetchCategorizedAssets();
  }, [supabase]);

  // Use a signed URL to share a file for a fixed amount of time.
  const downloadAsset = async (folder: string, fileName: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Generates a secure, temporary link valid for 60 seconds.
    const { data, error } = await supabase.storage
      .from('client-vault')
      .createSignedUrl(`${user.id}/${folder}/${fileName}`, 60); 

    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank');
    }
  };

  // UI Component for rendering a specific category block
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
                    {(file.metadata?.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button 
                  onClick={() => downloadAsset(folder, file.name)}
                  className="px-4 py-2 bg-[#0F172A] text-white text-sm font-medium rounded hover:bg-slate-700 transition"
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

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Secure Asset Vault</h1>
      <p className="text-slate-500 mb-8">Encrypted, centralized repository for your project deliverables.</p>

      {loading ? (
        <div className="flex animate-pulse space-x-4">
          <div className="h-10 bg-slate-200 rounded w-1/4"></div>
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