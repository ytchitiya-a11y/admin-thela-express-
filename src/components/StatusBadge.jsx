const styles = {
  pending: 'bg-clay/15 text-clay',
  assigned: 'bg-saffron/20 text-clay',
  accepted: 'bg-saffron/20 text-clay',
  picked_up: 'bg-saffron/30 text-ink',
  delivered: 'bg-chutney/20 text-chutney',
  cancelled: 'bg-chili/15 text-chili',
};

const StatusBadge = ({ status }) => (
  <span className={`inline-block px-2.5 py-1 rounded-full font-body text-xs font-medium uppercase ${styles[status] || 'bg-clay/10 text-clay'}`}>
    {status?.replace('_', ' ')}
  </span>
);

export default StatusBadge;
