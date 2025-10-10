import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <SidebarProvider>
        <div className="flex-1 flex w-full pt-20">
          <AdminSidebar />
          
          <main className="flex-1 bg-muted/30">
            <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-20 z-10">
              <div className="container mx-auto px-4 py-3 flex items-center">
                <SidebarTrigger />
              </div>
            </div>
            
            <div className="container mx-auto px-4 py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>

      <Footer />
    </div>
  );
}
