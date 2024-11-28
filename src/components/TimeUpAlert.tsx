import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface TimeUpAlertProps {
  isVisible: boolean;
  onDismiss: () => void;
  currentSpeaker?: string;
}

export function TimeUpAlert({ isVisible, onDismiss, currentSpeaker }: TimeUpAlertProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 top-12 flex justify-center items-start z-50 px-4">
      <div 
        role="alert"
        className="ios-blur rounded-[40px] p-4 shadow-lg max-w-md w-full animate-dynamic-island"
      >
        <div className="flex items-center gap-4">
          <div className="bg-[--system-red] rounded-full p-2">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-[15px] font-semibold">Time's Up</h2>
            {currentSpeaker && (
              <p className="text-[13px] text-[--system-gray]">
                {currentSpeaker}'s time has expired
              </p>
            )}
          </div>
          <button
            onClick={onDismiss}
            className="rounded-full p-2 hover:bg-black/5 ios-animation"
          >
            <X className="w-5 h-5 text-[--system-gray]" />
          </button>
        </div>
      </div>
    </div>
  );
}