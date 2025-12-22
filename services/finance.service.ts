import { mockAdapter } from '@/lib/mock-adapter';
import { Quotation, QuotationStatus } from '@/types';

export const financeService = {
  async getQuotations(): Promise<Quotation[]> {
    return await mockAdapter.get('quotations');
  },

  async getQuotationById(id: number): Promise<Quotation | undefined> {
    const list = await this.getQuotations();
    return list.find(q => q.id === id);
  },

  async createQuotation(quotation: Omit<Quotation, 'id' | 'created_at' | 'status'>): Promise<Quotation> {
    const list = await this.getQuotations();
    const newId = list.length > 0 ? Math.max(...list.map(q => q.id)) + 1 : 1;
    
    const newQuotation: Quotation = {
      ...quotation,
      id: newId,
      created_at: new Date().toISOString(),
      status: 'DRAFT'
    };
    
    await mockAdapter.update('quotations', [...list, newQuotation]);
    return newQuotation;
  },

  async updateQuotationStatus(id: number, status: QuotationStatus): Promise<void> {
    const list = await this.getQuotations();
    const updatedList = list.map(q => q.id === id ? { ...q, status } : q);
    await mockAdapter.update('quotations', updatedList);
  }
};
