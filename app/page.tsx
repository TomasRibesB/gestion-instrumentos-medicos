import StatCard from '@/components/StatCard';
import DashboardChartsWrapper from '@/components/DashboardChartsWrapper';
import { Package, AlertTriangle, FileText, Truck, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tablero Principal</h1>
          <p className="text-muted-foreground">Resumen general de operaciones</p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            <Plus className="mr-2 h-4 w-4" />
            <span>Nuevo Ingreso</span>
          </button>
          <button className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            <Plus className="mr-2 h-4 w-4" />
            <span>Nueva Factura</span>
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Stock Total" 
          value="1,250" 
          description="Items en inventario" 
          icon={Package} 
          iconClassName="bg-primary/10 text-primary"
        />
        <StatCard 
          title="Alertas Stock Bajo" 
          value="12" 
          description="Requieren reposición" 
          icon={AlertTriangle} 
          iconClassName="bg-orange-500/10 text-orange-600 dark:text-orange-400"
        />
        <StatCard 
          title="Facturas Pendientes" 
          value="$ 4.5M" 
          description="8 facturas por cobrar" 
          icon={FileText} 
          iconClassName="bg-blue-500/10 text-blue-600 dark:text-blue-400"
        />
        <StatCard 
          title="Entregas Semanales" 
          value="5" 
          description="Próximos 7 días" 
          icon={Truck} 
          iconClassName="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        />
      </div>

      {/* Interactive Charts */}
      <DashboardChartsWrapper />

      {/* Recent Deliveries & Details */}
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-row items-center justify-between p-6">
          <h3 className="font-semibold leading-none tracking-tight">Próximas Entregas</h3>
          <Link href="/calendar" className="flex items-center gap-1 text-sm text-primary hover:underline">
            Ver agenda completa <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="p-6 pt-0">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Fecha</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Cliente</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Caja/Kit</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Estado</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">10 Dic - 09:00</td>
                  <td className="p-4 align-middle">Sanatorio Central</td>
                  <td className="p-4 align-middle">Kit Cadera #45</td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-sky-100 text-sky-700 hover:bg-sky-100/80 dark:bg-sky-900/30 dark:text-sky-300">
                      Programado
                    </span>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">11 Dic - 14:30</td>
                  <td className="p-4 align-middle">Hosp. Italiano</td>
                  <td className="p-4 align-middle">Caja Trauma A</td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-amber-100 text-amber-700 hover:bg-amber-100/80 dark:bg-amber-900/30 dark:text-amber-300">
                      Pendiente prep.
                    </span>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">12 Dic - 11:00</td>
                  <td className="p-4 align-middle">Clínica del Valle</td>
                  <td className="p-4 align-middle">Insumos Varios</td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-700 hover:bg-green-100/80 dark:bg-green-900/30 dark:text-green-300">
                      Listo
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
