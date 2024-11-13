import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types/order";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Väntar på bekräftelse',
          variant: 'secondary' as const,
          className: 'bg-yellow-500/10 text-yellow-500'
        };
      case 'confirmed':
        return {
          label: 'Bekräftad',
          variant: 'secondary' as const,
          className: 'bg-blue-500/10 text-blue-500'
        };
      case 'preparing':
        return {
          label: 'Tillagas',
          variant: 'secondary' as const,
          className: 'bg-orange-500/10 text-orange-500'
        };
      case 'ready':
        return {
          label: 'Klar för upphämtning',
          variant: 'secondary' as const,
          className: 'bg-green-500/10 text-green-500'
        };
      case 'picked_up':
        return {
          label: 'Upphämtad',
          variant: 'secondary' as const,
          className: 'bg-purple-500/10 text-purple-500'
        };
      case 'delivering':
        return {
          label: 'Levereras',
          variant: 'secondary' as const,
          className: 'bg-primary/10 text-primary'
        };
      case 'delivered':
        return {
          label: 'Levererad',
          variant: 'secondary' as const,
          className: 'bg-green-500/10 text-green-500'
        };
      case 'cancelled':
        return {
          label: 'Avbruten',
          variant: 'secondary' as const,
          className: 'bg-destructive/10 text-destructive'
        };
      case 'rejected':
        return {
          label: 'Nekad',
          variant: 'secondary' as const,
          className: 'bg-destructive/10 text-destructive'
        };
      default:
        return {
          label: status,
          variant: 'secondary' as const,
          className: ''
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge 
      variant={config.variant}
      className={config.className}
    >
      {config.label}
    </Badge>
  );
}