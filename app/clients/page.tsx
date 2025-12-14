import ClientTable from '@/components/ClientTable';
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestión de Clientes"
        description="Directorio de instituciones y contactos"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Cliente
          </Button>
        }
      />

      <ClientTable />
    </div>
  );
}
