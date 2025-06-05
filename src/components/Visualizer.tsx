"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface VisualizerProps {
  array: number[];
  algorithm: string;
  type: "sorting" | "searching";
  speed: number;
}

export default function Visualizer({ array, algorithm, type, speed }: VisualizerProps) {
  const [visualArray, setVisualArray] = useState<number[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [steps, setSteps] = useState(0);
  const [comparisons, setComparisons] = useState(0);
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [sorted, setSorted] = useState(false);  // Track if sorting/search finished
  const maxVal = Math.max(...visualArray);
  const maxHeightPx = 300; // max pixel height for a bar (adjust as needed)
  const scaledHeights = visualArray.map(val => (val / maxVal) * maxHeightPx);

  // Track if animation is running
  const runningRef = useRef(false);

  useEffect(() => {
    setVisualArray([...array]);
    setOriginalArray([...array]);
    setSteps(0);
    setComparisons(0);
    setSorted(false);

    if (type === "sorting") {
      runSortingAnimation(algorithm, [...array]);
    } else if (type === "searching") {
      const targetStr = prompt("Enter value to search:");
      if (targetStr !== null) {
        const target = parseInt(targetStr);
        if (!isNaN(target)) {
          runSearchingAnimation(algorithm, [...array], target);
        }
      }
    }
  }, [array, algorithm, type, speed]);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, 1000-ms));

  async function runSearchingAnimation(algo: string, arr: number[], target: number) {
    runningRef.current = true;
    setSteps(0);
    setComparisons(0);
    setSorted(false);

    switch (algo) {
      case "Linear Search":
        await linearSearch(arr, target);
        break;
      case "Binary Search":
        const sortedArr = [...arr].sort((a, b) => a - b);
        setVisualArray([...sortedArr]);
        await binarySearch(sortedArr, target);
        break;
      default:
        break;
    }
    setActiveIndices([]);
    setSorted(true);
    runningRef.current = false;
  }

  async function linearSearch(arr: number[], target: number) {
    let comps = 0;
    for (let i = 0; i < arr.length; i++) {
      setActiveIndices([i]);
      setSteps((prev) => prev + 1);
      comps++;
      setComparisons(comps);
      await delay(speed);
      if (arr[i] === target) break;
    }
  }

  async function binarySearch(arr: number[], target: number) {
    let left = 0;
    let right = arr.length - 1;
    let comps = 0;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setActiveIndices([mid]);
      setSteps((prev) => prev + 1);
      comps++;
      setComparisons(comps);
      await delay(speed);

      if (arr[mid] === target) break;
      else if (arr[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
  }

  async function runSortingAnimation(algo: string, arr: number[]) {
    runningRef.current = true;
    setSteps(0);
    setComparisons(0);
    setSorted(false);

    switch (algo) {
      case "Bubble Sort":
        await bubbleSort(arr);
        break;
      case "Insertion Sort":
        await insertionSort(arr);
        break;
      case "Merge Sort":
        await mergeSortWrapper(arr);
        break;
      case "Quick Sort":
        await quickSort(arr, 0, arr.length - 1);
        break;
      default:
        break;
    }
    setActiveIndices([]);
    setSorted(true);
    runningRef.current = false;
  }

  async function insertionSort(arr: number[]) {
    let comps = 0;
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        comps++;
        setComparisons(comps);
        setSteps((prev) => prev + 1);

        arr[j + 1] = arr[j];
        setVisualArray([...arr]);
        setActiveIndices([j, j + 1]);
        await delay(speed);
        j--;
      }
      if (j >= 0) {
        comps++;
        setComparisons(comps);
        setSteps((prev) => prev + 1);
      }
      arr[j + 1] = key;
      setVisualArray([...arr]);
      setActiveIndices([j + 1]);
      await delay(speed);
    }
  }

  async function mergeSortWrapper(arr: number[]) {
    let comps = 0;
    const incrementSteps = () => setSteps((prev) => prev + 1);
    const incrementComps = () => {
      comps++;
      setComparisons(comps);
    };

    async function mergeSort(arr: number[], l: number, r: number): Promise<void> {
      if (l >= r) return;

      const m = Math.floor((l + r) / 2);
      await mergeSort(arr, l, m);
      await mergeSort(arr, m + 1, r);
      await merge(arr, l, m, r);
    }

    async function merge(arr: number[], l: number, m: number, r: number) {
      const left = arr.slice(l, m + 1);
      const right = arr.slice(m + 1, r + 1);
      let i = 0,
        j = 0,
        k = l;

      while (i < left.length && j < right.length) {
        incrementComps();
        incrementSteps();
        arr[k] = left[i] <= right[j] ? left[i++] : right[j++];
        setVisualArray([...arr]);
        setActiveIndices([k]);
        await delay(speed);
        k++;
      }

      while (i < left.length) {
        incrementSteps();
        arr[k++] = left[i++];
        setVisualArray([...arr]);
        await delay(speed);
      }

      while (j < right.length) {
        incrementSteps();
        arr[k++] = right[j++];
        setVisualArray([...arr]);
        await delay(speed);
      }
    }

    await mergeSort(arr, 0, arr.length - 1);
  }

  async function quickSort(arr: number[], low: number, high: number) {
    let comps = 0;
    const incrementSteps = () => setSteps((prev) => prev + 1);
    const incrementComps = () => {
      comps++;
      setComparisons((prev) => prev + 1);
    };

    async function partition(arr: number[], low: number, high: number) {
      const pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        setActiveIndices([j, high]);
        incrementSteps();
        incrementComps();
        await delay(speed);
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setVisualArray([...arr]);
          await delay(speed);
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      setVisualArray([...arr]);
      await delay(speed);
      return i + 1;
    }

    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  }

  async function bubbleSort(arr: number[]) {
    let comps = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        setSteps((prev) => prev + 1);
        comps++;
        setComparisons(comps);
        await delay(speed);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setVisualArray([...arr]);
          await delay(speed);
        }
      }
    }
}

  // Reset handler
  function handleReset() {
    if (runningRef.current) return;
    setVisualArray([...originalArray]);
    setSteps(0);
    setComparisons(0);
    setActiveIndices([]);
    setSorted(false);
  }

  return (
    <div className="w-full">
      {/* Bars container */}
      <div className="w-full overflow-x-auto overflow-y-hidden flex items-end justify-center pt-24 gap-1 max-h-[320px] px-2">
        {visualArray.map((value, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0.8 }}
            animate={{
              height: `${scaledHeights[index]}px`,
              backgroundColor: activeIndices.includes(index) ? "#FACC15" : "#4B5563", // Tailwind yellow-400 or gray-600
              scale: sorted
                ? [1, 1.05, 1]
                : activeIndices.includes(index)
                ? 1.1
                : 1,
              boxShadow: sorted
                ? "0 0 12px #FACC15"
                : activeIndices.includes(index)
                ? "0 0 8px #FACC15"
                : "none",
              opacity: 1,
            }}
            transition={{
              scale: sorted
                ? { repeat: Infinity, repeatType: "mirror", duration: 1.5 }
                : { type: "spring", stiffness: 300, damping: 30 },
              boxShadow: { duration: 0.3 },
              height: { type: "spring", stiffness: 300, damping: 30 },
              backgroundColor: { duration: 0.3 },
            }}
            className="flex items-end justify-center rounded-md text-white font-semibold shadow-md mx-1 select-none"
            style={{
              minWidth: "8px",
              height: `${scaledHeights[index]}px`,
              flexShrink: 0,
            }}
          >
            <span className="pb-1 text-sm">{value}</span>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="flex justify-center pt-4 gap-8 text-yellow-400 font-semibold text-lg">
        <div>Steps: {steps}</div>
        <div>Comparisons: {comparisons}</div>
      </div>
    </div>
  );
}
