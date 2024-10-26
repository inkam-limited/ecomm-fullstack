import React from "react";

interface DigigoLogoProps {
  width?: number;
  height?: number;
  className?: string;
  showAnimation?: boolean;
}

const DigigoLogo: React.FC<DigigoLogoProps> = ({
  width = 400,
  height = 200,
  className,
  showAnimation = true,
}) => {
  return (
    <svg
      viewBox="0 0 400 200"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lightGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6B8DFF" />
          <stop offset="100%" stopColor="#8B9FFF" />
        </linearGradient>
        <linearGradient id="lightGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF8BA7" />
          <stop offset="100%" stopColor="#FFA7BA" />
        </linearGradient>
        {showAnimation && (
          <animate
            xlinkHref="#main-shape"
            attributeName="opacity"
            values="0.9;1;0.9"
            dur="4s"
            repeatCount="indefinite"
          />
        )}
      </defs>

      {/* Clean white background */}
      <rect x="0" y="0" width="400" height="200" fill="#FFFFFF" />

      {/* Main geometric element */}
      <g id="main-shape" transform="translate(80, 50)">
        {/* Simple geometric composition */}
        <path
          d="M0 20 L25 0 L50 20 L25 40 Z"
          fill="url(#lightGradient1)"
          opacity="0.9"
        />

        {/* Complementary shape */}
        <circle
          cx="70"
          cy="20"
          r="15"
          fill="url(#lightGradient2)"
          opacity="0.85"
        />
      </g>

      {/* Logo text with modern clean font */}
      <text
        x="200"
        y="130"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontSize="56"
        fontWeight="600"
        letterSpacing="1"
      >
        <tspan fill="#2D3436">digi</tspan>
        <tspan fill="url(#lightGradient1)">go</tspan>
      </text>
    </svg>
  );
};

export default DigigoLogo;
