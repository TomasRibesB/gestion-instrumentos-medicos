import StockTable from '@/components/StockTable';

export default function StockPage() {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Gestión de Stock</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Control de inventario y movimientos</p>
      </div>
      
      <StockTable />
    </div>
  );
}
