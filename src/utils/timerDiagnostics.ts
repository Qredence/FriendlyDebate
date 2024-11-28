import type { TimerState, DiagnosticResult } from '../types';

export class TimerDiagnostics {
  static async checkAll(timerState: TimerState): Promise<DiagnosticResult[]> {
    const results: DiagnosticResult[] = [];

    // Check timer state
    results.push(this.checkTimerState(timerState));

    // Check browser compatibility
    results.push(await this.checkBrowserCompatibility());

    // Check audio context
    results.push(await this.checkAudioContext());

    return results;
  }

  private static checkTimerState(timerState: TimerState): DiagnosticResult {
    if (!timerState.timeRemaining && !timerState.isRunning) {
      return {
        status: 'warning',
        message: 'Timer has no time remaining',
        solution: 'Reset the timer or select a new speaker to start a new turn'
      };
    }

    if (timerState.timeRemaining && !timerState.isRunning) {
      return {
        status: 'info',
        message: 'Timer is paused',
        solution: 'Press the play button to start the timer'
      };
    }

    return {
      status: 'success',
      message: 'Timer state is valid',
    };
  }

  private static async checkBrowserCompatibility(): Promise<DiagnosticResult> {
    const isModernBrowser = 'requestAnimationFrame' in window &&
      'localStorage' in window &&
      'fetch' in window;

    return {
      status: isModernBrowser ? 'success' : 'error',
      message: isModernBrowser
        ? 'Browser compatibility check passed'
        : 'Browser may not be fully compatible',
      solution: isModernBrowser
        ? undefined
        : 'Try using a modern browser like Chrome, Firefox, or Edge'
    };
  }

  private static async checkAudioContext(): Promise<DiagnosticResult> {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) {
        throw new Error('AudioContext not supported');
      }

      const context = new AudioContext();
      await context.close();

      return {
        status: 'success',
        message: 'Audio system check passed'
      };
    } catch (error) {
      return {
        status: 'warning',
        message: 'Audio system check failed',
        solution: 'Enable audio permissions or try a different browser'
      };
    }
  }
}