import { useEffect, useState } from 'react';
import { getAllDeliveryPartners } from '../api/client';

const statusColor = {
  available: 'bg-chutney/20 text-chutney',
  busy: 'bg-saffron/20 text-clay',
  offline: 'bg-clay/10 text-clay',
};

const DeliveryPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllDeliveryPartners().then(({ data }) => setPartners(data.partners)).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-6">Delivery Partners</h1>

      {loading && <p className="font-body text-clay text-sm">Loading…</p>}

      <div className="bg-white rounded-lg border border-clay/15 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate text-left">
            <tr className="font-body text-xs text-clay uppercase">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Vehicle</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((p) => (
              <tr key={p.id} className="border-t border-clay/10 font-body">
                <td className="px-4 py-3 text-ink">{p.name}</td>
                <td className="px-4 py-3 text-ink font-mono text-xs">{p.phone}</td>
                <td className="px-4 py-3 text-ink capitalize">{p.vehicle_type}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase ${statusColor[p.status] || 'bg-clay/10 text-clay'}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && partners.length === 0 && (
          <p className="font-body text-clay text-sm p-6 text-center">No delivery partners yet.</p>
        )}
      </div>
    </div>
  );
};

export default DeliveryPartners;
