import React from "react";
import { UserCircle, SkipForward, Play, Pause } from "lucide-react";
import { Participant, TimerState } from "../types";

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
  onTimerToggle,
}: SpeakerControlsProps) {
  if (!currentSpeaker) return null;

  return (
    <div className="bg-blue-50 p-4 rounded-lg mb-6" data-oid="cdi-zz_">
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        data-oid="mkrsg93"
      >
        <div className="flex items-center" data-oid="ljz9is9">
          <UserCircle
            className="w-8 h-8 text-blue-500 mr-3"
            data-oid="b2b:_bb"
          />

          <div data-oid="n1oypqq">
            <h3 className="font-semibold text-lg" data-oid="3_h.059">
              Current Speaker
            </h3>
            <p className="text-blue-600" data-oid="7e4ncwl">
              {currentSpeaker.name}
            </p>
          </div>
        </div>
        <div
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          data-oid="_xqpqps"
        >
          <button
            onClick={onTimerToggle}
            className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
              timerState.isRunning
                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
            aria-label={timerState.isRunning ? "Pause timer" : "Start timer"}
            data-oid="274:l2a"
          >
            {timerState.isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" data-oid="r15mi6x" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" data-oid="-hhqo8k" />
                Start
              </>
            )}
          </button>
          <button
            onClick={onEndTurnEarly}
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            data-oid="uga2v5j"
          >
            <SkipForward className="w-4 h-4 mr-2" data-oid="9j1drrg" />
            End Turn Early
          </button>
        </div>
      </div>
    </div>
  );
}
