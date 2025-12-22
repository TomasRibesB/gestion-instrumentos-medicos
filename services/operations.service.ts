import { mockAdapter } from '@/lib/mock-adapter';
import { Surgery, ConsumptionReport, InventoryItem } from '@/types';

export const operationsService = {
  async getSurgeries(): Promise<Surgery[]> {
    return await mockAdapter.get('surgeries');
  },

  async getSurgeryById(id: number): Promise<Surgery | undefined> {
    const list = await this.getSurgeries();
    return list.find(s => s.id === id);
  },

  async createSurgeryFromQuotation(quotationId: number, date: string, technicianId: number): Promise<Surgery> {
    // Basic implementation: Creates a surgery linked to a quotation
    const surgeries = await this.getSurgeries();
    // Fetch quotation to get context (client, institution) - simplified here
    // In a real app we would validate the quotation exists and is APPROVED
    
    // We need to fetch the quotation to know institution_id
    const quotations = await mockAdapter.get('quotations');
    const quotation = quotations.find(q => q.id === quotationId);
    
    if (!quotation) throw new Error("Quotation not found");

    const newId = surgeries.length > 0 ? Math.max(...surgeries.map(s => s.id)) + 1 : 1;
    
    const newSurgery: Surgery = {
      id: newId,
      quotation_id: quotationId,
      surgery_date: date,
      institution_id: quotation.institution_id,
      assigned_technician_id: technicianId,
      status: 'PROGRAMADA',
      surgery_type: 'Generated from Quotation',
      created_at: new Date().toISOString()
    };

    await mockAdapter.update('surgeries', [...surgeries, newSurgery]);
    return newSurgery;
  },

  async consumeItems(surgeryId: number, items: { inventoryItemId: number, quantity: number }[]): Promise<void> {
    // 1. Create consumption report
    // 2. Decrement stock
    
    const reports = await mockAdapter.get('consumption_reports');
    const inventory = await mockAdapter.get('inventory');
    
    // Create Report
    const newReportId = reports.length > 0 ? Math.max(...reports.map(r => r.id)) + 1 : 1;
    const newReport: ConsumptionReport = {
      id: newReportId,
      surgery_id: surgeryId,
      technician_id: 1, // Mock user
      reported_at: new Date().toISOString(),
      medical_protocol_notes: "Consumo automático",
      status: 'CONFIRMADO',
      details: items.map((item, idx) => ({
        id: idx + 1,
        consumption_report_id: newReportId,
        inventory_item_id: item.inventoryItemId,
        quantity_consumed: item.quantity
      }))
    };
    
    await mockAdapter.update('consumption_reports', [...reports, newReport]);

    // Update Inventory
    const updatedInventory = inventory.map(invItem => {
      const consumed = items.find(i => i.inventoryItemId === invItem.id);
      if (consumed) {
        return { ...invItem, quantity: invItem.quantity - consumed.quantity };
      }
      return invItem;
    });

    await mockAdapter.update('inventory', updatedInventory);
  }
};
