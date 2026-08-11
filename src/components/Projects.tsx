'use client';

import { useState, useEffect } from 'react';
import { Code, ExternalLink, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ProjectsProps {
  onOpenDemo: () => void;
}

export default function Projects({ onOpenDemo }: ProjectsProps) {
  const [githubUrl, setGithubUrl] = useState('https://github.com/captain-lgtm');

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from('site_settings').select('setting_value').eq('setting_key', 'github_url').single();
      if (data) {
        setGithubUrl(data.setting_value);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section id="projects" className="w-full py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Architecture Case Studies</h2>
          <p className="text-slate-600">Enterprise Web3 integration and infrastructure deployments.</p>
        </div>

        <div className="space-y-8">
          {/* Demo Section */}
          <div className="bg-slate-50 border border-gray-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">NexusRWA Enterprise</h3>
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
              <ul className="space-y-3">
                <li className="flex items-center space-x-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                  <span>ZK-Snarks for privacy-preserving credential checks</span>
                </li>
                <li className="flex items-center space-x-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-yellow-500" />
                  <span>Live staging environment connected to testnet.</span>
                </li>
              </ul>
              <button onClick={onOpenDemo} className="bg-blue-900 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-800 transition flex items-center space-x-2 shadow-md">
                <Code className="w-5 h-5" />
                <span>Run Interactive Demo</span>
              </button>
            </div>
          </div>

          {/* GitHub Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col justify-between shadow-sm">
              <p className="text-slate-600 mb-8">
                A smart contract bridge linking physical high-value assets to decentralized liquidity pools using the ERC-3643 standard.
              </p>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-900 font-bold hover:underline flex items-center space-x-2 w-fit">
                <span>View Source Code on GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-blue-900 rounded-xl p-8 flex flex-col justify-between shadow-md">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Infrastructure as Code (IaC)</h3>
                <p className="text-blue-100 mb-8">
                  Review our proprietary DevSecOps blueprints. We deploy Dockerized Next.js and n8n environments securely via Tailscale and AWS.
                </p>
              </div>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-yellow-500 font-bold hover:underline flex items-center space-x-2 w-fit">
                <span>Inspect Our Deploy Blueprints</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
