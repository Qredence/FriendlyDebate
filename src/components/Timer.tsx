import React, { useEffect, useState, useCallback } from 'react';
import { Timer as TimerIcon, Pause, Play, HelpCircle } from 'lucide-react';
import { TimerState } from '../types';
import { TimerTroubleshooting } from './TimerTroubleshooting';

interface TimerProps {
  timeInMinutes: number;
  onTimeEnd: () => void;
  isActive: boolean;
  timerState: TimerState;
  onTimerStateChange: (state: TimerState) => void;
}

export function Timer({ 
  timeInMinutes, 
  onTimeEnd, 
  isActive,
  timerState,
  onTimerStateChange
}: TimerProps) {
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  const resetTimer = useCallback(() => {
    onTimerStateChange({
      isRunning: false,
      timeRemaining: timeInMinutes * 60,
      totalTime: timeInMinutes * 60
    });
  }, [timeInMinutes, onTimerStateChange]);

  const toggleTimer = () => {
    onTimerStateChange(prev => ({
      ...prev,
      isRunning: !prev.isRunning
    }));
  };

  useEffect(() => {
    if (!isActive) {
      resetTimer();
    }
  }, [isActive, resetTimer]);

  useEffect(() => {
    let interval: number;
    
    if (timerState.isRunning && timerState.timeRemaining > 0) {
      interval = setInterval(() => {
        onTimerStateChange(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    } else if (timerState.timeRemaining === 0 && timerState.isRunning) {
      onTimeEnd();
    }

    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.timeRemaining, onTimeEnd, onTimerStateChange]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timerState.timeRemaining / timerState.totalTime) * 100;
  const timerColor = progress <= 25 ? 'text-red-500' : 'text-blue-500';

  return (
    <>
      <div className="relative w-32 h-32 sm:w-48 sm:h-48">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-28 h-28 sm:w-40 sm:h-40 rounded-full border-4 ${
            isActive ? 'border-gray-200' : 'border-gray-100'
          } flex items-center justify-center`}>
            <div className="text-center">
              <TimerIcon className={`w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-2 ${timerColor}`} />
              <div className={`text-xl sm:text-2xl font-bold ${!isActive && 'text-gray-400'}`}>
                {formatTime(timerState.timeRemaining)}
              </div>
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={toggleTimer}
                  disabled={!isActive}
                  className={`mt-2 p-1.5 sm:p-2 rounded-full ${
                    isActive ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
                  }`}
                  aria-label={timerState.isRunning ? "Pause timer" : "Start timer"}
                >
                  {timerState.isRunning ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  )}
                </button>
                <button
                  onClick={() => setShowTroubleshooting(true)}
                  className="mt-2 p-1.5 sm:p-2 rounded-full hover:bg-gray-100"
                  aria-label="Timer help"
                >
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <svg className="w-32 h-32 sm:w-48 sm:h-48 rotate-[-90deg]">
          <circle
            cx="64"
            cy="64"
            r="58"
            className={`stroke-current ${timerColor} ${!isActive && 'opacity-30'}`}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 58}`}
            strokeDashoffset={`${((100 - progress) / 100) * (2 * Math.PI * 58)}`}
            style={{ transition: 'stroke-dashoffset 1s' }}
          />
        </svg>
      </div>

      <TimerTroubleshooting
        isVisible={showTroubleshooting}
        onClose={() => setShowTroubleshooting(false)}
        timerState={timerState}
      />
    </>
  );
}