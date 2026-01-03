import { useState } from 'react';
import { Order } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Clock, CheckCircle2, ChefHat, Package, MoreVertical, Banknote, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface OrderManagementCardProps {
  order: Order;
  onStatusChange: (orderId: string, status: Order['status']) => void;
  onPaymentChange: (orderId: string, paymentStatus: 'paid' | 'unpaid', method?: 'cash' | 'online') => void;
}

const statusSteps = [
  { status: 'pending', icon: Clock, label: 'Pending' },
  { status: 'accepted', icon: CheckCircle2, label: 'Accept' },
  { status: 'preparing', icon: ChefHat, label: 'Preparing' },
  { status: 'ready', icon: Package, label: 'Ready' },
];

export const OrderManagementCard = ({ order, onStatusChange, onPaymentChange }: OrderManagementCardProps) => {
  const currentStatusIndex = statusSteps.findIndex((s) => s.status === order.status);

  const handleNextStatus = () => {
    if (currentStatusIndex < statusSteps.length - 1) {
      const nextStatus = statusSteps[currentStatusIndex + 1].status as Order['status'];
      onStatusChange(order.id, nextStatus);
      toast.success(`Order #${order.tokenNumber} marked as ${nextStatus}`);
    }
  };

  const handleMarkPaid = (method: 'cash' | 'online') => {
    onPaymentChange(order.id, 'paid', method);
    toast.success(`Payment marked as received (${method})`);
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const timeSinceOrder = () => {
    const minutes = Math.floor((Date.now() - new Date(order.createdAt).getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m ago`;
  };

  return (
    <Card className={cn(
      "transition-all",
      order.status === 'pending' && "border-warning/50 bg-warning/5",
      order.status === 'ready' && "border-success/50 bg-success/5"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl",
              order.status === 'ready' 
                ? "gradient-primary text-primary-foreground" 
                : "bg-secondary text-foreground"
            )}>
              #{order.tokenNumber}
            </div>
            <div>
              <p className="font-medium">Token #{order.tokenNumber}</p>
              <p className="text-sm text-muted-foreground">{timeSinceOrder()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'destructive'}>
              {order.paymentStatus === 'paid' ? (
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Paid
                </span>
              ) : (
                'Unpaid'
              )}
            </Badge>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onStatusChange(order.id, 'cancelled')}>
                  Cancel Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-2 bg-secondary/50 rounded-lg p-3">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span>
                <span className="font-medium">{item.quantity}x</span> {item.name}
              </span>
              <span className="text-muted-foreground">₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-border flex items-center justify-between font-semibold">
            <span>Total</span>
            <span className="text-primary">₹{order.totalAmount}</span>
          </div>
        </div>

        {/* Status Progress */}
        <div className="flex items-center gap-1">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentStatusIndex;
            const isCurrent = index === currentStatusIndex;
            
            return (
              <div key={step.status} className="flex-1 flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
                  isCurrent && "ring-2 ring-primary ring-offset-2"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                {index < statusSteps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-1 mx-1 rounded",
                    index < currentStatusIndex ? "bg-primary" : "bg-secondary"
                  )} />
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {order.paymentStatus === 'unpaid' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-1 gap-2">
                  <Banknote className="w-4 h-4" />
                  Mark Paid
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleMarkPaid('cash')}>
                  <Banknote className="w-4 h-4 mr-2" />
                  Cash Payment
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMarkPaid('online')}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Online Payment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {currentStatusIndex < statusSteps.length - 1 && (
            <Button className="flex-1" onClick={handleNextStatus}>
              {currentStatusIndex === statusSteps.length - 2 ? (
                <>
                  <Package className="w-4 h-4 mr-2" />
                  Mark Ready
                </>
              ) : (
                <>
                  <ChefHat className="w-4 h-4 mr-2" />
                  {statusSteps[currentStatusIndex + 1].label}
                </>
              )}
            </Button>
          )}
          
          {order.status === 'ready' && (
            <Button 
              variant="success" 
              className="flex-1 bg-success text-success-foreground hover:bg-success/90"
              onClick={() => onStatusChange(order.id, 'completed')}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
