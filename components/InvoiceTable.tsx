'use client';

import { FileText, MoreHorizontal, Filter, Download } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const INVOICES = [
  { id: 'FC-0001', client: 'OSDE', type: 'Obra Social', date: '2023-11-10', due: '2023-12-10', amount: '$ 1,200,000', status: 'Overdue' },
  { id: 'FC-0002', client: 'Hospital Público Central', type: 'Público', date: '2023-12-01', due: '2024-06-01', amount: '$ 5,000,000', status: 'Pending' },
  { id: 'FC-0003', client: 'Swiss Medical', type: 'Obra Social', date: '2023-12-05', due: '2024-01-05', amount: '$ 850,000', status: 'Sent' },
  { id: 'FC-0004', client: 'Clínica San Lucas', type: 'Privado', date: '2023-12-08', due: '2023-12-23', amount: '$ 450,000', status: 'Draft' },
  { id: 'FC-0005', client: 'IOMA', type: 'Obra Social', date: '2023-10-15', due: '2023-11-15', amount: '$ 2,100,000', status: 'Paid' },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Paid': return { className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', label: 'Pagado' };
    case 'Pending': return { className: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300', label: 'Pendiente' };
    case 'Sent': return { className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300', label: 'Enviada' };
    case 'Draft': return { className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300', label: 'Borrador' };
    case 'Overdue': return { className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300', label: 'Vencida' };
    default: return { className: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300', label: status };
  }
};

export default function InvoiceTable() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? INVOICES : INVOICES.filter(i => i.status === filter);

  return (
    <div className="rounded-md border bg-card">
      <div className="flex items-center gap-2 p-4 border-b">
        <div className="flex flex-1 gap-2">
          <button 
            onClick={() => setFilter('All')}
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground",
              filter === 'All' ? "bg-accent text-accent-foreground border-input" : "bg-background border-transparent"
            )}
          >
            <Filter className="mr-2 h-4 w-4" /> Todos
          </button>
          <button 
            onClick={() => setFilter('Obra Social')}
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground",
              filter === 'Obra Social' ? "bg-accent text-accent-foreground border-input" : "bg-background border-transparent"
            )}
          >
            Obras Sociales
          </button>
          <button 
            onClick={() => setFilter('Público')}
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-md border px-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground",
              filter === 'Público' ? "bg-accent text-accent-foreground border-input" : "bg-background border-transparent"
            )}
          >
            Públicos
          </button>
        </div>
        <button className="inline-flex h-9 items-center justify-center rounded-md border border-transparent bg-transparent text-sm font-medium text-primary shadow-none transition-colors hover:bg-accent hover:text-accent-foreground">
          <Download className="mr-2 h-4 w-4" /> Exportar
        </button>
      </div>

      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Comprobante</th>
              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Cliente</th>
              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Emisión / Venc.</th>
              <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Importe</th>
              <th className="h-10 px-4 text-center align-middle font-medium text-muted-foreground">Estado</th>
              <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground"></th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {filtered.map((inv) => {
              const status = getStatusStyle(inv.status);
              return (
                <tr key={inv.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {inv.id}
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <div className="font-medium">{inv.client}</div>
                    <div className="text-xs text-muted-foreground">{inv.type}</div>
                  </td>
                  <td className="p-4 align-middle">
                    <div>{inv.date}</div>
                    <div className="text-xs text-muted-foreground">Vence: {inv.due}</div>
                  </td>
                  <td className="p-4 align-middle text-right font-semibold">{inv.amount}</td>
                  <td className="p-4 align-middle text-center">
                    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-transparent", status.className)}>
                      {status.label}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-right">
                    <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent bg-transparent text-sm font-medium shadow-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
