import React from 'react';

export default function Logo({ width = '67', height = '78' }) {
  return (
    <svg width={width} height={height} viewBox="0 0 118 107" fill="none">
      <path
        d="M55.2434 21.7663L104.423 46.4928L61.2944 38.0158L44.9723 94.2431L28.5964 34.4007L12.7731 40.064L31.6418 26.4041L44.7873 75.9603L55.2434 21.7663Z"
        fill="#4A4A4A"
        fill-opacity="0.8"
      />
      <path
        d="M53.5174 19.0695L101.14 46.6761L58.5916 35.65L38.9555 90.8075L26.1664 30.0973L11.8474 39.3916L29.6818 22.2959L39.8578 72.546L53.5174 19.0695Z"
        fill="url(#paint0_linear)"
        fill-opacity="0.8"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="39.3016"
          y1="20.9937"
          x2="86.3836"
          y2="30.38"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0.24" />
        </linearGradient>
      </defs>
    </svg>
  );
}
