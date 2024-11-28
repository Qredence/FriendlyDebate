import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { DebateSettings, Participant } from '../types';
import { Logo } from './Logo';

interface DebateSetupProps {
  onSetupComplete: (settings: DebateSettings, participants: Participant[]) => void;
}

export function DebateSetup({ onSetupComplete }: DebateSetupProps) {
  const [topic, setTopic] = useState('');
  const [speakingTime, setSpeakingTime] = useState(5);
  const [participantName, setParticipantName] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);

  const addParticipant = () => {
    if (participantName.trim()) {
      setParticipants([
        ...participants,
        {
          id: crypto.randomUUID(),
          name: participantName.trim(),
          isCurrentSpeaker: false
        }
      ]);
      setParticipantName('');
    }
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic && participants.length >= 2) {
      onSetupComplete(
        { topic, speakingTimeMinutes: speakingTime },
        participants
      );
    }
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="text-center mb-6 sm:mb-8">
        <Logo className="justify-center mb-2" />
        <p className="text-system-gray mt-2 text-sm sm:text-base">
          A simple tool for enjoyable debate with friends
        </p>
      </div>
      
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Setup Debate</h2>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Debate Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="system-input"
              placeholder="Enter debate topic"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Speaking Time (minutes)
            </label>
            <input
              type="number"
              value={speakingTime}
              onChange={(e) => setSpeakingTime(Number(e.target.value))}
              min="1"
              max="30"
              className="system-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Participants
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                className="system-input flex-1"
                placeholder="Enter participant name"
              />
              <button
                type="button"
                onClick={addParticipant}
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
              >
                <span className="text-sm sm:text-base">{participant.name}</span>
                <button
                  type="button"
                  onClick={() => removeParticipant(participant.id)}
                  className="p-1 text-red-500 hover:bg-red-100 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={!topic || participants.length < 2}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            Start Debate
          </button>
        </form>
      </div>
    </div>
  );
}