import CalendarView from '@/components/CalendarView';
import { Plus } from 'lucide-react';

export default function CalendarPage() {
  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Logística y Agenda</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Planificación de entregas y retiros</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          <span>Nuevo Evento</span>
        </button>
      </div>

      <CalendarView />
    </div>
  );
}
