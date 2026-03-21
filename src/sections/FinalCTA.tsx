import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Check, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animations temporarily disabled
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToBookCall = () => {
    const element = document.querySelector('#book-call');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-24 md:py-48 bg-white overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={contentRef}
          className="bg-black rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group"
        >
          {/* Internal Glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-red-500/20 blur-[80px] rounded-full group-hover:bg-red-500/30 transition-all duration-1000" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-red-500/20 blur-[80px] rounded-full group-hover:bg-red-500/30 transition-all duration-1000" />

          {/* Super Heading */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-white/10">
            <Sparkles className="w-3 h-3 text-red-500" />
            <span>Last Opportunity</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
            Still <span className="text-red-500">Scrolling?</span>
          </h2>

          <p className="text-lg md:text-xl text-white/40 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Stop guessing. Start dominating. Book your free discovery call and let's install the YouTube Client Acquisition System into your business today.
          </p>

          {/* Massive Button */}
          <div className="flex flex-col items-center gap-8">
            <button
              onClick={scrollToBookCall}
              className="group relative flex items-center gap-4 bg-red-500 hover:bg-red-600 text-white px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(239,68,68,0.5)] hover:shadow-red-500/60 hover:-translate-y-2 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <Calendar className="w-5 h-5" />
              <span>Secure Your discovery Session</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </button>

            {/* Features list */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {['No Fluff', 'Pure ROI', 'Free Custom Strategy'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                  <Check className="w-4 h-4 text-red-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
