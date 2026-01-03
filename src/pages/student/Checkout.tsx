import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { StudentHeader } from '@/components/student/StudentHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Banknote, QrCode, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cash'>('online');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [tokenNumber, setTokenNumber] = useState<number | null>(null);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const newTokenNumber = Math.floor(Math.random() * 100) + 1;
    setTokenNumber(newTokenNumber);
    setOrderPlaced(true);
    clearCart();
    
    toast.success('Order placed successfully!');
    setIsProcessing(false);
  };

  if (items.length === 0 && !orderPlaced) {
    navigate('/student/menu');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <StudentHeader />
        <main className="container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="max-w-md w-full text-center animate-slide-up">
            <CardContent className="pt-8 pb-6 space-y-6">
              <div className="w-20 h-20 rounded-full gradient-primary mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
                <p className="text-muted-foreground">
                  Your order has been received and is being prepared
                </p>
              </div>

              <div className="bg-secondary rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-1">Your Token Number</p>
                <p className="text-5xl font-bold text-primary">#{tokenNumber}</p>
              </div>

              <div className="text-sm text-muted-foreground">
                {paymentMethod === 'cash' ? (
                  <p>Please pay ₹{totalAmount} at the counter when collecting</p>
                ) : (
                  <p>Payment confirmed. Show this token at the counter</p>
                )}
              </div>

              <div className="space-y-3 pt-4">
                <Button onClick={() => navigate('/student/orders')} className="w-full">
                  Track Order
                </Button>
                <Button variant="outline" onClick={() => navigate('/student/menu')} className="w-full">
                  Order More
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <StudentHeader />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.menuItem.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.menuItem.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} x ₹{item.menuItem.price}
                    </p>
                  </div>
                  <span className="font-semibold">
                    ₹{item.menuItem.price * item.quantity}
                  </span>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">₹{totalAmount}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as 'online' | 'cash')}
                className="space-y-3"
              >
                <Label
                  htmlFor="online"
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                    paymentMethod === 'online'
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <RadioGroupItem value="online" id="online" />
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Online Payment</p>
                    <p className="text-sm text-muted-foreground">Pay via UPI / QR Code</p>
                  </div>
                </Label>

                <Label
                  htmlFor="cash"
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                    paymentMethod === 'cash'
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <RadioGroupItem value="cash" id="cash" />
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Banknote className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Pay at Counter</p>
                    <p className="text-sm text-muted-foreground">Cash payment when collecting</p>
                  </div>
                </Label>
              </RadioGroup>

              {paymentMethod === 'online' && (
                <div className="bg-secondary rounded-xl p-6 text-center space-y-3">
                  <div className="w-32 h-32 bg-card border border-border rounded-lg mx-auto flex items-center justify-center">
                    <QrCode className="w-20 h-20 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Scan this QR code to pay ₹{totalAmount}
                  </p>
                </div>
              )}

              <Button
                size="lg"
                className="w-full"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    {paymentMethod === 'cash' ? 'Place Order' : `Pay ₹${totalAmount}`}
                  </span>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
