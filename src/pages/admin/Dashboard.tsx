import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Image as ImageIcon, Bed, FileText, ExternalLink, RefreshCw, LayoutDashboard, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    contentCount: 0,
    galleryCount: 0,
    roomCount: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    const [contentRes, galleryRes, roomsRes] = await Promise.all([
      supabase.from('site_content').select('id', { count: 'exact', head: true }),
      supabase.from('gallery').select('id', { count: 'exact', head: true }),
      supabase.from('rooms').select('id', { count: 'exact', head: true })
    ]);

    setStats({
      contentCount: contentRes.count || 0,
      galleryCount: galleryRes.count || 0,
      roomCount: roomsRes.count || 0,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
      </div>
    );
  }

  const cards = [
    { 
      title: 'Site Content', 
      count: stats.contentCount, 
      desc: 'Editable texts & visuals', 
      icon: FileText, 
      link: '/admin/content',
      color: 'bg-primary'
    },
    { 
      title: 'Resort Gallery', 
      count: stats.galleryCount, 
      desc: 'Active photo collection', 
      icon: ImageIcon, 
      link: '/admin/gallery',
      color: 'bg-primary'
    },
    { 
      title: 'Room Types', 
      count: stats.roomCount, 
      desc: 'Accommodation listings', 
      icon: Bed, 
      link: '/admin/rooms',
      color: 'bg-primary'
    }
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-4 border-b border-primary/5">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/5">
              <LayoutDashboard className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-6xl font-serif font-bold text-foreground tracking-tighter">
              Overview
            </h1>
          </div>
          <p className="text-muted-foreground font-sans uppercase tracking-[0.4em] text-[10px] font-bold opacity-60 ml-16">Sanctuary Management Control</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Button variant="outline" onClick={fetchStats} className="flex-1 md:flex-none gap-2 h-14 px-6 font-sans uppercase tracking-widest text-[10px] font-bold border-primary/10 hover:bg-primary/5 rounded-2xl transition-all">
            <RefreshCw className="w-3.5 h-3.5" /> Sync Data
          </Button>
          <Link to="/" target="_blank" className="flex-1 md:flex-none">
            <Button className="w-full gap-3 font-serif text-xl h-14 px-8 rounded-2xl shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transition-all">
              <ExternalLink className="w-5 h-5" /> Live Site
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {cards.map((card, i) => (
          <Card key={card.title} className="relative overflow-hidden group border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-white/60 backdrop-blur-xl rounded-[2.5rem] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${i * 100}ms` }}>
            <div className={`absolute top-0 left-0 w-full h-1.5 ${card.color} opacity-10 group-hover:opacity-100 transition-opacity duration-700`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-8 px-8">
              <CardTitle className="text-[10px] font-sans uppercase tracking-[0.3em] font-bold text-muted-foreground/40">{card.title}</CardTitle>
              <div className="p-3 rounded-2xl bg-primary/5 group-hover:bg-primary/10 transition-colors">
                <card.icon className="h-5 w-5 text-primary/60 group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8 pt-4">
              <div className="text-6xl font-serif font-bold tracking-tighter group-hover:scale-105 transition-transform duration-700 origin-left">{card.count}</div>
              <p className="text-xs text-muted-foreground mt-4 font-sans tracking-wide leading-relaxed opacity-60">{card.desc}</p>
              <Button asChild variant="ghost" className="w-full mt-10 h-16 justify-between rounded-2xl bg-primary/5 hover:bg-primary hover:text-white transition-all duration-500 group/btn px-6 border border-primary/5">
                <Link to={card.link} className="flex items-center justify-between w-full font-serif text-xl">
                  Manage <Sparkles className="w-5 h-5 opacity-0 group-hover/btn:opacity-100 transition-all -translate-x-4 group-hover/btn:translate-x-0" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-3 border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-white/40 backdrop-blur-xl rounded-[3rem] overflow-hidden">
          <CardHeader className="bg-primary/5 p-10 border-b border-primary/5">
            <CardTitle className="font-serif text-3xl flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              Boutique Manager Tools
            </CardTitle>
            <CardDescription className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 mt-2 ml-14">Refine your guest experience</CardDescription>
          </CardHeader>
          <CardContent className="p-10 grid sm:grid-cols-2 gap-8">
            <div className="space-y-4 p-6 rounded-[2rem] bg-white/50 border border-primary/5 hover:border-primary/20 transition-all duration-500 hover:shadow-xl group">
              <div className="bg-primary/5 p-4 rounded-2xl w-fit group-hover:bg-primary/10 transition-colors">
                <ImageIcon className="h-6 w-6 text-primary/60" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold">Cloud Assets</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed opacity-70">Seamlessly upload and manage high-resolution photography without manual file handling.</p>
              </div>
            </div>
            <div className="space-y-4 p-6 rounded-[2rem] bg-white/50 border border-primary/5 hover:border-primary/20 transition-all duration-500 hover:shadow-xl group">
              <div className="bg-primary/5 p-4 rounded-2xl w-fit group-hover:bg-primary/10 transition-colors">
                <FileText className="h-6 w-6 text-primary/60" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold">Dynamic Copy</p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed opacity-70">Update your resort narrative and descriptions in real-time. Keep your story fresh and inviting.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-primary/5 rounded-[3rem] overflow-hidden border border-primary/5 flex flex-col">
          <CardHeader className="p-10 pb-6">
            <CardTitle className="text-primary font-serif text-3xl flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-primary/10">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              Sanctuary Health
            </CardTitle>
            <CardDescription className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 mt-2 ml-14">Operational Integrity</CardDescription>
          </CardHeader>
          <CardContent className="p-10 pt-4 flex-grow space-y-4">
            <div className="space-y-4">
              {[
                { label: 'Database', status: 'Optimal', active: true },
                { label: 'Media CDN', status: 'Active', active: true },
                { label: 'Cloud Sync', status: 'Encrypted', active: true }
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-6 rounded-2xl bg-white/40 border border-white/20 shadow-sm">
                  <span className="text-[10px] font-sans uppercase tracking-[0.3em] font-bold opacity-40">{item.label}</span>
                  <span className="flex items-center gap-2.5 text-primary font-serif text-xl">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary),0.5)]" /> 
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/10">
                <span className="text-[9px] font-sans uppercase tracking-[0.5em] opacity-40">Secure Session Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}