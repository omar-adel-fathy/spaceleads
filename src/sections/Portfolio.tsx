import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const portfolioVideos = [
  { id: '31hoLdxFtes', title: 'Client Work 1' },
  { id: '4UQ9LLOU6PM', title: 'Client Work 2' },
  { id: 'qc26rDe1uio', title: 'Client Work 3' },
  { id: 'F5nI1yppWcc', title: 'Client Work 4' },
  { id: 'Yev5ouUo6PU', title: 'Client Work 5' },
  { id: 'qpNsKYcsP5c', title: 'Client Work 6' },
];

// Scattered positions for gallery effect
const videoPositions = [
  { rotate: -3 },
  { rotate: 4 },
  { rotate: -2 },
  { rotate: 3 },
  { rotate: -4 },
  { rotate: 2 },
];

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Gallery items pop from nothing animation - FAST
      const items = galleryRef.current?.querySelectorAll('.gallery-item');
      if (items) {
        gsap.fromTo(
          items,
          { scale: 0, opacity: 0, rotate: -15, y: 50 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            y: 0,
            duration: 0.4,
            stagger: { each: 0.06, from: 'center' },
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Iframe fade-in after container animation
      const iframes = galleryRef.current?.querySelectorAll('.video-iframe');
      if (iframes) {
        gsap.fromTo(
          iframes,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            stagger: { each: 0.08, from: 'center' },
            delay: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top 85%',
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
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 tracking-tight">
            Some of Our <span className="text-red-500">Work</span>
          </h2>
          <p className="text-lg md:text-xl text-black/40 max-w-2xl mx-auto font-medium">
            Videos built to attract and nurture the right audience, turning viewers into high-ticket clients.
          </p>
        </div>

        {/* Circular Gallery Layout */}
        <div
          ref={galleryRef}
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {portfolioVideos.map((video, index) => {
            const pos = videoPositions[index % videoPositions.length];
            return (
              <div
                key={video.id}
                className="gallery-item relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-10 bg-black"
                style={{ transform: `rotate(${pos.rotate}deg)` }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="video-iframe absolute inset-0 w-full h-full transition-opacity duration-500"
                  style={{ border: 'none' }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle background accents */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-red-500/5 blur-[100px] rounded-full -ml-36 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-red-500/5 blur-[100px] rounded-full -mr-36 pointer-events-none" />
    </section>
  );
};

export default Portfolio;
