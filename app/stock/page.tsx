import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Download, Plus, Upload } from 'lucide-react';
import StockTable from '@/components/StockTable';

export default function StockPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Stock e Insumos"
        description="Gestión de inventario y movimientos"
        actions={
          <>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Importar
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Insumo
            </Button>
          </>
        }
      />

      <StockTable />
    </div>
  );
}
