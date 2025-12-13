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
  { name: 'Pagado', value: 12, color: '#16a34a' },
  { name: 'Pendiente', value: 8, color: '#0ea5e9' },
  { name: 'Vencido', value: 3, color: '#dc2626' },
  { name: 'Borrador', value: 5, color: '#94a3b8' },
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
      {/* Invoices Chart */}
      <div className="card">
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 600 }}>Estado de Facturación</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={invoiceData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {invoiceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stock Movement Chart */}
      <div className="card">
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 600 }}>Movimiento de Stock (Últimos 5 días)</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: '#f1f5f9' }} />
              <Legend />
              <Bar dataKey="entradas" name="Entradas" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="salidas" name="Salidas" fill="#64748b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
