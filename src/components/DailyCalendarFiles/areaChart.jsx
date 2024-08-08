import React, { useEffect, useState } from 'react';

// Function to lighten the color
const lightenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)}`;
};

const RadialBar = ({ value, label, color }) => {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);
  const lightColor = lightenColor(color, 20); // Lighten the color by 20%

  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setOffset(circumference - (value / 100) * circumference);
    });
    return () => cancelAnimationFrame(animation);
  }, [circumference, value]);

  return (
    <div className="bg-white shadow rounded-full aspect-w-1 aspect-h-1 w-full max-w-xs mx-auto relative flex items-center justify-center">
      <div className="relative flex flex-col items-center justify-center">
        <svg
          className="rotate-[-90deg] w-full h-full"
          viewBox="0 0 150 150"
          onMouseEnter={(e) => {
            e.currentTarget.querySelectorAll('circle')[1].style.stroke = lightColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.querySelectorAll('circle')[1].style.stroke = color;
          }}
        >
          <circle
            cx="75"
            cy="75"
            r={radius}
            stroke="#e6e6e6"
            strokeWidth="4" // Thinner outline for background circle
            fill="none"
          />
          <circle
            cx="75"
            cy="75"
            r={radius}
            stroke={color}
            strokeWidth="4" // Thinner outline for progress circle
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-stroke duration-200 ease-in-out"
            style={{
              transition: 'stroke-dashoffset 1s ease-out, stroke 0.2s ease-in-out',
            }}
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <div className="text-black font-bold text-2xl">{value}%</div>
          <div className="text-gray-500 mt-1">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default RadialBar;
