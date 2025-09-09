"use client";
import React, { useEffect, useState } from "react";

const MinecraftSnow = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const createSnowflake = (id) => {
      // Start anywhere at the top, will drift to sides as it falls
      const x = Math.random() * 100;

      // 4 different snowflake patterns
      const patterns = [
        "single", // Single pixel
        "corners", // 1,3,7,9 (corners)
        "edges", // 2,4,6,8 (edges)
        "cross", // 2,4,5,6,8 (cross pattern)
      ];

      const pattern = patterns[Math.floor(Math.random() * patterns.length)];

      return {
        id,
        x, // Start anywhere at top
        y: Math.random() * -15, // Start slightly above viewport for staggered entrance
        pattern, // Snowflake pattern type
        speed: Math.random() * 0.05 + 0.02, // Fall speed
        drift: Math.random() * 0.08 - 0.04, // Horizontal drift
      };
    };

    // Create initial snowflakes
    const initialSnowflakes = Array.from({ length: 65 }, (_, i) => ({
      ...createSnowflake(i),
      y: Math.random() * 100, // Spread them across viewport initially
    }));

    setSnowflakes(initialSnowflakes);

    const animationLoop = () => {
      setSnowflakes((prevSnowflakes) =>
        prevSnowflakes.map((snowflake) => {
          // Graceful speed reduction - starts slowing down around 20% fall progress
          const fallProgress = snowflake.y / 100; // 0 to 1 as it falls
          let speedMultiplier = 1;

          if (fallProgress > 0.2) {
            // Gradually reduce speed after 20% fall (before about section)
            speedMultiplier = Math.max(0.3, 1 - (fallProgress - 0.2) * 0.8);
          }

          let newY = snowflake.y + snowflake.speed * speedMultiplier;
          let newX = snowflake.x + snowflake.drift;

          // Reset if snowflake goes off bottom of viewport
          if (newY > 100) {
            const resetSnowflake = createSnowflake(snowflake.id);
            // Add slight delay variation to create more uniform spawning
            resetSnowflake.y = Math.random() * -20; // Start slightly above screen
            return resetSnowflake;
          }
          // Remove snowflakes that drift off sides instead of wrapping
          if (newX > 100 || newX < 0) {
            const resetSnowflake = createSnowflake(snowflake.id);
            resetSnowflake.y = Math.random() * -20; // Start slightly above screen
            return resetSnowflake;
          }

          return {
            ...snowflake,
            x: newX,
            y: newY,
          };
        }),
      );
    };

    const interval = setInterval(animationLoop, 16); // ~60fps for fluid movement
    return () => clearInterval(interval);
  }, []);

  const renderSnowflake = (snowflake) => {
    const pixelSize = 4; // Individual pixel size
    const baseStyle = {
      position: "absolute",
      left: `${snowflake.x}%`,
      top: `${snowflake.y}%`,
      width: `${pixelSize * 3}px`,
      height: `${pixelSize * 3}px`,
    };

    if (snowflake.pattern === "single") {
      return (
        <div
          key={snowflake.id}
          className="absolute bg-white opacity-70"
          style={{
            left: `${snowflake.x}%`,
            top: `${snowflake.y}%`,
            width: `${pixelSize * 2}px`,
            height: `${pixelSize * 2}px`,
          }}
        />
      );
    }

    const getPixelStyle = (position) => ({
      position: "absolute",
      width: `${pixelSize}px`,
      height: `${pixelSize}px`,
      backgroundColor: "white",
      opacity: 0.7,
      left: `${((position - 1) % 3) * pixelSize}px`,
      top: `${Math.floor((position - 1) / 3) * pixelSize}px`,
    });

    let activePositions = [];
    if (snowflake.pattern === "corners") activePositions = [1, 3, 5, 7, 9]; // Corners + center
    if (snowflake.pattern === "edges") activePositions = [2, 4, 6, 8];
    if (snowflake.pattern === "cross") activePositions = [2, 4, 5, 6, 8];

    return (
      <div key={snowflake.id} style={baseStyle}>
        {activePositions.map((pos) => (
          <div key={pos} style={getPixelStyle(pos)} />
        ))}
      </div>
    );
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ minHeight: "100%" }}
    >
      {snowflakes.map(renderSnowflake)}
    </div>
  );
};

export default MinecraftSnow;
