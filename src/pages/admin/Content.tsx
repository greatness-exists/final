import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, FileText, Type, Video, RefreshCw, Image as ImageIcon, Sparkles, ShieldCheck } from 'lucide-react';
import ImageUpload from '@/components/admin/ImageUpload';

interface ContentItem {
  id: string;
  section: string;
  key: string;
  content: string;
  type: string;
}

export default function AdminContent() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
      try {
      const response = await fetch('/admin/api/list.php?type=site_content');
      const data = await response.json();
      setContent(data || []);
    } catch (error) {
      toast.error('Failed to fetch content');
    }
    setLoading(false);
  };

  const handleUpdate = async (id: string, newContent: string) => {
    setSaving(id);
      try {
      const response = await fetch('/admin/api/save.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          type: 'site_content',
          id: id,
          updates: { content: newContent }
        })
      });
      const result = await response.json();
      
      if (result.success) {
        toast.success('Content updated');
        setContent(prev => prev.map(item => item.id === id ? { ...item, content: newContent } : item));
      } else {
        throw new Error(result.error || 'Failed to update content');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update content');
    }
    setSaving(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary opacity-20" />
      </div>
    );
  }

  const sections = Array.from(new Set(content.map(item => item.section)));

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-4 border-b border-primary/5">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-primary/5">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-6xl font-serif font-bold text-foreground tracking-tighter">
              Site Content
            </h1>
          </div>
          <p className="text-muted-foreground font-sans uppercase tracking-[0.4em] text-[10px] font-bold opacity-60 ml-16">Narrative & Visual Assets</p>
        </div>
        <Button onClick={fetchContent} variant="outline" className="gap-2 h-14 px-6 font-sans uppercase tracking-widest text-[10px] font-bold border-primary/10 hover:bg-primary/5 rounded-2xl transition-all">
          <RefreshCw className="w-3.5 h-3.5" /> Synchronize
        </Button>
      </div>

      <Tabs defaultValue={sections[0]} className="w-full space-y-10">
        <div className="sticky top-28 z-40 py-2 -mx-4 px-4 bg-background/0 pointer-events-none">
          <TabsList className="pointer-events-auto h-16 bg-white/60 backdrop-blur-2xl p-1.5 rounded-[1.5rem] border border-primary/5 shadow-xl inline-flex w-full md:w-auto overflow-x-auto scrollbar-hide">
            {sections.map(section => (
              <TabsTrigger 
                key={section} 
                value={section} 
                className="capitalize px-10 rounded-2xl font-serif text-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-xl transition-all h-full"
              >
                {section}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {sections.map(section => (
          <TabsContent key={section} value={section} className="mt-0 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="grid gap-10">
              {content
                .filter(item => item.section === section)
                .map(item => (
                  <Card key={item.id} className="overflow-hidden border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-white/60 backdrop-blur-xl rounded-[3rem] group transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]">
                    <CardHeader className="bg-primary/5 pb-8 pt-10 px-10 border-b border-primary/5">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-3xl capitalize flex items-center gap-4 font-serif">
                            <div className="p-2.5 rounded-xl bg-primary/10">
                              {item.type === 'image' && <ImageIcon className="w-6 h-6 text-primary" />}
                              {item.type === 'video' && <Video className="w-6 h-6 text-primary" />}
                              {item.type === 'text' && <Type className="w-6 h-6 text-primary" />}
                            </div>
                            {item.key.replace(/_/g, ' ')}
                          </CardTitle>
                          <CardDescription className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold opacity-30 ml-14">
                            Identifier: {item.key}
                          </CardDescription>
                        </div>
                        {saving === item.id && (
                          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary animate-pulse">
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span className="text-[10px] font-sans uppercase tracking-widest font-bold">Syncing</span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-10 space-y-8">
                      {item.type === 'text' ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between px-2">
                            <Label htmlFor={item.id} className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground opacity-60">Narrative Content</Label>
                            <span className="text-[10px] font-sans text-muted-foreground opacity-30">{item.content.length} characters</span>
                          </div>
                          {item.content.length > 100 || item.key.includes('description') ? (
                            <Textarea
                              id={item.id}
                              value={item.content}
                              className="min-h-[220px] font-sans text-xl bg-white/40 border-primary/5 focus:border-primary/20 transition-all rounded-[2rem] p-8 leading-relaxed shadow-inner"
                              onChange={(e) => setContent(prev => prev.map(i => i.id === item.id ? { ...i, content: e.target.value } : i))}
                              onBlur={(e) => {
                                const original = content.find(i => i.id === item.id)?.content;
                                if (e.target.value !== original) handleUpdate(item.id, e.target.value);
                              }}
                            />
                          ) : (
                            <Input
                              id={item.id}
                              value={item.content}
                              className="font-sans text-xl h-20 bg-white/40 border-primary/5 focus:border-primary/20 transition-all rounded-3xl px-8 shadow-inner"
                              onChange={(e) => setContent(prev => prev.map(i => i.id === item.id ? { ...i, content: e.target.value } : i))}
                              onBlur={(e) => {
                                const original = content.find(i => i.id === item.id)?.content;
                                if (e.target.value !== original) handleUpdate(item.id, e.target.value);
                              }}
                            />
                          )}
                        </div>
                      ) : item.type === 'image' ? (
                        <div className="max-w-4xl">
                          <ImageUpload 
                            label="Visual Asset" 
                            currentUrl={item.content} 
                            onUpload={(url) => handleUpdate(item.id, url)} 
                          />
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <Label htmlFor={item.id} className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground opacity-60 ml-2">Media Stream URL</Label>
                            <Input
                              id={item.id}
                              value={item.content}
                              className="font-sans text-xl h-20 bg-white/40 border-primary/5 focus:border-primary/20 transition-all rounded-3xl px-8 shadow-inner"
                              onChange={(e) => setContent(prev => prev.map(i => i.id === item.id ? { ...i, content: e.target.value } : i))}
                              onBlur={(e) => {
                                const original = content.find(i => i.id === item.id)?.content;
                                if (e.target.value !== original) handleUpdate(item.id, e.target.value);
                              }}
                            />
                          </div>
                          <div className="relative aspect-video max-w-4xl rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl bg-black">
                            <video 
                              src={item.content} 
                              key={item.content}
                              className="w-full h-full object-cover"
                              controls
                            />
                            <div className="absolute top-6 left-6 flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                              <span className="text-[9px] text-white font-sans uppercase tracking-[0.3em] font-bold">Stream Preview</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="bg-primary/5 py-6 px-10 border-t border-primary/5 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 text-[9px] font-sans uppercase tracking-[0.4em] text-muted-foreground font-bold opacity-40">
                          <Sparkles className="w-3 h-3 text-primary/40" /> Refined Boutique Experience
                        </span>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground flex items-center gap-3 font-bold opacity-60">
                        {saving === item.id ? (
                          <><Loader2 className="w-3.5 h-3.5 animate-spin text-primary" /> Securing Changes...</>
                        ) : (
                          <><ShieldCheck className="w-3.5 h-3.5 text-primary/40" /> Sanctuary Sync Active</>
                        )}
                      </span>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
    );
}

