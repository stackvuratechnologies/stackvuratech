import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export default function EnterpriseVault() {
  const [vaultData, setVaultData] = useState({
    blueprints: [],
    branding: [],
    compliance: []
  });
  const [loading, setLoading] = useState(true);
  
  // Modern SSR Browser Client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  
  useEffect(() => {
    async function loadClientFiles() {
      // 1. Get the current logged-in enterprise client
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 2. Fetch files securely from their dedicated folder in the client-vault bucket
      const { data, error } = await supabase.storage
        .from('client-vault')
        .list(user.id); // Looks inside the folder named after their User ID

      if (data) {
        // Filter out any hidden system files
        const validFiles = data.filter(file => file.name !== '.emptyFolderPlaceholder');
        setFiles(validFiles);
      }
      setLoading(false);
    }

    loadClientFiles();
  }, [supabase]);

  const downloadFile = async (fileName: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // 3. Generate a secure, short-lived download link
    const { data, error } = await supabase.storage
      .from('client-vault')
      .createSignedUrl(`${user.id}/${fileName}`, 60); // URL expires in 60 seconds

    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Secure Asset & Deliverables Vault</h1>
      
      {loading ? (
        <p className="text-slate-500">Decrypting vault contents...</p>
      ) : files.length === 0 ? (
        <div className="bg-slate-50 p-6 rounded border border-slate-200">
          <p className="text-slate-600">No deliverables have been uploaded to your vault yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {files.map((file) => (
            <div key={file.name} className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-700">{file.name}</p>
                {/* File size in MB */}
                <p className="text-sm text-slate-500">{(file.metadata?.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button 
                onClick={() => downloadFile(file.name)}
                className="bg-[#0F172A] text-white px-4 py-2 rounded hover:bg-slate-700 transition"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}