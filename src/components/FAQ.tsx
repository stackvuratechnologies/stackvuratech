'use client';

import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function FAQ() {
  const faqData = [
    {
      question: "What is StackVura Technologies?",
      answer: "StackVura Technologies is an enterprise technology firm based in Machakos, Kenya, that delivers custom Next.js web applications, cloud infrastructure, DevSecOps automation, and physical enterprise branding."
    },
    {
      question: "What cloud architecture and DevSecOps services are offered?",
      answer: "StackVura Technologies provides AWS cloud deployment, Docker containerization, Tailscale mesh networking, automated backup workflows, and continuous integration pipelines designed for high availability."
    },
    {
      question: "What enterprise printing and branding options are available?",
      answer: "StackVura Technologies manufactures smart NFC business cards, corporate staff ID badges, architectural prints, and physical branded merchandise with embedded digital landing links."
    },
    {
      question: "Does StackVura Technologies provide Web3 software development?",
      answer: "Yes, StackVura Technologies engineers ERC-standard smart contracts, zero-knowledge credential systems, real-world asset tokenization platforms, and secure decentralized web applications."
    }
  ];

  // Generate FAQPage JSON-LD Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const safeSchema = JSON.stringify(faqSchema).replace(/</g, '\\u003c');

  return (
    <section id="faq" className="w-full py-24 px-4 bg-slate-50 border-t border-gray-200">
      {/* Inject FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeSchema }}
      />

      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Knowledge Base</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600">
            Structured insights into our enterprise software, cloud, and branding operations.
          </p>
        </div>

        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                {item.question}
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
