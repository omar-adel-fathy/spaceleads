import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import LiteYouTube from '../components/LiteYouTube';

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
          // Removed opacity fade (progress * 0.5) to fix the "باهت" overlay issue on video/button
          gsap.set('.hero-content', { y: -60 * progress });
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

  // Reusable underline component
  const HandwrittenUnderline = ({ delay = 1.2 }: { delay?: number }) => (
    <svg 
      className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-3 md:h-4 overflow-visible"
      viewBox="0 0 300 20" 
      fill="none" 
      preserveAspectRatio="none"
    >
      <path
        d="M5,15 Q50,5 100,12 T200,10 T295,15"
        stroke="#ef4444"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{
          strokeDasharray: 300,
          strokeDashoffset: 300,
          animation: `drawUnderline 1s ease-out ${delay}s forwards`,
        }}
      />
    </svg>
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-start justify-center overflow-hidden pt-[160px] pb-16"
    >
      {/* Underline animation keyframes */}
      <style>{`
        @keyframes drawUnderline {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

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
      <div className="hero-content relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow - dropping animation */}
        <div className="overflow-hidden mb-6">
          <p className="drop-text drop-text-1 text-xs md:text-sm text-black/40 uppercase tracking-[0.4em] font-bold">
            Coaches, Consultants, and Agency Owners Selling High Ticket Offers:
          </p>
        </div>

        {/* Main Headline - centered with dropping animation */}
        <div className="space-y-4 md:space-y-6 mb-10" style={{ perspective: '2000px' }}>
          <div className="overflow-hidden">
            <h1 className="drop-text drop-text-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black leading-[1.1] tracking-tight">
              We'll Build a Done-For-You
            </h1>
          </div>
          
          {/* Highlighted text - YouTube Client Acquisition System in red */}
          <div className="overflow-visible py-2">
            <div className="drop-text drop-text-3 relative inline-block">
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-red-500 leading-none tracking-tight">
                YouTube Client Acquisition System
              </span>
            </div>
          </div>
          
          <div className="overflow-visible">
            <h1 className="drop-text drop-text-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black leading-[1.1] tracking-tight">
              That Signs <span className="relative inline-block">
                <span>3-5 High-Ticket Clients</span>
                <HandwrittenUnderline delay={1.2} />
              </span>
            </h1>
          </div>
          
          <div className="overflow-visible">
            <h1 className="drop-text drop-text-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black leading-[1.1] tracking-tight">
              in <span className="relative inline-block">
                <span>90 Days</span>
                <HandwrittenUnderline delay={1.5} />
              </span> With Just <span className="relative inline-block">
                <span>3 Hours</span>
                <HandwrittenUnderline delay={1.8} />
              </span> of Filming
            </h1>
          </div>
          
          <div className="overflow-hidden">
            <h1 className="drop-text drop-text-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black leading-[1.1] tracking-tight">
              Per Month
            </h1>
          </div>

          {/* Or You Don't Pay with hand-drawn underline */}
          <div className="overflow-visible py-4">
            <h1 className="drop-text drop-text-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-black leading-[1.1] tracking-tight">
              <span className="relative inline-block">
                <span>(Or You Don't Pay)</span>
                <HandwrittenUnderline delay={2.1} />
              </span>
            </h1>
          </div>
        </div>

        {/* Subheadline */}
        <div className="overflow-hidden mb-12">
          <p className="drop-text drop-text-6 text-lg md:text-xl text-black/60 max-w-3xl mx-auto leading-relaxed font-medium">
            We handle everything from strategy, ideation, scripting, editing, thumbnails, 
            SEO, and posting. You just batch film 3-4 hours each month.{' '}
            <span className="block mt-2 text-black/30 italic font-normal">(No paid ads. No freelancers. No content grind.)</span>
          </p>
        </div>

        {/* Video Section */}
        <div className="overflow-hidden mb-12 max-w-4xl mx-auto px-4">
          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-black/5 bg-gray-100">
            <LiteYouTube 
              videoId="hCHjJyhFbU4" 
              title="YouTube video player" 
            />
          </div>
        </div>

        {/* CTA Button - Cool button style */}
        <div className="drop-text drop-text-6">
          <button
            onClick={scrollToBookCall}
            className="cool-button group relative inline-flex justify-center items-center gap-4 bg-black text-white px-12 py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(239,68,68,0.5)] hover:scale-[1.02] transition-all duration-500"
          >
            <span className="relative z-10">Book Your Discovery Call</span>
            <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:translate-x-2" />
          </button>
        </div>


      </div>

      {/* Bottom gradient fade removed below to clear dim overlay */}
    </section>
  );
};

export default Hero;
