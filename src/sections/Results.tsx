import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DepthDeckCarousel from '../components/DepthDeckCarousel';

gsap.registerPlugin(ScrollTrigger);

const Results = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Carousel fade-up
      gsap.fromTo(
        carouselRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="results"
      ref={sectionRef}
      className="relative py-8 md:py-10 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 tracking-tight">
            Our <span className="text-red-500">Results</span>
          </h2>
          <p className="text-lg md:text-xl text-black/40 max-w-2xl mx-auto font-medium text-balance">
            Real numbers from real clients. This is what happens when strategy{' '}
            <span className="whitespace-nowrap">meets execution.</span>
          </p>
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative">
          <DepthDeckCarousel />
        </div>
      </div>

      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
    </section>
  );
};

export default Results;
