import { ThemeToggle } from "@/components/ThemeToggle"
import { Bell, User, Monitor } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Administra tus preferencias y las de la cuenta</p>
      </div>

      <div className="grid gap-6">
        {/* Appearance Section */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Apariencia</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Tema</div>
              <div className="text-sm text-muted-foreground">Selecciona el tema de la aplicación (Claro/Oscuro)</div>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Notifications Section (Mock) */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Notificaciones</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Alertas por Email</div>
                <div className="text-sm text-muted-foreground">Recibe alertas sobre facturas vencidas</div>
              </div>
              <div className="h-6 w-11 rounded-full bg-primary p-1">
                <div className="h-4 w-4 rounded-full bg-white shadow-sm translate-x-5 transition-transform" />
              </div>
            </div>
            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <div className="font-medium">Notificaciones de Stock</div>
                <div className="text-sm text-muted-foreground">Avisos cuando el stock llegue al mínimo</div>
              </div>
              <div className="h-6 w-11 rounded-full bg-primary p-1">
                <div className="h-4 w-4 rounded-full bg-white shadow-sm translate-x-5 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Account Section (Mock) */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Cuenta</h2>
          </div>
          <div className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Nombre de Usuario</label>
              <input 
                type="text" 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value="Juan Pérez" 
                readOnly
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value="juan.perez@gestion.com" 
                readOnly
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
