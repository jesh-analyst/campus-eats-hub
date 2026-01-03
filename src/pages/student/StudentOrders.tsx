import { useState } from 'react';
import { StudentHeader } from '@/components/student/StudentHeader';
import { OrderCard } from '@/components/student/OrderCard';
import { sampleOrders } from '@/data/orders';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClipboardList, Clock, CheckCircle2 } from 'lucide-react';

const StudentOrders = () => {
  const [activeTab, setActiveTab] = useState('active');

  const activeOrders = sampleOrders.filter(
    (order) => ['pending', 'accepted', 'preparing', 'ready'].includes(order.status)
  );
  
  const pastOrders = sampleOrders.filter(
    (order) => ['completed', 'cancelled'].includes(order.status)
  );

  return (
    <div className="min-h-screen bg-background">
      <StudentHeader />
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <ClipboardList className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="active" className="gap-2">
              <Clock className="w-4 h-4" />
              Active ({activeOrders.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Past ({pastOrders.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeOrders.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-xl border border-border">
                <ClipboardList className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No active orders</p>
                <p className="text-sm text-muted-foreground/70">
                  Your current orders will appear here
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {activeOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastOrders.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-xl border border-border">
                <CheckCircle2 className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No past orders</p>
                <p className="text-sm text-muted-foreground/70">
                  Your order history will appear here
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {pastOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentOrders;
