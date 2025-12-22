import StatCard from '@/components/StatCard';
import DashboardChartsWrapper from '@/components/DashboardChartsWrapper';
import { Package, AlertTriangle, FileText, Truck, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export default function Home() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Tablero Principal" 
        description="Resumen general de operaciones"
        actions={
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Ingreso
            </Button>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Factura
            </Button>
          </div>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Caja/Kit</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>10 Dic - 09:00</TableCell>
                  <TableCell>Sanatorio Central</TableCell>
                  <TableCell>Kit Cadera #45</TableCell>
                  <TableCell>
                    <Badge variant="info">Programado</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>11 Dic - 14:30</TableCell>
                  <TableCell>Hosp. Italiano</TableCell>
                  <TableCell>Caja Trauma A</TableCell>
                  <TableCell>
                    <Badge variant="warning">Pendiente prep.</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>12 Dic - 11:00</TableCell>
                  <TableCell>Clínica del Valle</TableCell>
                  <TableCell>Insumos Varios</TableCell>
                  <TableCell>
                    <Badge variant="success">Listo</Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>14 Dic - 08:30</TableCell>
                  <TableCell>Sanatorio Allende</TableCell>
                  <TableCell>Placas Bloqueadas</TableCell>
                  <TableCell>
                    <Badge variant="outline">Consultar</Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
