import React from 'react';
import { UserCircle, SkipForward, Play, Pause } from 'lucide-react';
import { Participant, TimerState } from '../types';

interface SpeakerControlsProps {
  currentSpeaker: Participant | undefined;
  onEndTurnEarly: () => void;
  timerState: TimerState;
  onTimerToggle: () => void;
}

export function SpeakerControls({ 
  currentSpeaker, 
  onEndTurnEarly, 
  timerState, 
  onTimerToggle 
}: SpeakerControlsProps) {
  if (!currentSpeaker) return null;

  return (
    <div className="bg-blue-50 p-4 rounded-lg mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center">
          <UserCircle className="w-8 h-8 text-blue-500 mr-3" />
          <div>
            <h3 className="font-semibold text-lg">Current Speaker</h3>
            <p className="text-blue-600">{currentSpeaker.name}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={onTimerToggle}
            className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
              timerState.isRunning
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            aria-label={timerState.isRunning ? "Pause timer" : "Start timer"}
          >
            {timerState.isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </button>
          <button
            onClick={onEndTurnEarly}
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <SkipForward className="w-4 h-4 mr-2" />
            End Turn Early
          </button>
        </div>
      </div>
    </div>
  );
}