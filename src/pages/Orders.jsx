import { useEffect, useState } from 'react';
import { getAllOrders } from '../api/client';
import StatusBadge from '../components/StatusBadge';
import socket from '../socket';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () => getAllOrders().then(({ data }) => setOrders(data.orders)).finally(() => setLoading(false));

  useEffect(() => {
    loadOrders();
    socket.on('new_order_placed', loadOrders);
    socket.on('order_status_changed', loadOrders);
    return () => {
      socket.off('new_order_placed', loadOrders);
      socket.off('order_status_changed', loadOrders);
    };
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-6">Orders</h1>

      {loading && <p className="font-body text-clay text-sm">Loading…</p>}

      <div className="bg-white rounded-lg border border-clay/15 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate text-left">
            <tr className="font-body text-xs text-clay uppercase">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Partner</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Placed</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-clay/10 font-body">
                <td className="px-4 py-3 font-mono text-ink">#{order.id}</td>
                <td className="px-4 py-3 text-ink">{order.customer_name || '—'}</td>
                <td className="px-4 py-3 text-ink">{order.delivery_partner_name || '—'}</td>
                <td className="px-4 py-3 font-mono text-ink">₹{Number(order.total_amount).toFixed(0)}</td>
                <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                <td className="px-4 py-3 text-clay text-xs">
                  {new Date(order.created_at).toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && orders.length === 0 && (
          <p className="font-body text-clay text-sm p-6 text-center">No orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
