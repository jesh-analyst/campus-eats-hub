import { CanteenLayout } from '@/components/canteen/CanteenLayout';
import { StatsCard } from '@/components/canteen/StatsCard';
import { OrderManagementCard } from '@/components/canteen/OrderManagementCard';
import { sampleOrders } from '@/data/orders';
import { useState } from 'react';
import { Order } from '@/types';
import { ClipboardList, IndianRupee, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);

  const activeOrders = orders.filter(
    (order) => ['pending', 'accepted', 'preparing', 'ready'].includes(order.status)
  );

  const todayStats = {
    totalOrders: 45,
    revenue: 12580,
    avgOrderValue: 280,
    activeCustomers: 23,
  };

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date() }
          : order
      )
    );
  };

  const handlePaymentChange = (orderId: string, paymentStatus: 'paid' | 'unpaid', method?: 'cash' | 'online') => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, paymentStatus, paymentMethod: method, updatedAt: new Date() }
          : order
      )
    );
  };

  return (
    <CanteenLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
          </div>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Today's Orders"
            value={todayStats.totalOrders}
            icon={ClipboardList}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Revenue"
            value={`₹${todayStats.revenue.toLocaleString()}`}
            icon={IndianRupee}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Avg Order Value"
            value={`₹${todayStats.avgOrderValue}`}
            icon={TrendingUp}
            trend={{ value: 3, isPositive: false }}
          />
          <StatsCard
            title="Active Customers"
            value={todayStats.activeCustomers}
            icon={Users}
          />
        </div>

        {/* Active Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Active Orders
              </CardTitle>
              <Badge variant="secondary">{activeOrders.length} orders</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {activeOrders.length === 0 ? (
              <div className="text-center py-12">
                <ClipboardList className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No active orders</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {activeOrders.map((order) => (
                  <OrderManagementCard
                    key={order.id}
                    order={order}
                    onStatusChange={handleStatusChange}
                    onPaymentChange={handlePaymentChange}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </CanteenLayout>
  );
};

export default Dashboard;
