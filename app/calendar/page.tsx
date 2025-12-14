import CalendarView from '@/components/CalendarView';
import { Plus } from 'lucide-react';

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Logística y Agenda</h1>
          <p className="text-muted-foreground">Planificación de entregas y retiros</p>
        </div>
        <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          <Plus className="mr-2 h-4 w-4" />
          <span>Nuevo Evento</span>
        </button>
      </div>

      <CalendarView />
    </div>
  );
}
