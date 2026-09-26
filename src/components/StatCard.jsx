const StatCard = ({ label, value, accent }) => (
  <div className="bg-white rounded-lg p-5 border border-clay/15">
    <p className="font-body text-xs text-clay uppercase tracking-wide mb-2">{label}</p>
    <p className={`font-display text-3xl ${accent || 'text-ink'}`}>{value}</p>
  </div>
);

export default StatCard;
