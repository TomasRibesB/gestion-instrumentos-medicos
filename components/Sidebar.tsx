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
  LogOut,
  Truck
} from 'lucide-react';
import styles from './Sidebar.module.css';
import { clsx } from 'clsx';

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
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <span>GestiónInsumos</span>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navSection}>
          <div className={styles.sectionTitle}>Menú Principal</div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={clsx(styles.link, isActive && styles.active)}
              >
                <Icon className={styles.icon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className={styles.navSection}>
          <div className={styles.sectionTitle}>Sistema</div>
          <Link href="/users" className={clsx(styles.link, pathname === '/users' && styles.active)}>
            <Users className={styles.icon} />
            <span>Usuarios</span>
          </Link>
          <Link href="/settings" className={styles.link}>
            <Settings className={styles.icon} />
            <span>Configuración</span>
          </Link>
        </div>
      </nav>

      <div style={{ padding: '1rem' }}>
        <button className={styles.link} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}>
          <LogOut className={styles.icon} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}
