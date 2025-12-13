import ClientTable from '@/components/ClientTable';
import { Plus } from 'lucide-react';

export default function ClientsPage() {
  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Clientes</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Gestión de Obras Sociales e Instituciones</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      <ClientTable />
    </div>
  );
}
