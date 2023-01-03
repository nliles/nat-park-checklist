import { IconProps } from './types';

const TreeIcon = ({ fill, stroke }: IconProps) => (
  <svg
    stroke={stroke}
    strokeWidth="35"
    width="40px"
    height="40px"
    version="1.1"
    viewBox="0 0 1200 1200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={fill}
      d="m557.57 1057-395.15 2.4258 436.36-1059.4 438.79 1059.4-395.15-2.4258v143.03h-84.852z"
      fillRule="evenodd"
    />
  </svg>
);

export default TreeIcon;
