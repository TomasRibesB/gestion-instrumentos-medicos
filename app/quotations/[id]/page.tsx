"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Check, Send, X, Calendar as CalendarIcon, Loader2 } from "lucide-react"

import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { financeService } from "@/services/finance.service"
import { operationsService } from "@/services/operations.service"
import { Quotation, Product } from "@/types" // Ensure this exists or types/index.ts is correct
import { stockService } from "@/services/stock.service" // To get product names if needed

export default function QuotationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = Number(params.id)
  
  const [quotation, setQuotation] = useState<Quotation | undefined>()
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [products, setProducts] = useState<any[]>([]) // Cache for names

  useEffect(() => {
    Promise.all([
      financeService.getQuotationById(id),
      stockService.getProducts()
    ]).then(([q, p]) => {
      setQuotation(q)
      setProducts(p)
      setLoading(false)
    })
  }, [id])

  if (loading) return <div className="p-8">Cargando...</div>
  if (!quotation) return <div className="p-8">No encontrada</div>

  const handleStatusChange = async (newStatus: any) => {
    setActionLoading(true)
    await financeService.updateQuotationStatus(id, newStatus)
    setQuotation({ ...quotation, status: newStatus })
    setActionLoading(false)
  }

  const handleCreateSurgery = async () => {
    setActionLoading(true)
    try {
      // Create surgery 7 days from now by default
      const date = new Date()
      date.setDate(date.getDate() + 7)
      
      await operationsService.createSurgeryFromQuotation(id, date.toISOString(), 1)
      router.push('/calendar')
    } catch (e) {
      console.error(e)
    } finally {
      setActionLoading(false)
    }
  }

  const getProductName = (pid: number) => products.find(p => p.id === pid)?.name || `ID ${pid}`

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            Presupuesto #{quotation.id}
            <Badge variant="outline">{quotation.status}</Badge>
          </h1>
        </div>
        
        {/* Actions based on Status */}
        <div className="flex gap-2">
          {quotation.status === 'DRAFT' && (
            <Button onClick={() => handleStatusChange('SENT')} disabled={actionLoading}>
              <Send className="mr-2 h-4 w-4" /> Enviar a Cliente
            </Button>
          )}
          
          {quotation.status === 'SENT' && (
            <>
              <Button variant="destructive" onClick={() => handleStatusChange('REJECTED')} disabled={actionLoading}>
                <X className="mr-2 h-4 w-4" /> Rechazar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleStatusChange('APPROVED')} disabled={actionLoading}>
                <Check className="mr-2 h-4 w-4" /> Aprobar
              </Button>
            </>
          )}

          {quotation.status === 'APPROVED' && (
             <Button onClick={handleCreateSurgery} disabled={actionLoading}>
               <CalendarIcon className="mr-2 h-4 w-4" /> Agendar Cirugía
             </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Detalle Financiero</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Cliente:</span>
              <span className="font-bold text-lg">$ {quotation.total_client_price.toLocaleString()}</span>
            </div>
            {/* Show internal cost only to Admin/Cotizador - Mocking role check here */}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Costo Interno:</span>
              <span>$ {quotation.total_internal_cost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600 font-medium">
              <span>Rentabilidad Estimada:</span>
              <span>$ {quotation.estimated_profit.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {quotation.items.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center border-b pb-2 last:border-0">
                  <div>
                    <div className="font-medium">{getProductName(item.product_id)}</div>
                    <div className="text-xs text-muted-foreground">Cant: {item.quantity_estimated}</div>
                  </div>
                  <div className="font-medium">
                    $ {item.unit_sale_price.toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
