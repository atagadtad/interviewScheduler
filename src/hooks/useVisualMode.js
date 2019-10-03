import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const mode = history[history.length - 1];

  function transition(newMode, replace = false) {
    console.log("mode now: ", newMode);
    if (!replace) {
      setHistory(prev => [...prev, newMode]);
    } else {
      setHistory(prev => [...prev.slice(0, prev.length - 1), newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, prev.length - 1));
    }
  }

  return { mode, transition, back };
}
