import InvoiceTable from '@/components/InvoiceTable';
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Plus } from 'lucide-react';

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Facturación y Cobros"
        description="Gestión de comprobantes y seguimiento de pagos"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Factura
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6 text-center">
          <div className="text-sm font-medium text-muted-foreground">Por Cobrar (Total)</div>
          <div className="text-2xl font-bold text-primary">$ 12.4M</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6 text-center">
          <div className="text-sm font-medium text-muted-foreground">Vencido (&gt;30 días)</div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">$ 1.2M</div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow p-6 text-center">
          <div className="text-sm font-medium text-muted-foreground">Proyección Mes</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">$ 8.5M</div>
        </div>
      </div>

      <InvoiceTable />
    </div>
  );
}
