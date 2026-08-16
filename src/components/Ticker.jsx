import "./Ticker.css";

const ITEMS = ["JAVA  ", "DSA", "CYBERSECURITY", "LINUX", "WEB DEVELOPMENT", "VIBE CODER"];

export default function Ticker() {
  const loopItems = [...ITEMS, ...ITEMS];

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker__track">
        {loopItems.map((item, i) => (
          <span className="ticker__item" key={i}>
            {item} <span className="ticker__dot">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
