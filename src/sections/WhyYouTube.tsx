import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Magnet, Timer, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Magnet,
    title: 'Demand Capture',
    description:
      "YouTube is the world's second-largest search engine — and with a strategy built around your ICP, we put your content directly in front of buyers who are already looking.",
  },
  {
    icon: Timer,
    title: 'Evergreen',
    description:
      "The content on YouTube doesn't expire. Once momentum kicks in, your videos keep attracting and qualifying leads on autopilot for years — no ad spend required.",
  },
  {
    icon: BarChart3,
    title: 'Increased Conversion',
    description:
      "YouTube doesn't operate in a vacuum. Long-form video warms your audience before they ever hit your funnel — lifting conversion rates across every other channel you run.",
  },
];

const WhyYouTube = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.benefit-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
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
      id="why-youtube"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading - centered */}
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center mb-16 md:mb-20 text-black tracking-tight flex flex-col items-center justify-center gap-2"
        >
          <span>This Is Why YouTube Is The</span>
          <span className="relative inline-block">
            <span className="text-red-500">#1</span> Client Getting Machine
          </span>
        </h2>

        {/* Benefits Grid - centered cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-8 md:gap-12"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card group relative p-10 rounded-[2.5rem] bg-[#FAFAFA] border border-black/[0.03] hover:border-red-500/20 hover:bg-white hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] transition-all duration-700 card-lift text-center overflow-hidden"
            >
              {/* Animated background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              {/* Icon Container */}
              <div className="relative w-20 h-20 mx-auto mb-8 rounded-[1.75rem] bg-white shadow-sm border border-black/[0.03] flex items-center justify-center group-hover:bg-red-500 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <benefit.icon className="w-10 h-10 text-red-500 group-hover:text-white transition-all duration-500 ease-out" strokeWidth={1.5} />
                
                {/* Small decorative dot */}
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-red-500/20 group-hover:bg-white/40 transition-colors" />
              </div>

              {/* Content */}
              <h3 className="relative text-2xl font-black text-black mb-4 group-hover:text-red-500 transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="relative text-black/50 leading-relaxed text-base font-medium">
                {benefit.description}
              </p>

              {/* Bottom bar decorative */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/0 to-transparent group-hover:via-red-500/20 transition-all duration-700 transform scale-x-0 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyYouTube;
