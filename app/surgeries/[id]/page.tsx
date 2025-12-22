"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Box, Check, Loader2, Package, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { operationsService } from "@/services/operations.service"
import { stockService } from "@/services/stock.service"
import { Surgery, InventoryItem, Product } from "@/types"

export default function SurgeryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)

  const [surgery, setSurgery] = useState<Surgery>()
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)

  // Consumption Logic
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [selectedItems, setSelectedItems] = useState<{ itemId: number, qty: number }[]>([])
  const [submitLoading, setSubmitLoading] = useState(false)

  useEffect(() => {
    Promise.all([
      operationsService.getSurgeryById(id),
      stockService.getInventory(),
      stockService.getProducts()
    ]).then(([s, i, p]) => {
      setSurgery(s)
      setInventory(i)
      setProducts(p)
      setLoading(false)
    })
  }, [id])

  if (loading) return <div className="p-8">Cargando...</div>
  if (!surgery) return <div className="p-8">Cirugía no encontrada</div>

  const handleAddItem = (itemId: number) => {
    const exists = selectedItems.find(i => i.itemId === itemId)
    if (exists) {
      setSelectedItems(selectedItems.map(i => i.itemId === itemId ? { ...i, qty: i.qty + 1 } : i))
    } else {
      setSelectedItems([...selectedItems, { itemId, qty: 1 }])
    }
  }

  const handleRemoveItem = (itemId: number) => {
    const exists = selectedItems.find(i => i.itemId === itemId)
    if (exists && exists.qty > 1) {
      setSelectedItems(selectedItems.map(i => i.itemId === itemId ? { ...i, qty: i.qty - 1 } : i))
    } else {
      setSelectedItems(selectedItems.filter(i => i.itemId !== itemId))
    }
  }

  const handleConfirmConsumption = async () => {
    setSubmitLoading(true)
    try {
      await operationsService.consumeItems(
        id,
        selectedItems.map(i => ({ inventoryItemId: i.itemId, quantity: i.qty }))
      )
      setModalOpen(false)
      alert("Consumo reportado exitosamente") // Simple feedback
      // Optionally refresh stock or redirect
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitLoading(false)
    }
  }

  const getProductName = (pid: number) => products.find(p => p.id === pid)?.name

  return (
    <div className="space-y-6 pb-20"> {/* pb-20 for mobile bottom action */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-bold">Cirugía #{surgery.id}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalles Operativos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-muted-foreground">Fecha</Label>
              <div className="font-medium">{new Date(surgery.surgery_date).toLocaleDateString()}</div>
            </div>
            <div>
              <Label className="text-muted-foreground">Estado</Label>
              <div className="font-medium">{surgery.status}</div>
            </div>
            <div className="col-span-2">
              <Label className="text-muted-foreground">Tipo</Label>
              <div className="font-medium">{surgery.surgery_type}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="px-1">
        <h2 className="mb-4 text-lg font-semibold">Material Utilizado</h2>
        {/* Placeholder for previously reported items if we implemented getting reports */}
        <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          No hay consumos reportados aún.
        </div>
      </div>

      {/* Floating Action Button for Technicians */}
      <div className="fixed bottom-6 right-6">
        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg" onClick={() => setModalOpen(true)}>
          <Box className="h-6 w-6" />
        </Button>
      </div>

      {/* Consumption Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogHeader>
          <DialogTitle>Reportar Consumo de Insumos</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="max-h-[300px] overflow-y-auto space-y-2 border rounded-md p-2">
            {/* Simple Stock Selector - List everything for MVP */}
            {inventory.map(item => {
              const product = products.find(p => p.id === item.product_id)
              const selected = selectedItems.find(i => i.itemId === item.id)
              return (
                <div key={item.id} className="flex items-center justify-between p-2 hover:bg-muted rounded">
                  <div className="flex-1">
                    <div className="text-sm font-medium">{product?.name}</div>
                    <div className="text-xs text-muted-foreground">Lote: {item.lot_number}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selected && (
                      <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleRemoveItem(item.id)}>
                        -
                      </Button>
                    )}
                    <span className="w-4 text-center text-sm">{selected?.qty || 0}</span>
                    <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => handleAddItem(item.id)}>
                      +
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={handleConfirmConsumption} disabled={selectedItems.length === 0 || submitLoading}>
              {submitLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirmar Consumo
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
