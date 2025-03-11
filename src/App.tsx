
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import HealthMetricsDetailPage from "./pages/HealthMetricsDetailPage";
import HealthGoalsDetailPage from "./pages/HealthGoalsDetailPage";
import MedicalHistoryDetailPage from "./pages/MedicalHistoryDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<ProfileDetailPage />} />
          <Route path="/health-metrics" element={<HealthMetricsDetailPage />} />
          <Route path="/health-goals" element={<HealthGoalsDetailPage />} />
          <Route path="/medical-history" element={<MedicalHistoryDetailPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
