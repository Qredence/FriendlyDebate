import React, { useState } from 'react';
import { DebateSetup } from './components/DebateSetup';
import { Timer } from './components/Timer';
import { ParticipantList } from './components/ParticipantList';
import { TimeUpAlert } from './components/TimeUpAlert';
import { SpeakerControls } from './components/SpeakerControls';
import { Logo } from './components/Logo';
import { Participant, DebateSettings, TimerState } from './types';
import { playTimeUpSound } from './utils/sound';

export default function App() {
  const [settings, setSettings] = useState<DebateSettings | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [showTimeUpAlert, setShowTimeUpAlert] = useState(false);
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    timeRemaining: 0,
    totalTime: 0
  });

  const handleSetupComplete = (
    debateSettings: DebateSettings,
    debateParticipants: Participant[]
  ) => {
    const participantsWithFirstSpeaker = debateParticipants.map((p, index) => ({
      ...p,
      isCurrentSpeaker: index === 0
    }));
    setSettings(debateSettings);
    setParticipants(participantsWithFirstSpeaker);
    setTimerState({
      isRunning: false,
      timeRemaining: debateSettings.speakingTimeMinutes * 60,
      totalTime: debateSettings.speakingTimeMinutes * 60
    });
  };

  const handleSelectSpeaker = (id: string) => {
    setParticipants(
      participants.map(p => ({
        ...p,
        isCurrentSpeaker: p.id === id
      }))
    );
  };

  const handleTimeEnd = () => {
    playTimeUpSound();
    setShowTimeUpAlert(true);
    setTimerState(prev => ({ ...prev, isRunning: false }));
  };

  const handleEndTurnEarly = () => {
    setShowTimeUpAlert(true);
    setTimerState(prev => ({ ...prev, isRunning: false }));
  };

  const handleTimerToggle = () => {
    setTimerState(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const handleAlertDismiss = () => {
    setShowTimeUpAlert(false);
    const currentIndex = participants.findIndex(p => p.isCurrentSpeaker);
    const nextIndex = (currentIndex + 1) % participants.length;
    handleSelectSpeaker(participants[nextIndex].id);
    if (settings) {
      setTimerState({
        isRunning: false,
        timeRemaining: settings.speakingTimeMinutes * 60,
        totalTime: settings.speakingTimeMinutes * 60
      });
    }
  };

  const currentSpeaker = participants.find(p => p.isCurrentSpeaker);

  if (!settings) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] py-6 sm:py-12">
        <DebateSetup onSetupComplete={handleSetupComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] py-6 sm:py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="system-card p-4 sm:p-8 slide-up">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div>
              <Logo className="mb-2" />
              <p className="text-system-gray text-sm sm:text-base">
                {settings.topic}
              </p>
            </div>
            <Timer
              timeInMinutes={settings.speakingTimeMinutes}
              onTimeEnd={handleTimeEnd}
              isActive={!!currentSpeaker}
              timerState={timerState}
              onTimerStateChange={setTimerState}
            />
          </div>

          <SpeakerControls
            currentSpeaker={currentSpeaker}
            onEndTurnEarly={handleEndTurnEarly}
            timerState={timerState}
            onTimerToggle={handleTimerToggle}
          />
          
          <div className="mt-8">
            <ParticipantList
              participants={participants}
              onSelectSpeaker={handleSelectSpeaker}
            />
          </div>
        </div>
      </div>

      <TimeUpAlert
        isVisible={showTimeUpAlert}
        onDismiss={handleAlertDismiss}
        currentSpeaker={currentSpeaker?.name}
      />
    </div>
  );
}