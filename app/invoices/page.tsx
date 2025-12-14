import InvoiceTable from '@/components/InvoiceTable';
import { Plus } from 'lucide-react';

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Facturación y Cobros</h1>
          <p className="text-muted-foreground">Seguimiento de facturas y plazos de pago</p>
        </div>
        <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          <Plus className="mr-2 h-4 w-4" />
          <span>Nueva Factura</span>
        </button>
      </div>

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
