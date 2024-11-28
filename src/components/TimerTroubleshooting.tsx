import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, HelpCircle, XCircle } from 'lucide-react';
import { TimerDiagnostics } from '../utils/timerDiagnostics';
import type { DiagnosticResult, TimerState } from '../types';

interface TimerTroubleshootingProps {
  isVisible: boolean;
  onClose: () => void;
  timerState: TimerState;
}

export function TimerTroubleshooting({ isVisible, onClose, timerState }: TimerTroubleshootingProps) {
  const [diagnosticResults, setDiagnosticResults] = useState<DiagnosticResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const runDiagnostics = async () => {
    setIsChecking(true);
    const results = await TimerDiagnostics.checkAll(timerState);
    setDiagnosticResults(results);
    setIsChecking(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <HelpCircle className="w-6 h-6 mr-2 text-blue-500" />
            Timer Troubleshooting Guide
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Quick Diagnostic Check</h3>
            <button
              onClick={runDiagnostics}
              disabled={isChecking}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
            >
              {isChecking ? 'Checking...' : 'Run Diagnostics'}
            </button>
          </div>

          {diagnosticResults.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Diagnostic Results:</h3>
              {diagnosticResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg flex items-start ${
                    result.status === 'success'
                      ? 'bg-green-50'
                      : result.status === 'warning'
                      ? 'bg-yellow-50'
                      : 'bg-red-50'
                  }`}
                >
                  {result.status === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  ) : result.status === 'warning' ? (
                    <AlertCircle className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium">{result.message}</p>
                    {result.solution && (
                      <p className="text-sm text-gray-600 mt-1">{result.solution}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-semibold">Common Issues and Solutions:</h3>
            <div className="space-y-4">
              <TroubleshootingStep
                title="Timer Not Starting"
                steps={[
                  "Verify that a speaker is selected",
                  "Check if the play button is enabled",
                  "Ensure the previous turn has been properly ended"
                ]}
              />
              <TroubleshootingStep
                title="Timer Stuck or Not Counting Down"
                steps={[
                  "Check if the timer is paused (play button visible)",
                  "Verify that the time remaining is greater than 0",
                  "Try refreshing the page if the issue persists"
                ]}
              />
              <TroubleshootingStep
                title="Time's Up Alert Not Showing"
                steps={[
                  "Ensure your browser allows notifications",
                  "Check if the sound is enabled on your device",
                  "Verify that the timer reached 0:00"
                ]}
              />
            </div>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Still Having Issues?</h3>
            <p className="text-gray-600">
              If you're still experiencing problems after trying these solutions,
              try refreshing the page or contact support for additional assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TroubleshootingStep({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="font-medium mb-2">{title}</h4>
      <ol className="list-decimal list-inside space-y-1 text-gray-600">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}