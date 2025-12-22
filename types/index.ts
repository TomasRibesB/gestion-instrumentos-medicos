export type RoleName = 'Admin' | 'Cotizador' | 'Tecnico' | 'Logistico';

export type QuotationStatus = 'DRAFT' | 'SENT' | 'APPROVED' | 'REJECTED';

export type SurgeryStatus = 'PROGRAMADA' | 'EN_PROCESO' | 'FINALIZADA' | 'CANCELADA';

export type DispatchStatus = 'PREPARADO' | 'ENVIADO' | 'ENTREGADO';

export type MovementType = 'INGRESO_PROV' | 'SALIDA_CIRUGIA' | 'CONSUMO' | 'RETORNO' | 'AJUSTE' | 'MERMA';

export type ConsumptionStatus = 'BORRADOR' | 'CONFIRMADO';

export type InvoiceStatus = 'PENDIENTE' | 'EMITIDA' | 'COBRADA' | 'VENCIDA';

export type InvoiceType = 'A' | 'B' | 'C';

// --- SEGURIDAD ---

export interface Permission {
  id: number;
  slug: string; // e.g., 'stock:write'
  description: string;
  module: string;
}

export interface Role {
  id: number;
  name: RoleName;
  description: string;
  permissions: number[]; // IDs of permissions
}

export interface User {
  id: number;
  username: string; // Added for Auth
  email: string;
  password_hash: string; // En un app real esto no viaja al front, pero es un mock
  first_name: string;
  last_name: string;
  role_id: number;
  is_active: boolean;
  created_at: string; // ISO Date
}

// --- MAESTROS ---

export interface Client {
  id: number;
  business_name: string;
  cuit: string;
  payment_terms_days: number;
  email_contact: string;
  phone: string;
  active: boolean;
}

export interface Doctor {
  id: number;
  full_name: string;
  license_number: string;
  phone: string;
}

export interface Institution {
  id: number;
  name: string;
  address: string;
  location_city: string;
}

export interface Patient {
  id: number;
  full_name: string;
  dni: string;
  client_id: number;
}

// --- STOCK ---

export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  barcode_base: string;
  is_asset: boolean;
  requires_sterilization: boolean;
  min_stock_alert: number;
  category: string; // Added for UI grouping
}

export interface InventoryItem {
  id: number;
  product_id: number;
  serial_number?: string;
  lot_number?: string;
  expiration_date: string; // ISO Date
  quantity: number;
  current_location: string;
  barcode_full: string;
}

export interface StockMovement {
  id: number;
  inventory_item_id: number;
  user_id: number;
  movement_type: MovementType;
  quantity_change: number;
  created_at: string;
  notes: string;
  reference_id?: number;
}

// --- COTIZACIONES ---

export interface QuotationItem {
  id: number;
  quotation_id: number;
  product_id: number;
  quantity_estimated: number;
  unit_sale_price: number;
  unit_internal_cost: number;
}

export interface QuotationAdditionalCost {
  id: number;
  quotation_id: number;
  description: string;
  cost_amount: number;
  price_amount: number;
  is_hidden: boolean;
}

export interface Quotation {
  id: number;
  client_id: number;
  doctor_id: number;
  patient_id: number;
  institution_id: number;
  created_by_user_id: number;
  created_at: string;
  status: QuotationStatus;
  total_client_price: number;
  total_internal_cost: number;
  estimated_profit: number;
  valid_until: string;
  items: QuotationItem[];
  additional_costs: QuotationAdditionalCost[];
}

// --- OPERACIONES ---

export interface Surgery {
  id: number;
  quotation_id: number;
  surgery_date: string;
  institution_id: number;
  assigned_technician_id: number;
  status: SurgeryStatus;
  surgery_type: string;
  created_at: string;
}

export interface DispatchItem {
  id: number;
  dispatch_id: number;
  inventory_item_id: number;
  quantity_sent: number;
}

export interface Dispatch {
  id: number;
  surgery_id: number;
  dispatched_at: string;
  dispatched_by_user_id: number;
  logistics_method: string;
  tracking_number?: string;
  sterilization_check: boolean;
  status: DispatchStatus;
  items: DispatchItem[];
}

// --- CONSUMO Y CIERRE ---

export interface ConsumptionDetail {
  id: number;
  consumption_report_id: number;
  inventory_item_id: number;
  quantity_consumed: number;
}

export interface ConsumptionReport {
  id: number;
  surgery_id: number;
  technician_id: number;
  reported_at: string;
  medical_protocol_notes: string;
  status: ConsumptionStatus;
  details: ConsumptionDetail[];
}

export interface Billing {
  id: number;
  surgery_id: number;
  consumption_report_id: number;
  invoice_number: string;
  invoice_type: InvoiceType;
  total_amount: number;
  invoiced_at: string;
  status: InvoiceStatus;
  payment_due_date: string;
  payment_date?: string;
}

export interface MockDB {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  clients: Client[];
  doctors: Doctor[];
  institutions: Institution[];
  patients: Patient[];
  products: Product[];
  inventory: InventoryItem[];
  movements: StockMovement[];
  quotations: Quotation[];
  surgeries: Surgery[];
  dispatches: Dispatch[];
  consumption_reports: ConsumptionReport[];
  billings: Billing[];
}
