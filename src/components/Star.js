export default function Star({ rating }) {
  // rating: "4" or "5"
  const fillPercent = rating === "5" ? "100%" : "75%";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-5 h-5"
    >
      <defs>
        <linearGradient
          id={`star-fill-${rating}`}
          x1="0%"
          x2="100%"
          y1="0%"
          y2="0%"
        >
          <stop offset={fillPercent} stopColor="#facc15" /> {/* gold */}
          <stop offset={fillPercent} stopColor="#374151" /> {/* gray */}
        </linearGradient>
      </defs>
      <polygon
        fill={`url(#star-fill-${rating})`}
        points="12 2 15.09 8.26 22 9.27 17 14.14 
                18.18 21.02 12 17.77 5.82 21.02 
                7 14.14 2 9.27 8.91 8.26 12 2"
      />
    </svg>
  );
}
