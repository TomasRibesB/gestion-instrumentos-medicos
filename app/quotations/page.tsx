import { PageHeader } from "@/components/ui/page-header";
import { QuotationList } from "@/components/QuotationList";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function QuotationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cotizaciones"
        description="Gestión de presupuestos a obras sociales"
        actions={
          <Button asChild>
            <Link href="/quotations/new">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Cotización
            </Link>
          </Button>
        }
      />
      <QuotationList />
    </div>
  );
}
