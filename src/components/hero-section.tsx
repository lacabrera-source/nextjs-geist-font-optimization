'use client';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 bg-[url('https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4b056d0f-9a47-4f4b-9eaa-4c0bcc0083bc.png')] bg-cover bg-center opacity-20"></div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
          MP
        </h1>
        <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-8 tracking-wider">
          Makata Pilipinas
        </h2>
        <p className="text-lg text-gray-400 mb-12 max-w-md mx-auto">
          Discover the essence of Filipino artistry through our curated collection
        </p>
        
        <Link 
          href="/gallery"
          className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
        >
          See Images
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
