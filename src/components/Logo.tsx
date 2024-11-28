import React from 'react';
import { MessageCircle } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--system-blue)]" />
      <span className="font-bold text-xl sm:text-2xl">FriendlyDebate</span>
    </div>
  );
}