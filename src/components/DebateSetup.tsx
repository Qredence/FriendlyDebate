import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { DebateSettings, Participant } from "../types";
import { Logo } from "./Logo";

interface DebateSetupProps {
  onSetupComplete: (
    settings: DebateSettings,
    participants: Participant[],
  ) => void;
}

export function DebateSetup({ onSetupComplete }: DebateSetupProps) {
  const [topic, setTopic] = useState("");
  const [speakingTime, setSpeakingTime] = useState(5);
  const [participantName, setParticipantName] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([]);

  const addParticipant = () => {
    if (participantName.trim()) {
      setParticipants([
        ...participants,
        {
          id: crypto.randomUUID(),
          name: participantName.trim(),
          isCurrentSpeaker: false,
        },
      ]);
      setParticipantName("");
    }
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic && participants.length >= 2) {
      onSetupComplete(
        { topic, speakingTimeMinutes: speakingTime },
        participants,
      );
    }
  };

  return (
    <div className="max-w-md mx-auto px-4" data-oid="cdn97gm">
      <div
        className="text-center sm:mb-8 flex justify-center items-start gap-0 mb-0 flex-col"
        data-oid="sci56w4"
      >
        <Logo className="justify-center mb-2" data-oid="l.3725r" />

        <div data-oid="ra6ou17">
          <p
            className="w-[fit-content] font-extrabold text-[#2B2B2E] text-[18px]"
            data-oid="19q6hnk"
          >
            FriendlyDebate
          </p>
        </div>

        <div data-oid="vw2.pur">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            data-oid="j.w2teb"
          >
            QredenceLabs
          </label>
        </div>
        <div data-oid="ltpmk8w"></div>
      </div>

      <div
        className="bg-white p-4 sm:p-6 rounded-xl shadow-lg pt-[12px]"
        data-oid="_hl1q6."
      >
        <h2
          className="sm:text-2xl font-bold mb-6 text-[15px]"
          data-oid="23adq91"
        >
          Setup Debate
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6 leading-[20px]"
          data-oid="lc0zbry"
        >
          <div data-oid="v173j..">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="system-input w-full border-[#00000000] border-0 p-[12px] bg-[#ECECED] rounded-[12px]"
              placeholder="Enter debate topic"
              required
              data-oid="k5_va-d"
            />
          </div>

          <div data-oid="srbitvm">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              data-oid="tldn6n."
            >
              Speaking Time (minutes)
            </label>
            <input
              type="number"
              value={speakingTime}
              onChange={(e) => setSpeakingTime(Number(e.target.value))}
              min="1"
              max="30"
              className="system-input w-full p-[12px] bg-[#ECECED] rounded-[12px]"
              data-oid="-:9e7k1"
            />
          </div>

          <div data-oid="z8.p:bl">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              data-oid="jufns96"
            >
              Add Participants
            </label>
            <div className="flex gap-2 items-center" data-oid="pgmc2ca">
              <input
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                className="system-input flex-1 p-[12px] w-full bg-[#ECECED] rounded-[12px]"
                placeholder="Enter participant name"
                data-oid="eyf2yz-"
              />

              <button
                type="button"
                onClick={addParticipant}
                className="bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center h-[fit-content] p-2 pl-[12px] pr-[12px] rounded-[12px]"
                data-oid=":jp1hyv"
              >
                <label
                  className="block text-sm font-medium m-0 text-[#FFFFFF]"
                  data-oid="_juy4.i"
                >
                  Add friend
                </label>
                <Plus
                  className="w-[fit-content] h-[fit-content]"
                  data-oid="_he0swg"
                />
              </button>
            </div>
          </div>

          <div className="space-y-2" data-oid="i6z3o92">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                data-oid="jc6my04"
              >
                <span className="text-sm sm:text-base" data-oid="somdkiq">
                  {participant.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeParticipant(participant.id)}
                  className="p-1 text-red-500 hover:bg-red-100 rounded-full"
                  data-oid="9s8vwxp"
                >
                  <X className="w-4 h-4" data-oid="26440nj" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={!topic || participants.length < 2}
            className="w-full py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base rounded-[12px]"
            data-oid="377zva."
          >
            Start Debate
          </button>
        </form>
      </div>
    </div>
  );
}
