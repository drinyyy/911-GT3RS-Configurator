import React, { useState, useEffect } from 'react';
import { useProgress } from "@react-three/drei";

export const LoadingScreen = () => {
  const { progress } = useProgress();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      // Automatically trigger the move-up animation after a short delay
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 500); // Slight delay to ensure smooth transition

      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className={`loadingScreen ${isLoaded ? "loadingScreen--loaded" : ""}`}>
      <div className="loadingScreen__progress">
        <div
          className="loadingScreen__progress__value"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
      <div className="loadingScreen__board">
        <h1 className="loadingScreen__title">911 GT3 RS</h1>
        <h2 className="loadingScreen__author">Drin Lajci</h2>
      </div>
    </div>
  );
};