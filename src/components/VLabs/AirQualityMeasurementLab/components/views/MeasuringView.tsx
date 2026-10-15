import React from "react";

type MeasuringViewProps = {
  measureStatus: string;
};

export const MeasuringView = React.memo(
  ({ measureStatus }: MeasuringViewProps) => {
    return (
      <div className="flex flex-col h-full items-center justify-center space-y-4">
        <h2 className="text-xl font-bold text-[#528C46]">Sedang Mengukur</h2>
        <p className="text-sm text-[#6B7280] text-center px-4">
          {measureStatus}
        </p>
        <div className="w-10 h-10 border-4 border-[#C6E67D] border-t-[#528C46] rounded-full animate-spin mt-4" />
      </div>
    );
  },
);

MeasuringView.displayName = "MeasuringView";
