import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const videoTestimonials = [
  {
    id: 'XK1ShDotStw',
    title: 'Client Success Story 1',
  },
  {
    id: 'VoGaznOPlXU',
    title: 'Client Success Story 2',
  },
];

const Testimonial = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main Card animation
      gsap.fromTo(
        '.testimonial-card',
        { y: 100, opacity: 0, scale: 0.9, rotateX: -10 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Video cards stagger animation
      const videoCards = containerRef.current?.querySelectorAll('.video-testimonial-card');
      if (videoCards) {
        gsap.fromTo(
          videoCards,
          { y: 150, opacity: 0, scale: 0.8, rotateY: 20 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-40 bg-white overflow-hidden"
      style={{ perspective: '1500px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 tracking-tight">
            Client <span className="text-red-500">Love</span>
          </h2>
          <p className="text-lg md:text-xl text-black/40 max-w-2xl mx-auto font-medium">
            Don't just take our word for it. Hear directly from the founders we've helped scale.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Main Text Testimonial */}
          <div className="testimonial-card relative bg-[#FAFAFA] rounded-[3rem] p-10 md:p-20 shadow-2xl border border-black/[0.03] overflow-hidden group">
            {/* Subtle Background Text */}
            <div className="absolute top-0 right-0 p-10 select-none pointer-events-none opacity-[0.02]">
              <Quote className="w-64 h-64 rotate-180" />
            </div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-1 mb-10">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-red-500 text-red-500" />
                ))}
              </div>

              <blockquote className="mb-12">
                <p className="text-2xl md:text-3xl lg:text-4xl font-black text-black leading-tight tracking-tight">
                  "In the first 30 days, one video brought us{' '}
                  <span className="text-red-500 underline decoration-black/10 underline-offset-8">16,000 views</span> and{' '}
                  <span className="text-red-500 underline decoration-black/10 underline-offset-8">20 warm calls</span> ready to buy."
                </p>
              </blockquote>

              <div className="flex flex-col items-center gap-6">
                <div className="relative w-full max-w-xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-black/[0.05]">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/TSrTVrUZw0U?si=Orm3dZb7OsQtmoEQ" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="space-y-1">
                  <p className="font-black text-xl text-black">Idriis Abu Haythami</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">CEO & Founder @ Zaad Institute</p>
                </div>
              </div>
            </div>
          </div>

          {/* Video Testimonials Grid */}
          <div ref={containerRef} className="grid sm:grid-cols-2 gap-8 md:gap-12 mt-20 md:mt-32 max-w-3xl mx-auto">
            {videoTestimonials.map((video) => (
              <div 
                key={video.id}
                className="video-testimonial-card relative aspect-[9/16] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-black shadow-2xl group cursor-pointer border border-black/[0.05] hover:shadow-red-500/20 transition-all duration-700"
              >
                {/* Video container with proper scaling for 9:16 YouTube Shorts */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <iframe 
                    src={`https://www.youtube.com/embed/${video.id}?si=cspFs_s8pHP2wBw4&controls=1&modestbranding=1&rel=0&autoplay=0&playsinline=1`} 
                    title={video.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{
                      border: 'none',
                    }}
                  />
                </div>
                
                {/* Subtle corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/5 to-transparent pointer-events-none" />

                {/* Hover Glow */}
                <div className="absolute -inset-4 bg-red-500/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-red-500/[0.03] blur-[120px] rounded-full -ml-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/[0.03] blur-[120px] rounded-full -mr-48" />
    </section>
  );
};

export default Testimonial;

