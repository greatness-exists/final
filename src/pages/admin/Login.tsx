import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simple mock login - real security is handled by .htaccess basic auth
      // In a real cPanel environment, the browser will ask for credentials
      // before this page even loads.
      localStorage.setItem('admin_authenticated', 'true');
      toast.success('Welcome back to your sanctuary');
      navigate(from, { replace: true });
    } catch (error: any) {
            toast.error('Access denied');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-background">
      {/* Background Image - Matching Home Hero */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-[20000ms] scale-110 animate-pulse-slow"
         style={{ backgroundImage: 'url("/ILoveKOSA.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px]" />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-8 animate-in fade-in zoom-in duration-1000">
        <div className="text-center space-y-2">
          <h1 className="text-7xl font-serif font-bold text-white tracking-tighter drop-shadow-2xl">ko-sa.</h1>
          <p className="text-white/60 font-sans uppercase tracking-[0.4em] text-[10px] font-bold">Breathe and Reconnect</p>
        </div>

        <Card className="border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] bg-white/10 backdrop-blur-2xl rounded-[3rem] overflow-hidden border border-white/20">
          <CardHeader className="space-y-1 text-center pb-8 pt-10 px-8">
            <CardTitle className="text-3xl font-serif font-light text-white">Admin Access</CardTitle>
            <CardDescription className="text-white/40 font-sans uppercase tracking-widest text-[9px] font-bold">
              Secure Management Portal
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="grid gap-6 px-10">
              <div className="grid gap-2.5">
                <Label htmlFor="email" className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/50 ml-1">Identity</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@kosa.com"
                  className="h-14 bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/20 transition-all rounded-2xl px-6 text-lg font-sans"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2.5">
                <Label htmlFor="password" title="Secure Key" className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/50 ml-1">Secure Key</Label>
                <Input
                  id="password"
                  type="password"
                  className="h-14 bg-white/5 border-white/10 focus:border-white/30 text-white transition-all rounded-2xl px-6 text-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="p-10 pt-6">
              <Button 
                className="w-full h-16 text-xl font-serif rounded-2xl bg-white text-black hover:bg-white/90 transition-all shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 active:translate-y-0" 
                type="submit" 
                disabled={loading}
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Enter Sanctuary'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      
      <div className="absolute bottom-12 left-0 right-0 text-center z-10 opacity-40">
        <p className="text-white text-[10px] uppercase tracking-[0.5em] font-sans">
          Eco-Conscious Retreat &middot; Elmina
        </p>
      </div>
    </div>
  );
}