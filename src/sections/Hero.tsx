import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set('.hero-content', { y: -60 * progress, opacity: 1 - progress * 0.5 });
        },
      });
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
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[101px] pb-16"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content - Centered */}
      <div className="hero-content relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-[-10dvh]">
        {/* Eyebrow - dropping animation */}
        <div className="overflow-hidden mb-6">
          <p className="drop-text drop-text-1 text-xs md:text-sm text-black/40 uppercase tracking-[0.4em] font-bold">
            For Coaches, Consultants & Agency Owners
          </p>
        </div>

        {/* Main Headline - centered with dropping animation */}
        <div className="space-y-2 mb-10" style={{ perspective: '2000px' }}>
          <div className="overflow-hidden">
            <h1 className="drop-text drop-text-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black leading-[1.1] tracking-tight">
              We'll Build a Done-For-You
            </h1>
          </div>
          
          {/* Highlighted text with hand-drawn circle */}
          <div className="overflow-visible py-4">
            <div className="drop-text drop-text-3 relative inline-block">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-red-500 leading-none tracking-tight">
                YouTube Sales System
              </span>
              
              {/* Hand-drawn circle SVG - adjusted for better fit */}
              <svg 
                className="absolute -inset-x-8 -inset-y-6 w-[calc(100%+64px)] h-[calc(100%+48px)] pointer-events-none overflow-visible"
                viewBox="0 0 400 120" 
                fill="none" 
                preserveAspectRatio="none"
              >
                <path
                  className="hand-drawn-circle"
                  d="M10,60 C10,10 150,5 200,5 C300,5 390,10 390,60 C390,110 300,115 200,115 C100,115 10,110 10,60"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  style={{
                    filter: 'drop-shadow(0 4px 6px rgba(239, 68, 68, 0.4))',
                  }}
                />
              </svg>
            </div>
          </div>
          
          <div className="overflow-hidden">
            <h1 className="drop-text drop-text-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black leading-[1.1] tracking-tight">
              That Generates
            </h1>
          </div>
          
          <div className="overflow-hidden">
            <h1 className="drop-text drop-text-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
              <span className="text-red-500">10-20 Highly-Qualified</span>{' '}
              <span className="text-black">Calls/Month</span>
            </h1>
          </div>
        </div>

        {/* Subheadline */}
        <div className="overflow-hidden mb-12">
          <p className="drop-text drop-text-6 text-lg md:text-xl text-black/60 max-w-3xl mx-auto leading-relaxed font-medium">
            We handle everything from strategy, ideation, scripting, editing, thumbnails, 
            SEO, and posting. You just batch film 3-4 hours each month.{' '}
            <span className="block mt-2 text-black/30 italic font-normal">(No paid ads. No freelancers. Just pure organic growth.)</span>
          </p>
        </div>

        {/* Video Section */}
        <div className="overflow-hidden mb-12 max-w-4xl mx-auto px-4">
          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-black/5 bg-gray-100">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/hCHjJyhFbU4?si=x-en9kkHMyOS3BRl" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            />
          </div>
        </div>

        {/* CTA Button - Cool button style */}
        <div className="drop-text drop-text-6">
          <button
            onClick={scrollToBookCall}
            className="cool-button group relative inline-flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full font-bold text-xs md:text-sm uppercase tracking-widest hover:bg-red-600 transition-all duration-500 overflow-hidden shadow-2xl glass-hover"
          >
            <span className="relative z-10">Book Your Strategy Call</span>
            <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-2" />
          </button>
        </div>


      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAFA] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
