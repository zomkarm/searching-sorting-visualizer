// components/VisualizerControls.tsx
import React from "react";

type Props = {
  onVisualize: () => void;
  onReset: () => void;
  isRunning: boolean;
};

const VisualizerControls: React.FC<Props> = ({ onVisualize, onReset, isRunning }) => {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={onVisualize}
        disabled={isRunning}
        className={`px-6 py-2 rounded-md font-semibold text-white transition
          ${isRunning ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}
        `}
      >
        Visualize
      </button>

      <button
        onClick={onReset}
        disabled={isRunning}
        className={`px-6 py-2 rounded-md font-semibold text-white transition
          ${isRunning ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"}
        `}
      >
        Reset
      </button>
    </div>
  );
};

export default VisualizerControls;
