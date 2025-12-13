import StatCard from '@/components/StatCard';
import DashboardCharts from '@/components/DashboardCharts';
import { Package, AlertTriangle, FileText, Truck, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Tablero Principal</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Resumen general de operaciones</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary">
            <Plus size={18} />
            <span>Nuevo Ingreso</span>
          </button>
          <button className="btn" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
            <Plus size={18} />
            <span>Nueva Factura</span>
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <StatCard 
          title="Stock Total" 
          value="1,250" 
          description="Items en inventario" 
          icon={Package} 
          color="var(--primary)"
        />
        <StatCard 
          title="Alertas Stock Bajo" 
          value="12" 
          description="Requieren reposición" 
          icon={AlertTriangle} 
          color="var(--warning)"
        />
        <StatCard 
          title="Facturas Pendientes" 
          value="$ 4.5M" 
          description="8 facturas por cobrar" 
          icon={FileText} 
          color="var(--secondary)" // Using secondary for neutral financial
        />
        <StatCard 
          title="Entregas Semanales" 
          value="5" 
          description="Próximos 7 días" 
          icon={Truck} 
          color="var(--success)"
        />
      </div>

      {/* Interactive Charts */}
      <DashboardCharts />

      {/* Recent Deliveries & Details */}
      <div style={{ marginTop: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Próximas Entregas</h3>
            <Link href="/calendar" style={{ fontSize: '0.875rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Ver agenda completa <ArrowRight size={16} />
            </Link>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Fecha</th>
                <th style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Cliente</th>
                <th style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Caja/Kit</th>
                <th style={{ padding: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem' }}>10 Dic - 09:00</td>
                <td style={{ padding: '0.75rem' }}>Sanatorio Central</td>
                <td style={{ padding: '0.75rem' }}>Kit Cadera #45</td>
                <td style={{ padding: '0.75rem' }}><span className="badge" style={{ background: '#e0f2fe', color: '#0284c7' }}>Programado</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem' }}>11 Dic - 14:30</td>
                <td style={{ padding: '0.75rem' }}>Hosp. Italiano</td>
                <td style={{ padding: '0.75rem' }}>Caja Trauma A</td>
                <td style={{ padding: '0.75rem' }}><span className="badge" style={{ background: '#fef3c7', color: '#d97706' }}>Pendiente prep.</span></td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem' }}>12 Dic - 11:00</td>
                <td style={{ padding: '0.75rem' }}>Clínica del Valle</td>
                <td style={{ padding: '0.75rem' }}>Insumos Varios</td>
                <td style={{ padding: '0.75rem' }}><span className="badge" style={{ background: '#dcfce7', color: '#16a34a' }}>Listo</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
