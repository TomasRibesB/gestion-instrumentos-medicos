import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}

export default function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon,
  className,
  iconClassName 
}: StatCardProps) {
  return (
    <div className={cn("rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-row items-start justify-between space-y-0", className)}>
      <div className="flex flex-col gap-1">
        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <div className={cn("p-2 rounded-full bg-primary/10 text-primary", iconClassName)}>
        <Icon className="h-4 w-4" />
      </div>
    </div>
  );
}
