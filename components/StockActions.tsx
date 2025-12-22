"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { StockForm } from "@/components/StockForm"

export function StockActions() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Nuevo Item
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
          <DialogTitle>Nuevo Ingreso de Stock</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <StockForm 
            onSuccess={() => {
              setOpen(false)
              window.location.reload() // Simple brute force refresh for this MVP phase
            }} 
            onCancel={() => setOpen(false)} 
          />
        </div>
      </Dialog>
    </>
  )
}
