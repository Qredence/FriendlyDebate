import { useState, useCallback } from "react";

// Components
import { DebateSetup } from "./components/DebateSetup";
import { Timer } from "./components/Timer";
import { ParticipantList } from "./components/ParticipantList";
import { TimeUpAlert } from "./components/TimeUpAlert";
import { SpeakerControls } from "./components/SpeakerControls";
import { Logo } from "./components/Logo";

// Types
import { Participant, DebateSettings, TimerState } from "./types";

// Utils
import { playTimeUpSound } from "./utils/sound";

export default function App(): JSX.Element {
  const [settings, setSettings] = useState<DebateSettings | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [showTimeUpAlert, setShowTimeUpAlert] = useState<boolean>(false);
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    timeRemaining: 0,
    totalTime: 0,
  });

  const handleSetupComplete = useCallback(
    (
      debateSettings: DebateSettings,
      debateParticipants: Participant[],
    ): void => {
      const participantsWithFirstSpeaker = debateParticipants.map(
        (p, index) => ({
          ...p,
          isCurrentSpeaker: index === 0,
        }),
      );
      setSettings(debateSettings);
      setParticipants(participantsWithFirstSpeaker);
      setTimerState({
        isRunning: false,
        timeRemaining: debateSettings.speakingTimeMinutes * 60,
        totalTime: debateSettings.speakingTimeMinutes * 60,
      });
    },
    [],
  );

  const handleSelectSpeaker = (id: string) => {
    setParticipants(
      participants.map((p) => ({
        ...p,
        isCurrentSpeaker: p.id === id,
      })),
    );
  };

  const handleTimeEnd = () => {
    playTimeUpSound();
    setShowTimeUpAlert(true);
    setTimerState((prev) => ({ ...prev, isRunning: false }));
  };

  const handleEndTurnEarly = () => {
    setShowTimeUpAlert(true);
    setTimerState((prev) => ({ ...prev, isRunning: false }));
  };

  const handleTimerToggle = () => {
    setTimerState((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const handleAlertDismiss = () => {
    setShowTimeUpAlert(false);
    const currentIndex = participants.findIndex((p) => p.isCurrentSpeaker);
    const nextIndex = (currentIndex + 1) % participants.length;
    handleSelectSpeaker(participants[nextIndex].id);
    if (settings) {
      setTimerState({
        isRunning: false,
        timeRemaining: settings.speakingTimeMinutes * 60,
        totalTime: settings.speakingTimeMinutes * 60,
      });
    }
  };

  const currentSpeaker = participants.find((p) => p.isCurrentSpeaker);

  if (!settings) {
    return (
      <div
        className="min-h-screen bg-[#f5f5f7] py-6 sm:py-12 items-center block"
        data-oid="mzqqerq"
      >
        <DebateSetup onSetupComplete={handleSetupComplete} data-oid="ekjo8ta" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] py-6 sm:py-12" data-oid="w8cg5e:">
      <div className="max-w-4xl mx-auto px-4" data-oid="mb80w7s">
        <div className="system-card p-4 sm:p-8 slide-up" data-oid="xj3p8c8">
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8 items-center"
            data-oid="b6z11wh"
          >
            <div data-oid="yq7_pfw">
              <Logo className="mb-2" data-oid="9zmv0s6" />
              <p
                className="sm:text-base text-[#000000] text-[32px] flex items-center justify-center"
                data-oid="z5qh29z"
              >
                {settings.topic}
              </p>
            </div>
            <Timer
              timeInMinutes={settings.speakingTimeMinutes}
              onTimeEnd={handleTimeEnd}
              isActive={!!currentSpeaker}
              timerState={timerState}
              onTimerStateChange={setTimerState}
              data-oid="8bsbwwf"
            />
          </div>

          <SpeakerControls
            currentSpeaker={currentSpeaker}
            onEndTurnEarly={handleEndTurnEarly}
            timerState={timerState}
            onTimerToggle={handleTimerToggle}
            data-oid="1fgmnvg"
          />

          <div className="mt-8" data-oid="3ph4f-0">
            <ParticipantList
              participants={participants}
              onSelectSpeaker={handleSelectSpeaker}
              data-oid="6f8a7i8"
            />
          </div>
        </div>
      </div>

      <TimeUpAlert
        isVisible={showTimeUpAlert}
        onDismiss={handleAlertDismiss}
        currentSpeaker={currentSpeaker?.name}
        data-oid="kg_ifvn"
      />
    </div>
  );
}
