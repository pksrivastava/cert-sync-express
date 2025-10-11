import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import PartnerRegister from "./pages/PartnerRegister";
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Partners from "./pages/admin/Partners";
import Courses from "./pages/admin/Courses";
import Settings from "./pages/admin/Settings";
import CourseEditor from "./pages/CourseEditor";
import SSOIntegration from "./pages/SSOIntegration";
import CertificateTemplates from "./pages/admin/CertificateTemplates";
import ContentCMS from "./pages/admin/ContentCMS";
import TrainingCalendar from "./pages/admin/TrainingCalendar";
import KnowledgeCentre from "./pages/KnowledgeCentre";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/partner-register" element={<PartnerRegister />} />
          <Route path="/knowledge-centre" element={<KnowledgeCentre />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="partners" element={<Partners />} />
            <Route path="courses" element={<Courses />} />
            <Route path="course/:id" element={<CourseEditor />} />
            <Route path="certificates" element={<CertificateTemplates />} />
            <Route path="training-calendar" element={<TrainingCalendar />} />
            <Route path="content-cms" element={<ContentCMS />} />
            <Route path="sso-integration" element={<SSOIntegration />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
