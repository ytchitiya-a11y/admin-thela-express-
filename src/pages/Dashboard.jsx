import { useEffect, useState } from 'react';
import { getStats } from '../api/client';
import StatCard from '../components/StatCard';
import socket from '../socket';

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  const loadStats = () => getStats().then(({ data }) => setStats(data.stats)).catch(() => {});

  useEffect(() => {
    loadStats();
    // Refresh stats live whenever any order event fires
    socket.on('new_order_placed', loadStats);
    socket.on('order_status_changed', loadStats);
    return () => {
      socket.off('new_order_placed', loadStats);
      socket.off('order_status_changed', loadStats);
    };
  }, []);

  if (!stats) return <p className="font-body text-clay">Loading stats…</p>;

  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard label="Total Orders" value={stats.totalOrders} />
        <StatCard label="Pending" value={stats.pendingOrders} accent="text-saffron" />
        <StatCard label="Delivered Today" value={stats.deliveredToday} accent="text-chutney" />
        <StatCard label="Active Partners" value={stats.activePartners} />
        <StatCard label="Revenue Today" value={`₹${stats.revenueToday}`} accent="text-chili" />
      </div>
      <p className="font-body text-xs text-clay mt-6">Stats update live as new orders come in.</p>
    </div>
  );
};

export default Dashboard;
