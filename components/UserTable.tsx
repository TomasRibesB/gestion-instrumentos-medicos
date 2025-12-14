'use client';

import { MoreHorizontal, Shield } from 'lucide-react';

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
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Usuario</th>
              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Rol</th>
              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Estado</th>
              <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {USERS.map((user) => (
              <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle font-medium">{user.name}</td>
                <td className="p-4 align-middle">{user.email}</td>
                <td className="p-4 align-middle">
                  <span className="inline-flex items-center gap-1 rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                    <Shield className="h-3 w-3" /> {user.role}
                  </span>
                </td>
                <td className="p-4 align-middle">
                  <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    {user.status}
                  </span>
                </td>
                <td className="p-4 align-middle text-right">
                  <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent bg-transparent text-sm font-medium shadow-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
