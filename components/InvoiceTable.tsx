'use client';

import { FileText, MoreHorizontal, Filter, Download } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
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

const INVOICES = [
  { id: 'FC-0001', client: 'OSDE', type: 'Obra Social', date: '2023-11-10', due: '2023-12-10', amount: '$ 1,200,000', status: 'Overdue' },
  { id: 'FC-0002', client: 'Hospital Público Central', type: 'Público', date: '2023-12-01', due: '2024-06-01', amount: '$ 5,000,000', status: 'Pending' },
  { id: 'FC-0003', client: 'Swiss Medical', type: 'Obra Social', date: '2023-12-05', due: '2024-01-05', amount: '$ 850,000', status: 'Sent' },
  { id: 'FC-0004', client: 'Clínica San Lucas', type: 'Privado', date: '2023-12-08', due: '2023-12-23', amount: '$ 450,000', status: 'Draft' },
  { id: 'FC-0005', client: 'IOMA', type: 'Obra Social', date: '2023-10-15', due: '2023-11-15', amount: '$ 2,100,000', status: 'Paid' },
];

export default function InvoiceTable() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? INVOICES : INVOICES.filter(i => i.status === filter);

  return (
    <div className="rounded-md border bg-card">
      <div className="flex items-center gap-2 p-4 border-b">
        <div className="flex flex-1 gap-2">
          <Button
            variant={filter === 'All' ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilter('All')}
          >
             <Filter className="mr-2 h-4 w-4" /> Todos
          </Button>
          <Button
            variant={filter === 'Obra Social' ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilter('Obra Social')}
          >
            Obras Sociales
          </Button>
          <Button
            variant={filter === 'Público' ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilter('Público')}
          >
            Públicos
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" /> Exportar
        </Button>
      </div>

      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Comprobante</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Emisión / Venc.</TableHead>
              <TableHead className="text-right">Importe</TableHead>
              <TableHead className="text-center">Estado</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((inv) => {
              let variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" = "secondary";
              let label = inv.status;

              switch (inv.status) {
                case 'Paid': variant = 'success'; label = 'Pagado'; break;
                case 'Pending': variant = 'info'; label = 'Pendiente'; break;
                case 'Sent': variant = 'secondary'; label = 'Enviada'; break; // Purple not in default variants, simplified
                case 'Draft': variant = 'outline'; label = 'Borrador'; break;
                case 'Overdue': variant = 'destructive'; label = 'Vencida'; break;
              }

              return (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {inv.id}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{inv.client}</div>
                    <div className="text-xs text-muted-foreground">{inv.type}</div>
                  </TableCell>
                  <TableCell>
                    <div>{inv.date}</div>
                    <div className="text-xs text-muted-foreground">Vence: {inv.due}</div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">{inv.amount}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={variant}>{label}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                        <DropdownMenuItem>Descargar PDF</DropdownMenuItem>
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
