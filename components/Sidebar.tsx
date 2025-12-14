'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Box, 
  Receipt, 
  Calendar, 
  Users, 
  Settings, 
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { label: 'Tablero Principal', href: '/', icon: LayoutDashboard },
  { label: 'Stock e Insumos', href: '/stock', icon: Package },
  { label: 'Cajas Quirúrgicas', href: '/kits', icon: Box },
  { label: 'Facturación Y Cobros', href: '/invoices', icon: Receipt },
  { label: 'Logística y Agenda', href: '/calendar', icon: Calendar },
  { label: 'Clientes', href: '/clients', icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 flex-col border-r bg-slate-900 text-white md:flex fixed left-0 top-0 z-50">
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <span className="text-xl font-bold tracking-tight">GestiónInsumos</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4">
        <div className="mb-6">
          <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Menú Principal
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors mb-1",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="mb-6">
          <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Sistema
          </div>
          <Link 
            href="/users" 
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors mb-1",
              pathname === '/users' 
                ? "bg-primary text-primary-foreground" 
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            )}
          >
            <Users className="h-5 w-5" />
            <span>Usuarios</span>
          </Link>
          <Link 
            href="/settings" 
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white mb-1"
          >
            <Settings className="h-5 w-5" />
            <span>Configuración</span>
          </Link>
        </div>
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
          <LogOut className="h-5 w-5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
