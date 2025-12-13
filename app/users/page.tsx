import UserTable from '@/components/UserTable';
import { Plus } from 'lucide-react';

export default function UsersPage() {
  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Usuarios y Roles</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Administración de permisos y accesos</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      <UserTable />
    </div>
  );
}
