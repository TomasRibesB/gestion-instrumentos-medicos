'use client';

import { MoreHorizontal, Building, Mail } from 'lucide-react';

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
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Cliente</th>
              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Tipo</th>
              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Plazo Pago</th>
              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Contacto</th>
              <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {CLIENTS.map((client) => (
              <tr key={client.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle">
                  <div className="font-medium flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    {client.name}
                  </div>
                </td>
                <td className="p-4 align-middle text-muted-foreground">{client.type}</td>
                <td className="p-4 align-middle">
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10">
                    {client.term}
                  </span>
                </td>
                <td className="p-4 align-middle">
                  <div>{client.contact}</div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" /> {client.email}
                  </div>
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
