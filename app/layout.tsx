import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Gestión de Insumos y Cobros',
  description: 'Sistema de gestión administrativa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ 
            marginLeft: 'var(--sidebar-width)', 
            width: 'calc(100% - var(--sidebar-width))',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Header />
            <main style={{ padding: '2rem', flex: 1 }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
