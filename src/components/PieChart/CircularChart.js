import './CircularChart.css';

const CircularChart = (prop) => {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (prop.value / 100) * circumference;

  return (
    <div className="chart-container">
      <svg
        width={80}
        height={80}
        viewBox="0 0 120 120"
        className="circular-chart"
      >
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke={prop.color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="progress"
        />
        <defs>
          <filter id="whiteShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="white" />
          </filter>
        </defs>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          fontSize="20"
          fontWeight="bold"
          fill="#333"
          filter="url(#whiteShadow)"
        >
          {prop.value}%
        </text>
      </svg>
      <div className="chart-label">
        <span style={{ color: prop.color }}>{prop.label}</span>
      </div>
    </div>
  );
};

export default CircularChart;
