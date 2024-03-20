const Close = ({
  size = 30,
  strokeWidth = "1.5",
  color = "#000000",
}: {
  size?: number;
  strokeWidth?: string;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.5 5.5l-14 14M19.5 19.5l-14-14"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
  </svg>
);

export default Close;
