import InvoiceTable from '@/components/InvoiceTable';
import { Plus } from 'lucide-react';

export default function InvoicesPage() {
  return (
    <div>
       <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Facturación y Cobros</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Seguimiento de facturas y plazos de pago</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          <span>Nueva Factura</span>
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Por Cobrar (Total)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>$ 12.4M</div>
        </div>
        <div className="card" style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Vencido (&gt;30 días)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#dc2626' }}>$ 1.2M</div>
        </div>
        <div className="card" style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Proyección Mes</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#16a34a' }}>$ 8.5M</div>
        </div>
      </div>

      <InvoiceTable />
    </div>
  );
}
