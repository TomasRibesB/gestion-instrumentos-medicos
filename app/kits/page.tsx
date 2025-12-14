import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import KitList from '@/components/KitList';

export default function KitsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cajas Quirúrgicas"
        description="Gestión de kits y cajas para cirugía"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Caja
          </Button>
        }
      />

      <KitList />
    </div>
  );
}
