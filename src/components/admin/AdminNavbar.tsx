import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Home, LayoutDashboard, FileEdit, Image as ImageIcon, Bed, Menu, X, Sparkles, FolderOpen } from 'lucide-react';import { toast } from 'sonner';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
localStorage.removeItem('admin_authenticated');    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Content', path: '/admin/content', icon: FileEdit },
    { label: 'Rooms', path: '/admin/rooms', icon: Bed },
    { label: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
        { label: 'Files', path: '/admin/files', icon: FolderOpen },

  ];

  return (
    <nav className="bg-white/40 backdrop-blur-2xl sticky top-0 z-50 border-b border-primary/5 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-500">
      <div className="container mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-16">
          <Link to="/admin" className="group flex flex-col">
            <span className="text-4xl font-serif font-bold text-primary tracking-tighter transition-all group-hover:tracking-normal group-hover:scale-105">ko-sa.</span>
            <span className="text-[9px] font-sans font-bold tracking-[0.5em] uppercase text-muted-foreground/60 -mt-1 ml-0.5">Sanctuary Manager</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-6 py-2.5 rounded-2xl text-[11px] font-sans uppercase tracking-[0.15em] font-bold transition-all flex items-center gap-2.5 relative group",
                  location.pathname === item.path 
                    ? "text-primary bg-primary/5" 
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                )}
              >
                <item.icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", location.pathname === item.path ? "text-primary" : "text-muted-foreground/40")} />
                {item.label}
                {location.pathname === item.path && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" target="_blank">
              <Button variant="ghost" size="sm" className="gap-2 font-sans uppercase tracking-widest text-[9px] font-bold opacity-60 hover:opacity-100 transition-opacity">
                <Home className="w-3 h-3" /> Visit Resort
              </Button>
            </Link>
            <div className="h-6 w-px bg-primary/10 mx-2" />
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 border-primary/20 text-primary hover:bg-primary hover:text-white font-sans uppercase tracking-widest text-[9px] font-bold rounded-xl px-5 h-10 transition-all shadow-sm hover:shadow-md" 
              onClick={handleLogout}
            >
              <LogOut className="w-3 h-3" /> Sign Out
            </Button>
          </div>

          <button 
            className="lg:hidden p-3 rounded-2xl bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-24 z-50 bg-white/95 backdrop-blur-3xl p-8 flex flex-col gap-6 animate-in slide-in-from-top-12 duration-500">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground mb-6 opacity-40">Navigation</p>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-6 py-5 rounded-[2rem] text-2xl font-serif flex items-center justify-between transition-all",
                  location.pathname === item.path 
                    ? "bg-primary text-white shadow-2xl" 
                    : "text-muted-foreground active:bg-primary/5"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-4">
                  <item.icon className="w-6 h-6" />
                  {item.label}
                </div>
                {location.pathname === item.path && <Sparkles className="w-5 h-5" />}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pt-8 border-t border-primary/5 flex flex-col gap-4">
            <Link to="/" target="_blank" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-4 px-6 h-16 font-serif text-xl rounded-[1.5rem]">
                <Home className="w-5 h-5" /> Visit Website
              </Button>
            </Link>
            <Button 
              variant="default" 
              className="w-full justify-start gap-4 px-6 h-16 font-serif text-xl rounded-[1.5rem] bg-red-50 text-red-600 hover:bg-red-100 border-none" 
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
            >
              <LogOut className="w-5 h-5" /> Logout
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}