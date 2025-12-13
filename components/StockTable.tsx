'use client';

import { useState } from 'react';
import { Search, Filter, MoreHorizontal, AlertTriangle, ArrowUpDown, Plus } from 'lucide-react';
import styles from './StockTable.module.css';

const DUMMY_STOCK = [
  { id: 1, name: 'Tornillos Titanio 3.5mm', category: 'Traumatología', stock: 350, min: 100, location: 'Rack A1', status: 'OK' },
  { id: 2, name: 'Placa Tibia Distal LCP', category: 'Traumatología', stock: 45, min: 50, location: 'Rack A2', status: 'LOW' },
  { id: 3, name: 'Sutura Vicryl 3-0', category: 'Suturas', stock: 500, min: 200, location: 'Cajón B1', status: 'OK' },
  { id: 4, name: 'Guantes Estériles 7.5', category: 'Descartables', stock: 1200, min: 500, location: 'Almacén', status: 'OK' },
  { id: 5, name: 'Clavo Intramedular Femoral', category: 'Traumatología', stock: 12, min: 15, location: 'Rack A3', status: 'LOW' },
  { id: 6, name: 'Malla Quirúrgica 15x15', category: 'General', stock: 80, min: 30, location: 'Cajón C2', status: 'OK' },
  { id: 7, name: 'Bisturí Hoja 24', category: 'Descartables', stock: 200, min: 100, location: 'Estante D1', status: 'OK' },
];

export default function StockTable() {
  const [filter, setFilter] = useState('');

  const filteredData = DUMMY_STOCK.filter(item => 
    item.name.toLowerCase().includes(filter.toLowerCase()) || 
    item.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Buscar insumo..." 
            className="form-input"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.5rem 1rem 0.5rem 2.5rem', 
              borderRadius: 'var(--radius)', 
              border: '1px solid var(--border-color)',
              fontSize: '0.875rem'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
            <Filter size={16} />
            <span>Filtros</span>
          </button>
          <button className="btn btn-primary">
            <Plus size={16} />
            <span>Nuevo Item</span>
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
            <tr>
              <th className={styles.th} style={{ textAlign: 'left', padding: '1rem' }}>Item / Descripción</th>
              <th className={styles.th} style={{ textAlign: 'left', padding: '1rem' }}>Categoría</th>
              <th className={styles.th} style={{ textAlign: 'right', padding: '1rem' }}>Stock Actual</th>
              <th className={styles.th} style={{ textAlign: 'left', padding: '1rem' }}>Ubicación</th>
              <th className={styles.th} style={{ textAlign: 'center', padding: '1rem' }}>Estado</th>
              <th className={styles.th} style={{ padding: '1rem' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 500 }}>{item.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Min: {item.min}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.5rem', 
                    background: '#f1f5f9', 
                    borderRadius: '4px', 
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)'
                  }}>
                    {item.category}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600 }}>{item.stock}</td>
                <td style={{ padding: '1rem' }}>{item.location}</td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  {item.stock <= item.min ? (
                    <span className="badge" style={{ background: '#fee2e2', color: '#dc2626', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <AlertTriangle size={12} /> Bajo
                    </span>
                  ) : (
                    <span className="badge" style={{ background: '#dcfce7', color: '#16a34a' }}>OK</span>
                  )}
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
    </div>
  );
}
