"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Plus, Trash } from "lucide-react"

import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { financeService } from "@/services/finance.service"
import { stockService } from "@/services/stock.service"
import { mockAdapter } from "@/lib/mock-adapter"
import { Client, Doctor, Institution, Patient, Product } from "@/types"

// Schema
const quotationSchema = z.object({
  client_id: z.string().min(1, "Requerido"),
  doctor_id: z.string().min(1, "Requerido"),
  institution_id: z.string().min(1, "Requerido"),
  patient_name: z.string().min(1, "Requerido"), // Simplified for MVP
  valid_until: z.string().min(1, "Requerido"),
  items: z.array(z.object({
    product_id: z.string().min(1, "Requerido"),
    quantity: z.coerce.number().min(1),
    price: z.coerce.number().min(0)
  })).min(1, "Agregue al menos un item")
})

type QuotationFormData = z.infer<typeof quotationSchema>

export default function NewQuotationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Data sources
  const [clients, setClients] = useState<Client[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [products, setProducts] = useState<Product[]>([])

  const { register, control, handleSubmit, formState: { errors } } = useForm<QuotationFormData>({
    resolver: zodResolver(quotationSchema),
    defaultValues: {
      items: [{}]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  })

  useEffect(() => {
    // Load all dependencies
    Promise.all([
      mockAdapter.get('clients'),
      mockAdapter.get('doctors'),
      mockAdapter.get('institutions'),
      stockService.getProducts()
    ]).then(([c, d, i, p]) => {
      setClients(c)
      setDoctors(d)
      setInstitutions(i)
      setProducts(p)
    })
  }, [])

  const onSubmit = async (data: QuotationFormData) => {
    setLoading(true)
    try {
      // Create Patient on the fly (Mock logic for MVP)
      const patients = await mockAdapter.get('patients')
      const newPatientId = patients.length + 1
      const newPatient: Patient = {
        id: newPatientId,
        full_name: data.patient_name,
        dni: 'N/A',
        client_id: Number(data.client_id)
      }
      await mockAdapter.update('patients', [...patients, newPatient])

      // Calculate totals
      const totalClient = data.items.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0)
      const totalCost = totalClient * 0.6 // Mock internal cost (60% of price)

      await financeService.createQuotation({
        client_id: Number(data.client_id),
        doctor_id: Number(data.doctor_id),
        institution_id: Number(data.institution_id),
        patient_id: newPatientId,
        created_by_user_id: 2, // Mock User
        total_client_price: totalClient,
        total_internal_cost: totalCost,
        estimated_profit: totalClient - totalCost,
        valid_until: data.valid_until,
        additional_costs: [],
        items: data.items.map((item, idx) => ({
          id: idx + 1,
          quotation_id: 0, // Assigned by service
          product_id: Number(item.product_id),
          quantity_estimated: item.quantity,
          unit_sale_price: Number(item.price),
          unit_internal_cost: Number(item.price) * 0.6
        }))
      })
      
      router.push('/quotations')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Nueva Cotización"
        description="Crear presupuesto para cirugía"
      />

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Header Data */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Cliente (Obra Social)</Label>
                <Select {...register("client_id")}>
                  <option value="">Seleccionar...</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.business_name}</option>)}
                </Select>
                {errors.client_id && <p className="text-xs text-red-500">{errors.client_id.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Médico</Label>
                <Select {...register("doctor_id")}>
                  <option value="">Seleccionar...</option>
                  {doctors.map(d => <option key={d.id} value={d.id}>{d.full_name}</option>)}
                </Select>
                {errors.doctor_id && <p className="text-xs text-red-500">{errors.doctor_id.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Institución</Label>
                <Select {...register("institution_id")}>
                  <option value="">Seleccionar...</option>
                  {institutions.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </Select>
                {errors.institution_id && <p className="text-xs text-red-500">{errors.institution_id.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Paciente (Nombre Completo)</Label>
                <Input {...register("patient_name")} />
                {errors.patient_name && <p className="text-xs text-red-500">{errors.patient_name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Válido Hasta</Label>
                <Input type="date" {...register("valid_until")} />
                {errors.valid_until && <p className="text-xs text-red-500">{errors.valid_until.message}</p>}
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Items Cotizados</h3>
                <Button type="button" variant="outline" size="sm" onClick={() => append({ quantity: 1, price: 0 } as any)}>
                  <Plus className="mr-2 h-4 w-4" /> Agregar Item
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40%]">Producto</TableHead>
                      <TableHead className="w-[20%]">Cantidad</TableHead>
                      <TableHead className="w-[30%]">Precio ($)</TableHead>
                      <TableHead className="w-[10%]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((field, index) => (
                      <TableRow key={field.id}>
                        <TableCell>
                          <Select {...register(`items.${index}.product_id` as const)}>
                            <option value="">Seleccionar...</option>
                            {products.map(p => <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>)}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input type="number" {...register(`items.${index}.quantity` as const)} />
                        </TableCell>
                        <TableCell>
                          <Input type="number" {...register(`items.${index}.price` as const)} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {fields.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                          No hay items agregados.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              {errors.items && <p className="text-xs text-red-500">{errors.items.message}</p>}
            </div>

            <div className="flex justify-end gap-2 pt-6">
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar Borrador
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
