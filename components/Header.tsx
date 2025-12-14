"use client";

import { Search, Bell } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-background px-6">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Buscar insumo, factura, cliente..." 
          className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
        />
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="rounded-full p-2 hover:bg-accent hover:text-accent-foreground">
          <Bell className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
            JD
          </div>
          <span className="text-sm font-medium">Juan Director</span>
        </div>
      </div>
    </header>
  );
}
