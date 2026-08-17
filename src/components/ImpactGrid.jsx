import { useEffect, useRef, useState } from "react";
import ImpactCard from "./ImpactCard.jsx";

export default function ImpactGrid() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/stats.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setStats(data.stats);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!stats || !gridRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(gridRef.current);

    return () => observer.disconnect();
  }, [stats]);

  return (
    <section
      className="impact-grid"
      id="impact"
      aria-label="Our impact"
      aria-busy={!stats && !error}
      ref={gridRef}
    >
      {error && <p className="stats-error">Stats unavailable</p>}
      {stats &&
        stats.map((stat, index) => (
          <ImpactCard
            key={stat.title}
            stat={stat}
            index={index}
            visible={visible}
          />
        ))}
    </section>
  );
}
