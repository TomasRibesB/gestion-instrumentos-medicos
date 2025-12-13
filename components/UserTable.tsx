'use client';

import { MoreHorizontal, Shield } from 'lucide-react';

const USERS = [
  { id: 1, name: 'Juan Director', email: 'juan@empresa.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Maria Logistica', email: 'maria@empresa.com', role: 'Logistics', status: 'Active' },
  { id: 3, name: 'Pedro Ventas', email: 'pedro@empresa.com', role: 'Billing', status: 'Active' },
  { id: 4, name: 'Sofia Stock', email: 'sofia@empresa.com', role: 'Stock', status: 'Active' },
];

export default function UserTable() {
  return (
    <div className="card" style={{ padding: 0 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
        <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
          <tr>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Usuario</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Email</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Rol</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Estado</th>
            <th style={{ padding: '1rem' }}></th>
          </tr>
        </thead>
        <tbody>
          {USERS.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem', fontWeight: 500 }}>{user.name}</td>
              <td style={{ padding: '1rem' }}>{user.email}</td>
              <td style={{ padding: '1rem' }}>
                <span className="badge" style={{ background: '#ede9fe', color: '#7c3aed', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Shield size={12} /> {user.role}
                </span>
              </td>
              <td style={{ padding: '1rem' }}>
                <span className="badge" style={{ background: '#dcfce7', color: '#16a34a' }}>{user.status}</span>
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
