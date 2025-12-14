import ClientTable from '@/components/ClientTable';
import { Plus } from 'lucide-react';

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">Gestión de Obras Sociales e Instituciones</p>
        </div>
        <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          <Plus className="mr-2 h-4 w-4" />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      <ClientTable />
    </div>
  );
}
