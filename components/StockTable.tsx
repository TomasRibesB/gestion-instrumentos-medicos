'use client';

import { useState, useEffect } from 'react';
import { Filter, MoreHorizontal, AlertTriangle, Plus, Loader2 } from 'lucide-react';
import { stockService } from '@/services/stock.service';
import { InventoryItem, Product } from '@/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';

interface StockRow {
  id: number;
  name: string;
  category: string;
  stock: number;
  min: number;
  location: string;
  expiration: string;
  status: 'OK' | 'LOW' | 'EXPIRED';
}

export default function StockTable() {
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<StockRow[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [inventory, products] = await Promise.all([
        stockService.getInventory(),
        stockService.getProducts()
      ]);
      
      const mappedData: StockRow[] = inventory.map(item => {
        const product = products.find(p => p.id === item.product_id);
        const stock = item.quantity;
        const min = product?.min_stock_alert || 0;
        let status: 'OK' | 'LOW' | 'EXPIRED' = 'OK';
        
        if (stock <= min) status = 'LOW';
        if (new Date(item.expiration_date) < new Date()) status = 'EXPIRED';

        return {
          id: item.id,
          name: product?.name || 'Unknown Product',
          category: product?.category || 'General',
          stock: stock,
          min: min,
          location: item.current_location,
          expiration: new Date(item.expiration_date).toLocaleDateString(),
          status
        };
      });

      setData(mappedData);
    } catch (error) {
      console.error('Failed to load stock data', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(filter.toLowerCase()) || 
    item.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:w-72">
          <SearchInput 
            placeholder="Buscar insumo..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            <span>Filtros</span>
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            <span>Nuevo Item</span>
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <div className="relative w-full overflow-auto">
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item / Descripción</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="text-right">Stock Actual</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      No se encontraron items
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-muted-foreground">Min: {item.min}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">{item.stock}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell className="text-center">
                        {item.status === 'LOW' ? (
                          <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 border-none">
                            <AlertTriangle className="mr-1 h-3 w-3" /> Bajo
                          </Badge>
                        ) : item.status === 'EXPIRED' ? (
                          <Badge variant="destructive" className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 border-none">
                             Vencido
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 border-none">
                            OK
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
