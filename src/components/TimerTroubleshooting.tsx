import React, { useState } from "react";
import { AlertCircle, CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { TimerDiagnostics } from "../utils/timerDiagnostics";
import type { DiagnosticResult, TimerState } from "../types";

interface TimerTroubleshootingProps {
  isVisible: boolean;
  onClose: () => void;
  timerState: TimerState;
}

export function TimerTroubleshooting({
  isVisible,
  onClose,
  timerState,
}: TimerTroubleshootingProps) {
  const [diagnosticResults, setDiagnosticResults] = useState<
    DiagnosticResult[]
  >([]);
  const [isChecking, setIsChecking] = useState(false);

  const runDiagnostics = async () => {
    setIsChecking(true);
    const results = await TimerDiagnostics.checkAll(timerState);
    setDiagnosticResults(results);
    setIsChecking(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      data-oid="i00awo1"
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto"
        data-oid="9k_4i:8"
      >
        <div
          className="flex justify-between items-center mb-6"
          data-oid="328reop"
        >
          <h2
            className="text-2xl font-bold flex items-center"
            data-oid="bg.nctq"
          >
            <HelpCircle
              className="w-6 h-6 mr-2 text-blue-500"
              data-oid="ir78aca"
            />
            Timer Troubleshooting Guide
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            data-oid="hzhzeh6"
          >
            <XCircle className="w-6 h-6" data-oid="jzkun9s" />
          </button>
        </div>

        <div className="space-y-6" data-oid="uy013pc">
          <div className="bg-blue-50 p-4 rounded-lg" data-oid="2p5povv">
            <h3 className="font-semibold mb-2" data-oid=":g_aqk.">
              Quick Diagnostic Check
            </h3>
            <button
              onClick={runDiagnostics}
              disabled={isChecking}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
              data-oid="c.63-ze"
            >
              {isChecking ? "Checking..." : "Run Diagnostics"}
            </button>
          </div>

          {diagnosticResults.length > 0 && (
            <div className="space-y-4" data-oid="rhi-u3l">
              <h3 className="font-semibold" data-oid="vffka_w">
                Diagnostic Results:
              </h3>
              {diagnosticResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg flex items-start ${
                    result.status === "success"
                      ? "bg-green-50"
                      : result.status === "warning"
                        ? "bg-yellow-50"
                        : "bg-red-50"
                  }`}
                  data-oid="0rj4fco"
                >
                  {result.status === "success" ? (
                    <CheckCircle2
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                      data-oid="x-67u:i"
                    />
                  ) : result.status === "warning" ? (
                    <AlertCircle
                      className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0"
                      data-oid="v2f:y33"
                    />
                  ) : (
                    <XCircle
                      className="w-5 h-5 text-red-500 mr-3 flex-shrink-0"
                      data-oid="r.vy2oj"
                    />
                  )}
                  <div data-oid="htj-ou1">
                    <p className="font-medium" data-oid="7.qohom">
                      {result.message}
                    </p>
                    {result.solution && (
                      <p
                        className="text-sm text-gray-600 mt-1"
                        data-oid="338u.al"
                      >
                        {result.solution}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4" data-oid="53hdjke">
            <h3 className="font-semibold" data-oid="o0y6q4h">
              Common Issues and Solutions:
            </h3>
            <div className="space-y-4" data-oid="662zptp">
              <TroubleshootingStep
                title="Timer Not Starting"
                steps={[
                  "Verify that a speaker is selected",
                  "Check if the play button is enabled",
                  "Ensure the previous turn has been properly ended",
                ]}
                data-oid=":26c:-m"
              />

              <TroubleshootingStep
                title="Timer Stuck or Not Counting Down"
                steps={[
                  "Check if the timer is paused (play button visible)",
                  "Verify that the time remaining is greater than 0",
                  "Try refreshing the page if the issue persists",
                ]}
                data-oid="8q95q-s"
              />

              <TroubleshootingStep
                title="Time's Up Alert Not Showing"
                steps={[
                  "Ensure your browser allows notifications",
                  "Check if the sound is enabled on your device",
                  "Verify that the timer reached 0:00",
                ]}
                data-oid="174v_1e"
              />
            </div>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg" data-oid="c3pxn7c">
            <h3 className="font-semibold mb-2" data-oid="rc.xw9:">
              Still Having Issues?
            </h3>
            <p className="text-gray-600" data-oid="m:wzd04">
              If you're still experiencing problems after trying these
              solutions, try refreshing the page or contact support for
              additional assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TroubleshootingStep({
  title,
  steps,
}: {
  title: string;
  steps: string[];
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg" data-oid="lox19za">
      <h4 className="font-medium mb-2" data-oid="incay2h">
        {title}
      </h4>
      <ol
        className="list-decimal list-inside space-y-1 text-gray-600"
        data-oid="mn9dz38"
      >
        {steps.map((step, index) => (
          <li key={index} data-oid="gju6a51">
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
