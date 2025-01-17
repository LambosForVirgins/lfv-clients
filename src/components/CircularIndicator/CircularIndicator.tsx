interface CircularProgressProps {
  percentage: number; // Accepts percentage as a prop
  size?: number; // Optional size for the progress circle
  strokeWidth?: number; // Optional stroke width for the circle
  className?: string;
}

export const CircularProgress = ({
  percentage,
  size = 100,
  strokeWidth = 10,
  className,
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = percentage * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      <circle
        stroke="rgba(0,0,0,0.25)"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        stroke="var(--yellow-600)"
        fill="transparent"
        strokeLinecap={"round"}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        r={radius}
        cx={size / 2}
        cy={size / 2}
        style={{
          transition: "stroke-dashoffset 0.5s ease",
        }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={24 * (size / 100)}
        fill="rgba(0,0,0,0.8)"
        fontWeight={700}
      >
        {`${Math.ceil(percentage * 1000) / 10}%`}
      </text>
    </svg>
  );
};
