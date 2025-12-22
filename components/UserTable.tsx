'use client';

import { MoreHorizontal, Shield } from 'lucide-react';
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

const USERS = [
  { id: 1, name: 'Juan Director', email: 'juan@empresa.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Maria Logistica', email: 'maria@empresa.com', role: 'Logistics', status: 'Active' },
  { id: 3, name: 'Pedro Ventas', email: 'pedro@empresa.com', role: 'Billing', status: 'Active' },
  { id: 4, name: 'Sofia Stock', email: 'sofia@empresa.com', role: 'Stock', status: 'Active' },
];

export default function UserTable() {
  return (
    <div className="rounded-md border bg-card">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {USERS.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="gap-1">
                    <Shield className="h-3 w-3" /> {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="success">
                    {user.status}
                  </Badge>
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
                      <DropdownMenuItem className="text-red-600">Desactivar</DropdownMenuItem>
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
