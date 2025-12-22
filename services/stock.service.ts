import { mockAdapter } from '@/lib/mock-adapter';
import { InventoryItem, Product } from '@/types';

export const stockService = {
  async getInventory(): Promise<InventoryItem[]> {
    return await mockAdapter.get('inventory');
  },

  async getProducts(): Promise<Product[]> {
    return await mockAdapter.get('products');
  },

  async getProductById(id: number): Promise<Product | undefined> {
    const products = await this.getProducts();
    return products.find(p => p.id === id);
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const products = await this.getProducts();
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { ...product, id: newId };
    
    await mockAdapter.update('products', [...products, newProduct]);
    return newProduct;
  },

  async createInventoryItem(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> {
    const inventory = await this.getInventory();
    const newId = inventory.length > 0 ? Math.max(...inventory.map(i => i.id)) + 1 : 1;
    const newItem = { ...item, id: newId };
    
    await mockAdapter.update('inventory', [...inventory, newItem]);
    return newItem;
  }
};
