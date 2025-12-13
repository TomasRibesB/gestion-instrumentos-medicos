'use client';

import { MoreHorizontal, Building, Phone, Mail } from 'lucide-react';

const CLIENTS = [
  { id: 1, name: 'OSDE', type: 'Obra Social', term: '30 días', contact: 'Juan Pérez', email: 'finanzas@osde.com.ar' },
  { id: 2, name: 'Hospital Italiano', type: 'Privado', term: '45 días', contact: 'Maria Garcia', email: 'compras@hospitalitaliano.org.ar' },
  { id: 3, name: 'IOMA', type: 'Obra Social', term: '90 días', contact: 'Carlos Lopez', email: 'pagos@ioma.gba.gob.ar' },
  { id: 4, name: 'Ministerio de Salud', type: 'Público', term: '180 días', contact: 'Administración', email: 'admin@msal.gob.ar' },
  { id: 5, name: 'Swiss Medical', type: 'Obra Social', term: '30 días', contact: 'Ana Roberts', email: 'ana.roberts@swissmedical.com.ar' },
];

export default function ClientTable() {
  return (
    <div className="card" style={{ padding: 0 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
        <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
          <tr>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Cliente</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Tipo</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Plazo Pago</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Contacto</th>
            <th style={{ padding: '1rem' }}></th>
          </tr>
        </thead>
        <tbody>
          {CLIENTS.map((client) => (
            <tr key={client.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem' }}>
                <div style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Building size={16} color="var(--text-secondary)" />
                  {client.name}
                </div>
              </td>
              <td style={{ padding: '1rem' }}>{client.type}</td>
              <td style={{ padding: '1rem' }}>
                <span className="badge" style={{ background: '#f1f5f9', color: 'var(--text-secondary)' }}>
                  {client.term}
                </span>
              </td>
              <td style={{ padding: '1rem' }}>
                <div>{client.contact}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                  <Mail size={12} /> {client.email}
                </div>
              </td>
              <td style={{ padding: '1rem', textAlign: 'center' }}>
                <button className="btn" style={{ padding: '0.25rem' }}>
                  <MoreHorizontal size={16} color="var(--text-secondary)" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
