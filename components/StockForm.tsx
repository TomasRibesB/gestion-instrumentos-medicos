"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { stockService } from "@/services/stock.service"
import { Product } from "@/types"

const stockSchema = z.object({
  product_id: z.string().min(1, "Seleccione un producto"),
  lot_number: z.string().min(1, "Requerido"),
  quantity: z.coerce.number().min(1, "Mínimo 1"),
  expiration_date: z.string().min(1, "Requerido"),
  current_location: z.string().min(1, "Requerido"),
})

type StockFormData = z.infer<typeof stockSchema>

interface StockFormProps {
  onSuccess: () => void
  onCancel: () => void
}

export function StockForm({ onSuccess, onCancel }: StockFormProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<StockFormData>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      current_location: 'DEPOSITO', 
      quantity: 1
    }
  })

  useEffect(() => {
    stockService.getProducts().then(setProducts)
  }, [])

  const onSubmit = async (data: StockFormData) => {
    setLoading(true)
    try {
      await stockService.createInventoryItem({
        product_id: Number(data.product_id),
        lot_number: data.lot_number,
        quantity: data.quantity, // Now safely a number due to z.coerce
        expiration_date: new Date(data.expiration_date).toISOString(),
        current_location: data.current_location,
        barcode_full: `GEN-${Date.now()}`
      })
      onSuccess()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="product">Producto</Label>
        <Select {...register("product_id")} id="product">
          <option value="">Seleccionar...</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
          ))}
        </Select>
        {errors.product_id && <span className="text-xs text-red-500">{errors.product_id.message}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="lot">Lote</Label>
          <Input id="lot" {...register("lot_number")} placeholder="L-1234" />
          {errors.lot_number && <span className="text-xs text-red-500">{errors.lot_number.message}</span>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="qty">Cantidad</Label>
          <Input id="qty" type="number" {...register("quantity")} />
          {errors.quantity && <span className="text-xs text-red-500">{errors.quantity.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="exp">Vencimiento</Label>
          <Input id="exp" type="date" {...register("expiration_date")} />
          {errors.expiration_date && <span className="text-xs text-red-500">{errors.expiration_date.message}</span>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="loc">Ubicación</Label>
          <Select {...register("current_location")}>
            <option value="DEPOSITO">Depósito Central</option>
            <option value="ALMACEN_B">Almacén B</option>
            <option value="QUIROFANO">Quirófano</option>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Guardar
        </Button>
      </div>
    </form>
  )
}
