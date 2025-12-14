import StatCard from '@/components/StatCard';
import DashboardChartsWrapper from '@/components/DashboardChartsWrapper';
import { Package, AlertTriangle, FileText, Truck, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";

export default function Home() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Tablero Principal" 
        description="Resumen general de operaciones"
        actions={
          <>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Ingreso
            </Button>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Factura
            </Button>
          </>
        }
      />

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
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Próximas Entregas</CardTitle>
          <Button variant="link" className="h-auto p-0 text-primary" asChild>
            <Link href="/calendar">
              Ver agenda completa <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        
        <CardContent className="p-0">
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
                    <Badge variant="info">Programado</Badge>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">11 Dic - 14:30</td>
                  <td className="p-4 align-middle">Hosp. Italiano</td>
                  <td className="p-4 align-middle">Caja Trauma A</td>
                  <td className="p-4 align-middle">
                    <Badge variant="warning">Pendiente prep.</Badge>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">12 Dic - 11:00</td>
                  <td className="p-4 align-middle">Clínica del Valle</td>
                  <td className="p-4 align-middle">Insumos Varios</td>
                  <td className="p-4 align-middle">
                    <Badge variant="success">Listo</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
