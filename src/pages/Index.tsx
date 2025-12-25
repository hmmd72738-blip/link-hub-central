import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  Link2, 
  Sparkles, 
  BarChart3, 
  Palette, 
  Smartphone,
  ArrowRight,
  Check
} from 'lucide-react';

export default function Index() {
  const { user, loading } = useAuth();

  const features = [
    {
      icon: Link2,
      title: 'সহজ লিংক ম্যানেজমেন্ট',
      description: 'সব সোশ্যাল মিডিয়া এবং গুরুত্বপূর্ণ লিংক এক জায়গায়',
    },
    {
      icon: BarChart3,
      title: 'ক্লিক অ্যানালিটিক্স',
      description: 'প্রতিটি লিংকের পারফরম্যান্স ট্র্যাক করুন',
    },
    {
      icon: Palette,
      title: 'কাস্টমাইজেশন',
      description: 'আপনার ব্র্যান্ড অনুযায়ী থিম এবং কালার',
    },
    {
      icon: Smartphone,
      title: 'মোবাইল ফার্স্ট',
      description: 'সব ডিভাইসে পারফেক্ট দেখায়',
    },
  ];

  return (
    <div className="min-h-screen gradient-bg overflow-hidden">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-card/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-card/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-card/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-glow">
              <Link2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">Bio Link</span>
          </div>
          
          <div className="flex items-center gap-3">
            {loading ? null : user ? (
              <Button variant="gradient" asChild>
                <Link to="/admin">
                  ড্যাশবোর্ড
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth">লগইন</Link>
                </Button>
                <Button variant="gradient" asChild>
                  <Link to="/auth">
                    শুরু করুন
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-4 pt-16 pb-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 text-sm opacity-0 animate-fade-up">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">সম্পূর্ণ বিনামূল্যে</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight opacity-0 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            আপনার সব লিংক
            <br />
            <span className="gradient-text">এক জায়গায়</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            সোশ্যাল মিডিয়া, ওয়েবসাইট, পোর্টফোলিও - সব কিছুর জন্য একটি সুন্দর Bio Link পেজ তৈরি করুন
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="gradient" size="xl" asChild>
              <Link to="/auth">
                বিনামূল্যে শুরু করুন
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/demo">
                ডেমো দেখুন
              </Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card rounded-2xl p-6 text-center space-y-4 opacity-0 animate-fade-up hover:scale-[1.02] transition-transform"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="mt-24 max-w-2xl mx-auto">
          <div className="glass-card rounded-3xl p-8 space-y-6 opacity-0 animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <h2 className="text-2xl font-display font-bold text-center">কেন Bio Link?</h2>
            <div className="grid gap-4">
              {[
                'সেকেন্ডে প্রোফাইল তৈরি করুন',
                'সোশ্যাল মিডিয়া আইকন সাপোর্ট',
                'রিয়েল-টাইম ক্লিক ট্র্যাকিং',
                'মোবাইল অপ্টিমাইজড ডিজাইন',
                'কাস্টম ইউজারনেম',
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Link2 className="w-5 h-5 text-primary" />
              <span className="font-display font-semibold">Bio Link</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Bio Link. সর্বস্বত্ব সংরক্ষিত।
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
