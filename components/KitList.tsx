'use client';

import { Box, Truck, CheckCircle, RotateCcw, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const KITS = [
  { id: 1, name: 'Kit Cadera #45', type: 'Prótesis', status: 'In Transit', location: 'Sanatorio Central', lastUpdate: 'Hoy 09:00' },
  { id: 2, name: 'Caja Trauma A', type: 'Instrumental', status: 'Returned', location: 'Recepción', lastUpdate: 'Ayer 14:30' },
  { id: 3, name: 'Kit Suturas C', type: 'Insumos', status: 'Available', location: 'Almacén', lastUpdate: '10/12/2023' },
  { id: 4, name: 'Kit Rodilla #12', type: 'Prótesis', status: 'Delivered', location: 'Hosp. Italiano', lastUpdate: 'Hace 2 horas' },
  { id: 5, name: 'Caja Básica #05', type: 'Instrumental', status: 'Prepared', location: 'Logística', lastUpdate: 'Hace 30 min' },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Available': 
      return { className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', label: 'Disponible', icon: CheckCircle };
    case 'In Transit': 
      return { className: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300', label: 'En Tránsito', icon: Truck };
    case 'Delivered': 
      return { className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', label: 'Entregado', icon: Box };
    case 'Returned': 
      return { className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', label: 'Devuelto', icon: RotateCcw };
    case 'Prepared': 
      return { className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300', label: 'Preparado', icon: Box };
    default: 
      return { className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300', label: status, icon: AlertCircle };
  }
};

export default function KitList() {
  return (
    <div className="rounded-md border bg-card">
      {KITS.map((kit, index) => {
        const badge = getStatusBadge(kit.status);
        const Icon = badge.icon;
        
        return (
          <div key={kit.id} className={cn(
            "flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 gap-4",
            index < KITS.length - 1 && "border-b"
          )}>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted">
                <Box className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-base font-semibold leading-none tracking-tight">{kit.name}</h3>
                <div className="mt-1 text-sm text-muted-foreground">{kit.type} • {kit.location}</div>
              </div>
            </div>
            
            <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-8">
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Última act.</div>
                <div className="text-sm font-medium">{kit.lastUpdate}</div>
              </div>
              
              <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent", badge.className)}>
                <Icon className="mr-1 h-3.5 w-3.5" />
                {badge.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
