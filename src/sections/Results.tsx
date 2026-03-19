import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const results = [
  {
    metric: '30+',
    label: 'booked calls per month',
    description:
      "In just 5 months, we turned Taylor's YouTube channel into a lead-generating machine that books 5-10 calls a week.",
  },
  {
    metric: '$66,000',
    label: 'added from Youtube',
    description:
      'With just 2.3K subscribers, YouTube helped him close a $5.5K/month deal on a 12-month contract.',
  },
  {
    metric: '$13,500',
    label: 'Client signed from Youtube',
    description:
      'In 10 months, we grew his channel from near zero to 13K+ subscribers—driving paid community members and high-ticket corporate deals.',
  },
  {
    metric: '$250,000',
    label: 'in pipeline from Youtube',
    description:
      'We achieved this by uploading 5 YouTube videos on a brand new channel.',
  },
];

const Results = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [animatedMetrics, setAnimatedMetrics] = useState<string[]>(
    results.map(() => '0')
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.result-card');
      if (cards) {
        cards.forEach((card: Element, index: number) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: index * 0.1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                onEnter: () => {
                  animateMetric(index, results[index].metric);
                },
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const animateMetric = (index: number, targetValue: string) => {
    const numericPart = targetValue.replace(/[^0-9]/g, '');
    const prefix = targetValue.match(/^[^0-9]*/)?.[0] || '';
    const suffix = targetValue.match(/[^0-9]*$/)?.[0] || '';
    
    if (numericPart) {
      const target = parseInt(numericPart, 10);
      const duration = 2000;
      const startTime = Date.now();
      
      const updateNumber = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(target * easeOut);
        
        setAnimatedMetrics((prev) => {
          const newMetrics = [...prev];
          newMetrics[index] = prefix + current.toLocaleString() + suffix;
          return newMetrics;
        });
        
        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        }
      };
      
      requestAnimationFrame(updateNumber);
    }
  };

  return (
    <section
      id="results"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - centered */}
        <div ref={headingRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            Our Results
          </h2>
          <p className="text-lg text-black/50 max-w-2xl mx-auto">
            Real numbers from real clients. This is what happens when strategy meets execution.
          </p>
        </div>

        {/* Results Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12"
        >
          {results.map((result, index) => (
            <div
              key={index}
              className="result-card group relative p-10 rounded-[3rem] bg-[#FAFAFA] border border-black/[0.03] hover:border-red-500/10 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(239,68,68,0.08)] transition-all duration-700 card-lift overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

              {/* Metric */}
              <div className="relative mb-6">
                <span className="text-5xl md:text-6xl lg:text-7xl font-black text-black group-hover:text-red-500 transition-colors duration-500 tracking-tighter">
                  {animatedMetrics[index] || result.metric}
                </span>
                
                {/* Decorative plus/bullet */}
                <div className="absolute -top-2 -right-4 w-4 h-4 rounded-full bg-red-500 border-4 border-white shadow-sm scale-0 group-hover:scale-100 transition-transform duration-500 delay-200" />
              </div>

              {/* Label Container */}
              <div className="relative mb-6 inline-block">
                <h3 className="text-xs md:text-sm font-black text-black uppercase tracking-[0.2em] py-1 border-b-2 border-red-500/20 group-hover:border-red-500 transition-colors duration-500">
                  {result.label}
                </h3>
              </div>

              {/* Description */}
              <p className="relative text-base text-black/40 leading-relaxed font-medium group-hover:text-black/60 transition-colors duration-500">
                {result.description}
              </p>

              {/* Big background number for texture */}
              <div className="absolute -bottom-10 -right-10 text-[10rem] font-black text-black/[0.02] select-none group-hover:text-red-500/[0.03] transition-colors duration-700">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
