import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import StudentMenu from "./pages/student/StudentMenu";
import StudentOrders from "./pages/student/StudentOrders";
import Checkout from "./pages/student/Checkout";
import Dashboard from "./pages/canteen/Dashboard";
import MenuManagement from "./pages/canteen/MenuManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              
              {/* Student Routes */}
              <Route path="/student/menu" element={<StudentMenu />} />
              <Route path="/student/orders" element={<StudentOrders />} />
              <Route path="/student/checkout" element={<Checkout />} />
              
              {/* Canteen Routes */}
              <Route path="/canteen/dashboard" element={<Dashboard />} />
              <Route path="/canteen/menu" element={<MenuManagement />} />
              <Route path="/canteen/orders" element={<Dashboard />} />
              <Route path="/canteen/staff" element={<Dashboard />} />
              <Route path="/canteen/reports" element={<Dashboard />} />
              <Route path="/canteen/ai" element={<Dashboard />} />
              <Route path="/canteen/settings" element={<Dashboard />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
