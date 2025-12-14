'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const invoiceData = [
  { name: 'Pagado', value: 12, color: 'hsl(var(--chart-2))' }, // Emerald/Green
  { name: 'Pendiente', value: 8, color: 'hsl(var(--chart-1))' }, // Blue/Primary make sure to adjust vars
  { name: 'Vencido', value: 3, color: 'hsl(var(--destructive))' },
  { name: 'Borrador', value: 5, color: 'hsl(var(--muted-foreground))' },
];

const stockData = [
  { name: 'Lun', entradas: 4, salidas: 12 },
  { name: 'Mar', entradas: 7, salidas: 8 },
  { name: 'Mie', entradas: 2, salidas: 15 },
  { name: 'Jue', entradas: 10, salidas: 5 },
  { name: 'Vie', entradas: 6, salidas: 9 },
];

export default function DashboardCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-8">
      {/* Invoices Chart */}
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-6 pb-0">
          <h3 className="text-lg font-semibold leading-none tracking-tight">Estado de Facturación</h3>
        </div>
        <div className="p-6">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={invoiceData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {invoiceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Stock Movement Chart */}
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-6 pb-0">
          <h3 className="text-lg font-semibold leading-none tracking-tight">Movimiento de Stock (Últimos 5 días)</h3>
        </div>
        <div className="p-6">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted)/0.2)' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--popover-foreground))' }}
                />
                <Legend />
                <Bar dataKey="entradas" name="Entradas" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="salidas" name="Salidas" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
