import { ThemeToggle } from "@/components/ThemeToggle"
import { Bell, User, Monitor } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Administra tus preferencias y las de la cuenta</p>
      </div>

      <div className="grid gap-6">
        {/* Appearance Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              <CardTitle>Apariencia</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Tema</div>
                <div className="text-sm text-muted-foreground">Selecciona el tema de la aplicación (Claro/Oscuro)</div>
              </div>
              <ThemeToggle />
            </div>
          </CardContent>
        </Card>

        {/* Notifications Section (Mock) */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              <CardTitle>Notificaciones</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="font-medium">Alertas por Email</Label>
                <div className="text-sm text-muted-foreground">Recibe alertas sobre facturas vencidas</div>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <Label htmlFor="stock-notifications" className="font-medium">Notificaciones de Stock</Label>
                <div className="text-sm text-muted-foreground">Avisos cuando el stock llegue al mínimo</div>
              </div>
              <Switch id="stock-notifications" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Account Section (Mock) */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Cuenta</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Nombre de Usuario</Label>
              <Input value="Juan Pérez" readOnly />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input value="juan.perez@gestion.com" readOnly />
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
