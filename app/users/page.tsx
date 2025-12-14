import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import UserTable from '@/components/UserTable';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Usuarios del Sistema"
        description="Administración de accesos y roles"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Usuario
          </Button>
        }
      />

      <UserTable />
    </div>
  );
}
