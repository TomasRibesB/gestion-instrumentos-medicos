"use client"

import { useState, useEffect } from "react"
import { Plus, FileText, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { financeService } from "@/services/finance.service"
import { Quotation } from "@/types"

export function QuotationList() {
  const [quotations, setQuotations] = useState<Quotation[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    financeService.getQuotations().then(data => {
      setQuotations(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Cargando cotizaciones...</div>

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente / Médico</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Total ($)</TableHead>
                  <TableHead>Vencimiento</TableHead>
                  <TableHead className="text-right">Items</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      No hay cotizaciones registradas.
                    </TableCell>
                  </TableRow>
                ) : (
                  quotations.map((q) => (
                    <TableRow key={q.id} className="cursor-pointer hover:bg-muted/50" onClick={() => router.push(`/quotations/${q.id}`)}>
                      <TableCell className="font-medium">#{q.id}</TableCell>
                      <TableCell>
                        <div className="font-medium text-sm">Cliente ID: {q.client_id}</div>
                        <div className="text-xs text-muted-foreground">Dr. ID: {q.doctor_id}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          q.status === 'APPROVED' ? 'success' : 
                          q.status === 'REJECTED' ? 'destructive' : 
                          q.status === 'SENT' ? 'info' : 'secondary'
                        }>
                          {q.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        $ {q.total_client_price.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(q.valid_until).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end text-muted-foreground">
                          <FileText className="mr-1 h-3 w-3" />
                          {q.items.length}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
