"use client";

import React, { useState } from "react";

type AlgorithmType = "sorting" | "searching";

interface AlgorithmSelectorProps {
  onSelect: (type: AlgorithmType, algorithm: string) => void;
}

const sortingAlgorithms = ["Bubble Sort", "Insertion Sort", "Merge Sort", "Quick Sort"];
const searchingAlgorithms = ["Linear Search", "Binary Search"];

export default function AlgorithmSelector({ onSelect }: AlgorithmSelectorProps) {
  const [type, setType] = useState<AlgorithmType>("sorting");
  const [algorithm, setAlgorithm] = useState("");
  const [speed, setSpeed] = useState(300);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as AlgorithmType;
    if(newType === "sorting"){
      alert("Select a algorithm !");
    }
    setType(newType);
    setAlgorithm(""); // reset selected algorithm
  };

  const handleSubmit = () => {
    if (algorithm) {
      onSelect(type, algorithm, speed);
    }
  };

  const availableAlgorithms = type === "sorting" ? sortingAlgorithms : searchingAlgorithms;

  return (
    <div style={{ marginTop: "1rem"}}>
      <label>
        Type:
        <select value={type} onChange={handleTypeChange} style={{ margin: "0 1rem" }} className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
>
          <option value="sorting">Sorting</option>
          <option value="searching">Searching</option>
        </select>
      </label>

      <label>
        Algorithm:
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          style={{ margin: "0 1rem" }} className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Select algorithm</option>
          {availableAlgorithms.map((algo) => (
            <option key={algo} value={algo}>{algo}</option>
          ))}
        </select>
      </label>


    <input type="range" min={50} max={1000} step={50} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
    <span>Speed: {speed}ms</span>

      <button onClick={handleSubmit} className=" border border-yellow-400 rounded-lg m-2 p-2" disabled={!algorithm}>Visualize</button>
    </div>
  );
}
