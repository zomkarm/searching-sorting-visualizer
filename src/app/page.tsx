"use client";

import React, { useState } from "react";
import InputArray from "../components/InputArray";
import AlgorithmSelector from "../components/AlgorithmSelector";
import Visualizer from "../components/Visualizer";

export default function Home() {
  const [array, setArray] = useState<number[] | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [speed, setSpeed] = useState(300);
  const [algorithm, setAlgorithm] = useState("");

  const handleAlgorithmSelect = (type: string, algo: string, speed: number) => {
    setType(type);
    setAlgorithm(algo);
    setSpeed(speed);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex flex-col items-center p-8 font-sans">
      <h1 className="text-4xl font-extrabold mb-8 text-yellow-400 drop-shadow-lg text-center">
        Searching & Sorting Visualizer
      </h1>

      <div className="w-full max-w-xl bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <InputArray onArraySubmit={setArray} />
      </div>

      {array && (
        <div className="w-full bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
          <AlgorithmSelector onSelect={handleAlgorithmSelect} />

          {algorithm && type && (
            <>
              <div className="text-yellow-300 text-lg font-semibold">
                Selected: <span className="text-white">{type} - {algorithm}</span>
              </div>

              <Visualizer array={array} algorithm={algorithm} type={type as "sorting" | "searching"} speed={speed}/>

            </>
          )}
        </div>
        
      )}
    </main>
  );
}
