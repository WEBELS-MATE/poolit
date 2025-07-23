type ButtonProps = {
  text: string;
  width: string;
  onClick?: () => void;
};
export default function Button({ text, width }: ButtonProps) {
  return (
    <button>
      <svg
        width={width}
        height="94"
        viewBox="0 0 674 94"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_113_57)">
          <mask id="path-1-inside-1_113_57" fill="white">
            <path d="M667 30.3555V83H7V29.7764L33.7764 3H639.645L667 30.3555Z" />
          </mask>
          <path
            d="M667 30.3555H671V28.6986L669.828 27.527L667 30.3555ZM667 83V87H671V83H667ZM7 83H3V87H7V83ZM7 29.7764L4.17157 26.9479L3 28.1195V29.7764H7ZM33.7764 3V-1H32.1195L30.9479 0.171573L33.7764 3ZM639.645 3L642.473 0.171573L641.301 -1H639.645V3ZM667 30.3555H663V83H667H671V30.3555H667ZM667 83V79H7V83V87H667V83ZM7 83H11V29.7764H7H3V83H7ZM7 29.7764L9.82843 32.6048L36.6048 5.82843L33.7764 3L30.9479 0.171573L4.17157 26.9479L7 29.7764ZM33.7764 3V7H639.645V3V-1H33.7764V3ZM639.645 3L636.816 5.82843L664.172 33.1839L667 30.3555L669.828 27.527L642.473 0.171573L639.645 3Z"
            fill="#BA2685"
            mask="url(#path-1-inside-1_113_57)"
          />
        </g>

        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="32"
          fontWeight="bold"
          fontFamily="sans-serif"
          fill="#BA2685"
        >
          {text}
        </text>

        <defs>
          <filter
            id="filter0_d_113_57"
            x="0.2"
            y="0.2"
            width="673.6"
            height="93.6"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="3.4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.952941 0 0 0 0 0.419608 0 0 0 0 0.670588 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_113_57"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_113_57"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </button>
  );
}
