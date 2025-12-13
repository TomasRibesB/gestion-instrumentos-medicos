'use client';

import { Box, Truck, CheckCircle, RotateCcw, AlertCircle } from 'lucide-react';

const KITS = [
  { id: 1, name: 'Kit Cadera #45', type: 'Prótesis', status: 'In Transit', location: 'Sanatorio Central', lastUpdate: 'Hoy 09:00' },
  { id: 2, name: 'Caja Trauma A', type: 'Instrumental', status: 'Returned', location: 'Recepción', lastUpdate: 'Ayer 14:30' },
  { id: 3, name: 'Kit Suturas C', type: 'Insumos', status: 'Available', location: 'Almacén', lastUpdate: '10/12/2023' },
  { id: 4, name: 'Kit Rodilla #12', type: 'Prótesis', status: 'Delivered', location: 'Hosp. Italiano', lastUpdate: 'Hace 2 horas' },
  { id: 5, name: 'Caja Básica #05', type: 'Instrumental', status: 'Prepared', location: 'Logística', lastUpdate: 'Hace 30 min' },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Available': return { color: '#16a34a', bg: '#dcfce7', label: 'Disponible', icon: CheckCircle };
    case 'In Transit': return { color: '#0ea5e9', bg: '#e0f2fe', label: 'En Tránsito', icon: Truck };
    case 'Delivered': return { color: '#2563eb', bg: '#dbeafe', label: 'Entregado', icon: Box };
    case 'Returned': return { color: '#d97706', bg: '#fef3c7', label: 'Devuelto', icon: RotateCcw };
    case 'Prepared': return { color: '#7c3aed', bg: '#ede9fe', label: 'Preparado', icon: Box };
    default: return { color: '#64748b', bg: '#f1f5f9', label: status, icon: AlertCircle };
  }
};

export default function KitList() {
  return (
    <div className="card" style={{ padding: 0 }}>
      {KITS.map((kit, index) => {
        const badge = getStatusBadge(kit.status);
        const Icon = badge.icon;
        
        return (
          <div key={kit.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '1.5rem',
            borderBottom: index < KITS.length - 1 ? '1px solid var(--border-color)' : 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: '#f8fafc', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: '1px solid var(--border-color)'
              }}>
                <Box size={24} color="var(--text-secondary)" />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{kit.name}</h3>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{kit.type} • {kit.location}</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Última act.</div>
                <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{kit.lastUpdate}</div>
              </div>
              
              <div className="badge" style={{ 
                background: badge.bg, 
                color: badge.color, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.25rem',
                padding: '0.5rem 0.75rem'
              }}>
                <Icon size={14} />
                {badge.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
