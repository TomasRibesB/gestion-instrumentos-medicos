'use client';

import { useState } from 'react';
import { Search, Filter, MoreHorizontal, AlertTriangle, Plus } from 'lucide-react';

const DUMMY_STOCK = [
  { id: 1, name: 'Tornillos Titanio 3.5mm', category: 'Traumatología', stock: 350, min: 100, location: 'Rack A1', status: 'OK' },
  { id: 2, name: 'Placa Tibia Distal LCP', category: 'Traumatología', stock: 45, min: 50, location: 'Rack A2', status: 'LOW' },
  { id: 3, name: 'Sutura Vicryl 3-0', category: 'Suturas', stock: 500, min: 200, location: 'Cajón B1', status: 'OK' },
  { id: 4, name: 'Guantes Estériles 7.5', category: 'Descartables', stock: 1200, min: 500, location: 'Almacén', status: 'OK' },
  { id: 5, name: 'Clavo Intramedular Femoral', category: 'Traumatología', stock: 12, min: 15, location: 'Rack A3', status: 'LOW' },
  { id: 6, name: 'Malla Quirúrgica 15x15', category: 'General', stock: 80, min: 30, location: 'Cajón C2', status: 'OK' },
  { id: 7, name: 'Bisturí Hoja 24', category: 'Descartables', stock: 200, min: 100, location: 'Estante D1', status: 'OK' },
];

export default function StockTable() {
  const [filter, setFilter] = useState('');

  const filteredData = DUMMY_STOCK.filter(item => 
    item.name.toLowerCase().includes(filter.toLowerCase()) || 
    item.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar insumo..." 
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pl-9 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <button className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            <Filter className="mr-2 h-4 w-4" />
            <span>Filtros</span>
          </button>
          <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            <Plus className="mr-2 h-4 w-4" />
            <span>Nuevo Item</span>
          </button>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Item / Descripción</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Categoría</th>
                <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Stock Actual</th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Ubicación</th>
                <th className="h-10 px-4 text-center align-middle font-medium text-muted-foreground">Estado</th>
                <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {filteredData.map((item) => (
                <tr key={item.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <td className="p-4 align-middle">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">Min: {item.min}</div>
                  </td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 align-middle text-right font-semibold">{item.stock}</td>
                  <td className="p-4 align-middle">{item.location}</td>
                  <td className="p-4 align-middle text-center">
                    {item.stock <= item.min ? (
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-red-100 text-red-800 hover:bg-red-100/80 dark:bg-red-900/30 dark:text-red-300">
                        <AlertTriangle className="mr-1 h-3 w-3" /> Bajo
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-700 hover:bg-green-100/80 dark:bg-green-900/30 dark:text-green-300">
                        OK
                      </span>
                    )}
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
    </div>
  );
}
