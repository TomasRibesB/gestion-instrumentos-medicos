'use client';

import { FileText, MoreHorizontal, Filter, Download } from 'lucide-react';
import { useState } from 'react';

const INVOICES = [
  { id: 'FC-0001', client: 'OSDE', type: 'Obra Social', date: '2023-11-10', due: '2023-12-10', amount: '$ 1,200,000', status: 'Overdue' },
  { id: 'FC-0002', client: 'Hospital Público Central', type: 'Público', date: '2023-12-01', due: '2024-06-01', amount: '$ 5,000,000', status: 'Pending' },
  { id: 'FC-0003', client: 'Swiss Medical', type: 'Obra Social', date: '2023-12-05', due: '2024-01-05', amount: '$ 850,000', status: 'Sent' },
  { id: 'FC-0004', client: 'Clínica San Lucas', type: 'Privado', date: '2023-12-08', due: '2023-12-23', amount: '$ 450,000', status: 'Draft' },
  { id: 'FC-0005', client: 'IOMA', type: 'Obra Social', date: '2023-10-15', due: '2023-11-15', amount: '$ 2,100,000', status: 'Paid' },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Paid': return { bg: '#dcfce7', color: '#16a34a', label: 'Pagado' };
    case 'Pending': return { bg: '#e0f2fe', color: '#0ea5e9', label: 'Pendiente' };
    case 'Sent': return { bg: '#ede9fe', color: '#7c3aed', label: 'Enviada' };
    case 'Draft': return { bg: '#f1f5f9', color: '#64748b', label: 'Borrador' };
    case 'Overdue': return { bg: '#fee2e2', color: '#dc2626', label: 'Vencida' };
    default: return { bg: '#f1f5f9', color: '#64748b', label: status };
  }
};

export default function InvoiceTable() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? INVOICES : INVOICES.filter(i => i.status === filter);

  return (
    <div className="card" style={{ padding: 0 }}>
      {/* Filters Toolbar */}
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
          <button className="btn" style={{ background: '#f8fafc', border: '1px solid var(--border-color)' }}>
            <Filter size={16} /> Todos
          </button>
          <button className="btn" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
            Obras Sociales
          </button>
          <button className="btn" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
            Públicos
          </button>
        </div>
        <button className="btn" style={{ color: 'var(--primary)' }}>
          <Download size={16} /> Exportar
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
        <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
          <tr>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Comprobante</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Cliente</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Emisión / Venc.</th>
            <th style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, color: 'var(--text-secondary)' }}>Importe</th>
            <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: 'var(--text-secondary)' }}>Estado</th>
            <th style={{ padding: '1rem' }}></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((inv) => {
            const status = getStatusStyle(inv.status);
            return (
              <tr key={inv.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem', fontWeight: 500 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={16} color="var(--text-secondary)" />
                    {inv.id}
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 500 }}>{inv.client}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{inv.type}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div>{inv.date}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Vence: {inv.due}</div>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600 }}>{inv.amount}</td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <span className="badge" style={{ background: status.bg, color: status.color }}>
                    {status.label}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <button className="btn" style={{ padding: '0.25rem' }}>
                    <MoreHorizontal size={16} color="var(--text-secondary)" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
