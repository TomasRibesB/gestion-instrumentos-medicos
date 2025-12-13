import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: string; // CSS color variable or hex
}

export default function StatCard({ title, value, description, icon: Icon, color = 'var(--primary)' }: StatCardProps) {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
      <div>
        <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '0.5rem' }}>{title}</h3>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>{value}</div>
        {description && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{description}</div>}
      </div>
      <div style={{ 
        padding: '0.75rem', 
        borderRadius: '8px', 
        background: `color-mix(in srgb, ${color} 15%, transparent)`, /* Light background based on color */
        color: color 
      }}>
        <Icon size={24} />
      </div>
    </div>
  );
}
