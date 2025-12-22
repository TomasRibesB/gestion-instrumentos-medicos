'use client';

import { Box, Truck, CheckCircle, RotateCcw, AlertCircle, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils';

const KITS = [
  { id: 1, name: 'Kit Cadera #45', type: 'Prótesis', status: 'In Transit', location: 'Sanatorio Central', lastUpdate: 'Hoy 09:00' },
  { id: 2, name: 'Caja Trauma A', type: 'Instrumental', status: 'Returned', location: 'Recepción', lastUpdate: 'Ayer 14:30' },
  { id: 3, name: 'Kit Suturas C', type: 'Insumos', status: 'Available', location: 'Almacén', lastUpdate: '10/12/2023' },
  { id: 4, name: 'Kit Rodilla #12', type: 'Prótesis', status: 'Delivered', location: 'Hosp. Italiano', lastUpdate: 'Hace 2 horas' },
  { id: 5, name: 'Caja Básica #05', type: 'Instrumental', status: 'Prepared', location: 'Logística', lastUpdate: 'Hace 30 min' },
];

export default function KitList() {
  return (
    <div className="rounded-md border bg-card">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Caja / Kit</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Última Act.</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {KITS.map((kit) => {
              let badgeClass = "";
              let icon = AlertCircle;
              let label = kit.status;

              switch (kit.status) {
                case 'Available': 
                  badgeClass = 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
                  label = 'Disponible';
                  icon = CheckCircle;
                  break;
                case 'In Transit': 
                  badgeClass = 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300';
                  label = 'En Tránsito';
                  icon = Truck;
                  break;
                case 'Delivered': 
                  badgeClass = 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
                  label = 'Entregado';
                  icon = Box;
                  break;
                case 'Returned': 
                  badgeClass = 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
                  label = 'Devuelto';
                  icon = RotateCcw;
                  break;
                case 'Prepared': 
                  badgeClass = 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
                  label = 'Preparado';
                  icon = Box;
                  break;
              }
              const Icon = icon;

              return (
                <TableRow key={kit.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded border bg-muted">
                        <Box className="h-4 w-4 text-muted-foreground" />
                      </div>
                      {kit.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{kit.type}</TableCell>
                  <TableCell>{kit.location}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn("font-normal gap-1", badgeClass)}>
                      <Icon className="h-3 w-3" />
                      {label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {kit.lastUpdate}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver Historial</DropdownMenuItem>
                        <DropdownMenuItem>Transferir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
