'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';
import { operationsService } from '@/services/operations.service';
import { Surgery } from '@/types';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CalendarView() {
  const router = useRouter();
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);
  const [loading, setLoading] = useState(true);

  // Mocking December 2023 for visual purpose or Current Month
  const today = new Date();
  const currentMonth = today.getMonth(); // 0-indexed
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const startOffset = new Date(currentYear, currentMonth, 1).getDay(); // Day of week 0-6

  const monthName = today.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

  useEffect(() => {
    operationsService.getSurgeries().then(data => {
      setSurgeries(data);
      setLoading(false);
    });
  }, []);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="capitalize text-xl">{monthName}</CardTitle>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="default" size="sm" className="h-8">
            Hoy
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
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
            const dateStr = new Date(currentYear, currentMonth, day).toDateString();
            
            const dayEvents = surgeries.filter(s => {
               const sDate = new Date(s.surgery_date);
               return sDate.getDate() === day && sDate.getMonth() === currentMonth && sDate.getFullYear() === currentYear;
            });
            
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
                  {dayEvents.map(surgery => (
                    <Badge 
                      key={surgery.id}
                      variant="info"
                      onClick={() => router.push(`/surgeries/${surgery.id}`)}
                      className="cursor-pointer font-normal justify-start px-1.5 overflow-hidden"
                    >
                      <Stethoscope className="mr-1 h-3 w-3 shrink-0" />
                      <span className="truncate">#{surgery.id} - {surgery.surgery_type}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
