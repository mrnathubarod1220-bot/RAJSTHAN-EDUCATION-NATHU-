import React from 'react';

interface AppLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function AppLogo({ className = '', size = 'md' }: AppLogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-[8px]',
    md: 'w-24 h-24 text-[10px]',
    lg: 'w-48 h-48 text-[14px]',
    xl: 'w-72 h-72 text-[18px]'
  };

  return (
    <div id="app-logo-container" className={`relative select-none flex items-center justify-center rounded-full aspect-square ${sizeClasses[size]} ${className}`}>
      {/* Outer Golden Border & Shadow */}
      <div className="absolute inset-0 rounded-full border-4 border-amber-400 bg-gradient-to-br from-blue-900 via-indigo-950 to-blue-950 shadow-2xl flex items-center justify-center">
        {/* Inner Gold Thin Ring */}
        <div className="absolute inset-1 rounded-full border border-amber-300/60 opacity-80" />
        
        {/* Subtle radial sheen */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.15)_0%,transparent_70%)] animate-pulse" />
      </div>

      {/* Emblem Graphic Layout */}
      <div className="absolute inset-0 flex flex-col items-center justify-between p-[8%] text-white z-10 font-sans">
        
        {/* Golden Crown on Top */}
        <div className="flex justify-center -mb-1">
          <svg className="w-[18%] h-auto text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 4l3 5 7-6 7 6 3-5-3 14H5L2 4z" />
            <circle cx="2" cy="4" r="1.5" className="fill-amber-300" />
            <circle cx="5" cy="9" r="1" className="fill-amber-300" />
            <circle cx="12" cy="3" r="1.5" className="fill-amber-300" />
            <circle cx="19" cy="9" r="1" className="fill-amber-300" />
            <circle cx="22" cy="4" r="1.5" className="fill-amber-300" />
          </svg>
        </div>

        {/* Brand Text */}
        <div className="text-center w-full px-1 flex flex-col justify-center items-center">
          <span className="font-extrabold uppercase tracking-tight text-white leading-none scale-y-110 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] whitespace-nowrap text-[0.8em]">
            RAJSTHAN EDUCATION
          </span>
          <span className="font-black text-amber-400 uppercase tracking-wide leading-none mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-[1.1em]">
            NATHU
          </span>
          
          {/* Divider line */}
          <div className="w-4/5 h-[1px] bg-amber-400/80 my-1 self-center" />
          
          {/* Subtext */}
          <span className="font-semibold text-white/90 uppercase tracking-widest text-[0.45em] leading-none">
            LEARN • PREPARE • SUCCEED
          </span>
        </div>

        {/* Central Graphic: Open Book and Icons */}
        <div className="relative w-[50%] aspect-[1.3/1] my-1 flex items-center justify-center">
          {/* Golden/White Open Book SVG */}
          <svg className="w-full h-full text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" fill="rgba(255,255,255,0.9)" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" fill="rgba(255,255,255,0.9)" />
          </svg>
          
          {/* Golden Checkmark Inside Book */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-[30%] h-auto text-amber-500 font-bold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Bottom Silhouette & Icons labels */}
        <div className="w-full flex justify-around items-center px-1 text-[0.4em] text-white/90 font-medium">
          <div className="flex flex-col items-center">
            <span className="text-amber-400">📖</span>
            <span className="scale-90">STUDY</span>
          </div>
          <div className="h-4 w-[1px] bg-amber-400/40" />
          <div className="flex flex-col items-center">
            <span className="text-amber-400">📝</span>
            <span className="scale-90">PRACTICE</span>
          </div>
          <div className="h-4 w-[1px] bg-amber-400/40" />
          <div className="flex flex-col items-center">
            <span className="text-amber-400">🏆</span>
            <span className="scale-90">SUCCEED</span>
          </div>
        </div>
      </div>

      {/* Decorative Camel silhouette floating nicely at the bottom left */}
      {size !== 'sm' && (
        <div className="absolute left-[8%] bottom-[18%] w-[16%] opacity-85 z-20 pointer-events-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]">
          {/* Elegant Camel SVG */}
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-amber-100">
            <path d="M20,60 C25,50 35,45 40,50 C45,55 50,40 55,42 C60,44 65,35 68,30 C71,25 75,20 78,22 C81,24 82,32 80,35 C78,38 72,42 75,48 C78,54 85,58 82,65 C79,72 75,70 70,72 C65,74 55,75 50,72 C45,69 35,71 30,75 C25,79 18,70 20,60 Z" />
            {/* Camel Legs */}
            <line x1="30" y1="72" x2="28" y2="90" stroke="currentColor" strokeWidth="4" />
            <line x1="36" y1="72" x2="38" y2="90" stroke="currentColor" strokeWidth="4" />
            <line x1="64" y1="72" x2="62" y2="90" stroke="currentColor" strokeWidth="4" />
            <line x1="70" y1="72" x2="72" y2="90" stroke="currentColor" strokeWidth="4" />
          </svg>
        </div>
      )}

      {/* Decorative Fort/Palace silhouette floating nicely at the bottom right */}
      {size !== 'sm' && (
        <div className="absolute right-[8%] bottom-[18%] w-[18%] opacity-85 z-20 pointer-events-none drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]">
          {/* Palace/Fort SVG */}
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-amber-100/90">
            <rect x="10" y="50" width="80" height="30" />
            {/* Minarets */}
            <rect x="20" y="30" width="10" height="20" />
            <path d="M15,30 L25,15 L35,30 Z" />
            <rect x="70" y="30" width="10" height="20" />
            <path d="M65,30 L75,15 L85,30 Z" />
            {/* Dome */}
            <path d="M40,50 C40,35 60,35 60,50 Z" />
            <rect x="48" y="32" width="4" height="6" />
          </svg>
        </div>
      )}
    </div>
  );
}
