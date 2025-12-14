'use client';

import { ChevronLeft, ChevronRight, Truck, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const EVENTS = [
  { id: 1, day: 5, title: 'Entrega: Sanatorio Central', type: 'delivery' },
  { id: 2, day: 8, title: 'Devolución: Hosp. Italiano', type: 'return' },
  { id: 3, day: 10, title: 'Entrega: Clínica del Valle', type: 'delivery' },
  { id: 4, day: 12, title: 'Entrega: Trauma Center', type: 'delivery' },
  { id: 5, day: 15, title: 'Devolución: Sanatorio Central', type: 'return' },
  { id: 6, day: 22, title: 'Entrega: IOMA La Plata', type: 'delivery' },
];

export default function CalendarView() {
  // Mocking December 2023 for visual purpose
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const startOffset = 5; // Friday 1st

  return (
    <div className="rounded-md border bg-card">
      {/* Calendar Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-xl font-semibold">Diciembre 2023</h2>
        <div className="flex gap-2">
          <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
            <ChevronRight className="h-4 w-4" />
          </button>
          <button className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
            Hoy
          </button>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 border-b">
        {['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map((day, i) => (
          <div 
            key={day} 
            className={cn(
              "px-3 py-3 text-center text-sm font-semibold text-muted-foreground",
              i !== 6 && "border-r"
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7">
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[120px] border-b border-r p-2 bg-muted/20"></div>
        ))}
        
        {days.map((day, index) => {
          const dayEvents = EVENTS.filter(e => e.day === day);
          const isLastColumn = (index + startOffset + 1) % 7 === 0;
          
          return (
            <div 
              key={day} 
              className={cn(
                "min-h-[120px] border-b p-2 transition-colors hover:bg-muted/30",
                !isLastColumn && "border-r"
              )}
            >
              <div className="mb-2 text-sm font-medium text-muted-foreground">{day}</div>
              <div className="flex flex-col gap-1">
                {dayEvents.map(event => (
                  <div 
                    key={event.id} 
                    className={cn(
                      "flex items-center gap-1 rounded px-2 py-1 text-xs font-medium cursor-pointer transition-opacity hover:opacity-80",
                      event.type === 'delivery' 
                        ? "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300" 
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                    )}
                  >
                    {event.type === 'delivery' ? <Truck className="h-3 w-3" /> : <RotateCcw className="h-3 w-3" />}
                    <span className="truncate">{event.title}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
