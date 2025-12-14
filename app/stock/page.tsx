import StockTable from '@/components/StockTable';

export default function StockPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Stock</h1>
        <p className="text-muted-foreground">Control de inventario y movimientos</p>
      </div>
      
      <StockTable />
    </div>
  );
}
