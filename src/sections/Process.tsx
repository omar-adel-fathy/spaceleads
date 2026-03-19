import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Film, Share2, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Camera,
    title: 'Done-For-You Strategy',
    description:
      "We design your unique 'Content Ecosystem'. From scripting to hook optimization, we ensure every video is engineered to convert high-ticket leads while you just focus on filming.",
  },
  {
    number: '02',
    icon: Film,
    title: 'Premium Post-Production',
    description:
      "Our world-class editors transform raw footage into cinematic assets. We handle thumbnails, SEO, and multi-platform distribution to make you omnipresent without the headache.",
  },
  {
    number: '03',
    icon: Share2,
    title: 'Scale & Dominate',
    description:
      "Witness your authority explode. We implement systems that turn views into booked calls, allowing you to scale your agency or coaching business to 7-8 figures sustainably.",
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
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

      // Line growth animation
      gsap.fromTo(
        lineRef.current,
        { height: 0 },
        {
          height: '100%',
          duration: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1,
          },
        }
      );

      // Steps stagger animation
      const cards = stepsRef.current?.querySelectorAll('.step-card');
      if (cards) {
        cards.forEach((card: Element, index: number) => {
          gsap.fromTo(
            card,
            { 
              x: index % 2 === 0 ? -40 : 40, 
              opacity: 0,
              rotateY: index % 2 === 0 ? -15 : 15
            },
            {
              x: 0,
              opacity: 1,
              rotateY: 0,
              duration: 1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 md:py-40 bg-[#FAFAFA] overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - centered */}
        <div ref={headingRef} className="text-center mb-24 md:mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3 h-3" />
            <span>The Blueprint</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-black mb-8 tracking-tighter">
            Our <span className="text-red-500">Done-For-You</span> Process
          </h2>
          <p className="text-lg md:text-xl text-black/40 max-w-3xl mx-auto font-medium leading-relaxed">
            We've distilled years of YouTube growth into a seamless 3-step engine that takes you from obscurity to market dominance.
          </p>
        </div>

        {/* Steps Timeline */}
        <div ref={stepsRef} className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-black/[0.03] -translate-x-1/2 hidden md:block">
            <div ref={lineRef} className="w-full bg-gradient-to-b from-red-500 to-red-600 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
          </div>

          <div className="space-y-20 md:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 ${
                  index !== steps.length - 1 ? 'md:mb-32' : ''
                }`}
              >
                {/* Left Side Content (for even) */}
                <div role="presentation" className={`hidden md:block w-1/2 pr-20 text-right ${index % 2 === 1 ? 'opacity-0' : ''}`}>
                  {index % 2 === 0 && (
                    <div className="step-card group">
                      <div className="inline-block p-8 rounded-[2.5rem] bg-white border border-black/[0.03] shadow-2xl hover:border-red-500/20 transition-all duration-700">
                        <span className="text-6xl font-black text-black/[0.03] block mb-2">{step.number}</span>
                        <h3 className="text-2xl font-black text-black mb-4 group-hover:text-red-500 transition-colors">{step.title}</h3>
                        <p className="text-black/40 font-medium leading-relaxed max-w-sm ml-auto">{step.description}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Center dot/number */}
                <div className="relative z-20 flex items-center justify-center shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black text-white flex items-center justify-center font-black text-lg md:text-xl shadow-[0_0_30px_rgba(0,0,0,0.2)] border-4 border-[#FAFAFA] group-hover:bg-red-500 transition-colors">
                    {step.number}
                  </div>
                  
                  {/* Glowing pulse element */}
                  <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping opacity-0 group-hover:opacity-100" />
                </div>

                {/* Right Side Content (for odd + mobile) */}
                <div className={`w-full md:w-1/2 md:pl-20 ${index % 2 === 0 ? 'md:opacity-0' : ''}`}>
                  <div className="step-card group">
                    <div className="p-8 md:p-10 rounded-[2.5rem] bg-white border border-black/[0.03] shadow-2xl hover:border-red-500/20 transition-all duration-700">
                      <span className="text-6xl font-black text-black/[0.03] block mb-2 md:hidden">{step.number}</span>
                      <h3 className="text-2xl font-black text-black mb-4 group-hover:text-red-500 transition-colors">{step.title}</h3>
                      <p className="text-black/40 font-medium leading-relaxed max-w-sm">{step.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
