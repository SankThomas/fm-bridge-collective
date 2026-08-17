import { useCountUp } from "../hooks/useCountUp";

export default function ImpactCard({ stat, index, visible }) {
  const display = useCountUp(stat.value, stat.decimals, stat.suffix, visible);

  return (
    <article className="impact-card">
      <div className="card-top">
        <span className={`card-icon ${stat.iconClass}`}>{stat.icon}</span>
        <strong className="stat-value">{display}</strong>
      </div>

      <div className="card-copy">
        <h2>{stat.title}</h2>
        <p>{stat.description}</p>
      </div>
    </article>
  );
}
