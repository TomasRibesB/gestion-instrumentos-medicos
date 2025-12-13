import KitList from '@/components/KitList';
import { Plus } from 'lucide-react';

export default function KitsPage() {
  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Cajas y Kits Quirúrgicos</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Seguimiento de cajas en circuito</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          <span>Nueva Caja</span>
        </button>
      </div>

      <KitList />
    </div>
  );
}
