export interface Participant {
  id: string;
  name: string;
  isCurrentSpeaker: boolean;
}

export interface DebateSettings {
  topic: string;
  speakingTimeMinutes: number;
}

export interface TimerState {
  isRunning: boolean;
  timeRemaining: number;
  totalTime: number;
}

export interface DiagnosticResult {
  status: 'success' | 'warning' | 'error' | 'info';
  message: string;
  solution?: string;
}