import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

export const CartSheet = () => {
  const { items, totalItems, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/student/checkout');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="glass" size="icon" className="relative">
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Cart
            {totalItems > 0 && (
              <Badge variant="secondary">{totalItems} items</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <p className="text-sm text-muted-foreground/70">Add some delicious items!</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.menuItem.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.menuItem.name}</h4>
                    <p className="text-sm text-primary font-semibold">
                      ₹{item.menuItem.price * item.quantity}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => removeFromCart(item.menuItem.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{totalAmount}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">₹{totalAmount}</span>
              </div>
              
              <SheetFooter className="gap-2 sm:gap-2">
                <Button variant="outline" onClick={clearCart} className="flex-1">
                  Clear Cart
                </Button>
                <Button onClick={handleCheckout} className="flex-1">
                  Checkout
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
