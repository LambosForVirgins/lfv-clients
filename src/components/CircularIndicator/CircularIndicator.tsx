import styles from "./CircularIndicator.module.css";
import clsx from "classnames";

interface CircularProgressProps extends Common.ComponentProps {
  label?: string | null;
  percentage: number; // Accepts percentage as a prop
  size?: number; // Optional size for the progress circle
  strokeWidth?: number; // Optional stroke width for the circle
  className?: string;
}

export const CircularProgress = ({
  testID,
  percentage,
  label,
  size = 100,
  strokeWidth = 10,
  className,
  children,
}: React.PropsWithChildren<CircularProgressProps>) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = percentage * circumference;

  return (
    <span data-testid={testID} className={clsx(className, styles.frame)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          stroke="rgba(0,0,0,0.1)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="var(--bg-red-500)"
          fill="transparent"
          strokeLinecap={"round"}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            // transform: "rotate(-90deg)",
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />
        {label && (
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={24 * (size / 100)}
            fill="rgba(0,0,0,0.8)"
            fontWeight={700}
          >
            {label}
          </text>
        )}
      </svg>
      <span className={styles.inner}>{children}</span>
    </span>
  );
};
