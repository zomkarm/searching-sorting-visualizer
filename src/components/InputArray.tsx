"use client";

import React, { useState } from "react";

interface InputArrayProps {
  onArraySubmit: (array: number[]) => void;
}

export default function InputArray({ onArraySubmit }: InputArrayProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const handlePopulate = () => {
    const randomArray = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 1);
    const arrayAsString = randomArray.join(',');
    setInputValue(arrayAsString);
  }
  const handleSubmit = () => {
    const parts = inputValue.split(",").map(str => str.trim());
    const numbers = parts.map(Number);

    if (numbers.some(isNaN)) {
      setError("Please enter only comma-separated numbers.");
      return;
    }

    setError("");
    onArraySubmit(numbers);
  };

  return (
    <div style={{ marginBottom: "1rem"}}>
      <label htmlFor="arrayInput">Enter array (comma separated):</label><br />
      <input
        id="arrayInput"
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        style={{ padding: "0.5rem", width: "300px", marginRight: "0.5rem" }}
        className="border border-yellow-400"
        placeholder="e.g. 5,3,8,1"
      />
      <button onClick={handlePopulate} className="border border-yellow-400 rounded-lg p-2">Populate</button>
      <button onClick={handleSubmit} className="border border-yellow-400 rounded-lg p-2">Submit</button>
      {error && <div style={{ color: "red", marginTop: "0.5rem" }}>{error}</div>}
    </div>
  );
}
