'use client';

import { MoreHorizontal, Building, Mail } from 'lucide-react';
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

const CLIENTS = [
  { id: 1, name: 'OSDE', type: 'Obra Social', term: '30 días', contact: 'Juan Pérez', email: 'finanzas@osde.com.ar' },
  { id: 2, name: 'Hospital Italiano', type: 'Privado', term: '45 días', contact: 'Maria Garcia', email: 'compras@hospitalitaliano.org.ar' },
  { id: 3, name: 'IOMA', type: 'Obra Social', term: '90 días', contact: 'Carlos Lopez', email: 'pagos@ioma.gba.gob.ar' },
  { id: 4, name: 'Ministerio de Salud', type: 'Público', term: '180 días', contact: 'Administración', email: 'admin@msal.gob.ar' },
  { id: 5, name: 'Swiss Medical', type: 'Obra Social', term: '30 días', contact: 'Ana Roberts', email: 'ana.roberts@swissmedical.com.ar' },
];

export default function ClientTable() {
  return (
    <div className="rounded-md border bg-card">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Plazo Pago</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CLIENTS.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    {client.name}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{client.type}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {client.term}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>{client.contact}</div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" /> {client.email}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
