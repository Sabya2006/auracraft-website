import React from 'react';

export default function AuraLogo({ className = "w-9 h-9" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]"
      >
        <defs>
          <linearGradient id="auraGoldCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Stylized Geometric 'A' Emblem */}
        <path
          d="M 20 82 L 48 18 C 50 14 54 14 56 18 L 84 82 C 86 86 82 90 77 88 L 62 82 C 58 80 54 84 50 84 C 44 84 38 80 34 82 L 23 88 C 18 90 14 86 20 82 Z"
          fill="url(#auraGoldCyan)"
          filter="url(#glow)"
        />

        {/* Inner Glowing Cross Arc */}
        <path
          d="M 32 60 Q 50 42 70 60"
          stroke="#ffffff"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Central Cyan Sparkle */}
        <circle cx="50" cy="45" r="5" fill="#38bdf8" />
      </svg>
    </div>
  );
}
