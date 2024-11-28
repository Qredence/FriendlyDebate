import React from "react";
import { AlertTriangle, X } from "lucide-react";

interface TimeUpAlertProps {
  isVisible: boolean;
  onDismiss: () => void;
  currentSpeaker?: string;
}

export function TimeUpAlert({
  isVisible,
  onDismiss,
  currentSpeaker,
}: TimeUpAlertProps) {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-x-0 top-12 flex justify-center items-start z-50 px-4"
      data-oid="xk:8nad"
    >
      <div
        role="alert"
        className="ios-blur rounded-[40px] p-4 shadow-lg max-w-md w-full animate-dynamic-island"
        data-oid="4rzkgvn"
      >
        <div className="flex items-center gap-4" data-oid="irw-lht">
          <div
            className="bg-[--system-red] rounded-full p-2"
            data-oid="z758:fe"
          >
            <AlertTriangle className="w-6 h-6 text-white" data-oid="nzvd00k" />
          </div>
          <div className="flex-1" data-oid="33dxpcy">
            <h2 className="text-[15px] font-semibold" data-oid="zd9xz:u">
              Time's Up
            </h2>
            {currentSpeaker && (
              <p
                className="text-[13px] text-[--system-gray]"
                data-oid="b4sxf29"
              >
                {currentSpeaker}'s time has expired
              </p>
            )}
          </div>
          <button
            onClick={onDismiss}
            className="rounded-full p-2 hover:bg-black/5 ios-animation"
            data-oid="_7daht6"
          >
            <X className="w-5 h-5 text-[--system-gray]" data-oid="5_ern2y" />
          </button>
        </div>
      </div>
    </div>
  );
}
