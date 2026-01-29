import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      {/* Fixed Background with Atmosphere - Matching Home Aesthetic */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ 
          backgroundImage: 'url("/772A2174.jpg")', 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />
      </div>

              <div className="relative z-10 flex flex-col min-h-screen overflow-y-auto">
          <AdminNavbar />
          <main className="flex-grow container mx-auto py-8 px-4 max-w-7xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <Outlet />
          </main>
          
          <footer className="container mx-auto py-8 px-4 text-center opacity-40">
            <p className="text-[10px] uppercase tracking-[0.4em] font-sans">
              KO-SA Beach Resort &middot; Management Portal &middot; Elmina, Ghana
            </p>
          </footer>
        </div>
    </div>
  );
}