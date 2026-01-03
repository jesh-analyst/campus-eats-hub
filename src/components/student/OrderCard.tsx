import { Order } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Clock, CheckCircle2, ChefHat, Package, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderCardProps {
  order: Order;
}

const statusConfig = {
  pending: {
    icon: Clock,
    label: 'Pending',
    color: 'bg-warning/10 text-warning border-warning/20',
    iconColor: 'text-warning',
  },
  accepted: {
    icon: CheckCircle2,
    label: 'Accepted',
    color: 'bg-info/10 text-info border-info/20',
    iconColor: 'text-info',
  },
  preparing: {
    icon: ChefHat,
    label: 'Preparing',
    color: 'bg-primary/10 text-primary border-primary/20',
    iconColor: 'text-primary',
  },
  ready: {
    icon: Package,
    label: 'Ready!',
    color: 'bg-success/10 text-success border-success/20',
    iconColor: 'text-success',
  },
  completed: {
    icon: CheckCircle2,
    label: 'Completed',
    color: 'bg-muted text-muted-foreground border-border',
    iconColor: 'text-muted-foreground',
  },
  cancelled: {
    icon: XCircle,
    label: 'Cancelled',
    color: 'bg-destructive/10 text-destructive border-destructive/20',
    iconColor: 'text-destructive',
  },
};

export const OrderCard = ({ order }: OrderCardProps) => {
  const status = statusConfig[order.status];
  const StatusIcon = status.icon;
  
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className={cn(
      "transition-all duration-300",
      order.status === 'ready' && "ring-2 ring-success shadow-lg animate-pulse-soft"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg",
              order.status === 'ready' ? "gradient-primary text-primary-foreground" : "bg-secondary"
            )}>
              #{order.tokenNumber}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Token Number</p>
              <p className="text-xs text-muted-foreground/70">
                {formatTime(order.createdAt)}
              </p>
            </div>
          </div>
          
          <Badge variant="outline" className={cn("gap-1", status.color)}>
            <StatusIcon className={cn("w-3 h-3", status.iconColor)} />
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="space-y-2">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {item.quantity}x {item.name}
              </span>
              <span className="font-medium">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>
        
        <div className="pt-2 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'destructive'}>
              {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
            </Badge>
            {order.paymentMethod && (
              <span className="text-xs text-muted-foreground capitalize">
                via {order.paymentMethod}
              </span>
            )}
          </div>
          <span className="font-bold text-primary">₹{order.totalAmount}</span>
        </div>
      </CardContent>
    </Card>
  );
};
