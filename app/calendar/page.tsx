import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import CalendarView from '@/components/CalendarView';

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Logística y Agenda"
        description="Programación de entregas y retiros"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Evento
          </Button>
        }
      />

      <CalendarView />
    </div>
  );
}
