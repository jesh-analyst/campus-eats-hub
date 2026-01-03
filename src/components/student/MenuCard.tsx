import { useState } from 'react';
import { MenuItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Clock, Utensils } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard = ({ item }: MenuCardProps) => {
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  const cartItem = items.find((i) => i.menuItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addToCart(item);
  };

  const handleIncrement = () => {
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, quantity - 1);
    }
  };

  return (
    <div
      className={cn(
        "group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300",
        isHovered && "shadow-lg border-primary/20",
        !item.available && "opacity-60"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image placeholder with gradient */}
      <div className="relative h-40 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
        <Utensils className="w-12 h-12 text-primary/30" />
        
        {/* Category badge */}
        <Badge
          variant={item.category === 'special' ? 'default' : 'secondary'}
          className="absolute top-3 left-3"
        >
          {item.category === 'special' ? '⭐ Special' : item.type}
        </Badge>

        {/* Availability badge */}
        {!item.available && (
          <Badge variant="destructive" className="absolute top-3 right-3">
            Out of Stock
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1">{item.name}</h3>
          <span className="font-bold text-primary whitespace-nowrap">₹{item.price}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{item.preparationTime} mins</span>
          </div>

          {item.available ? (
            quantity > 0 ? (
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={handleDecrement}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-6 text-center font-medium">{quantity}</span>
                <Button
                  size="icon"
                  variant="default"
                  className="h-8 w-8"
                  onClick={handleIncrement}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={handleAdd} className="gap-1">
                <Plus className="w-4 h-4" />
                Add
              </Button>
            )
          ) : (
            <Button size="sm" disabled variant="secondary">
              Unavailable
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
