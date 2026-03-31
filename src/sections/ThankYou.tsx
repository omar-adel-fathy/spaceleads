import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const steps = [
  'Check your email for a calendar invite',
  'Show up ready to talk about your goals',
];

const ThankYou = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ty-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'expo.out',
          delay: 0.1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <a href="/" className="ty-item flex items-center gap-1 mb-16">
        <span className="font-black text-2xl tracking-tighter uppercase text-black">Space</span>
        <span className="font-black text-2xl tracking-tighter uppercase text-red-500">Leads</span>
      </a>

      {/* Card */}
      <div className="ty-item w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl border border-black/[0.04] p-10 md:p-14 text-center">
        {/* Icon */}
        <div className="ty-item flex items-center justify-center mb-8">
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10">
            <CheckCircle className="w-10 h-10 text-red-500" strokeWidth={2} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="ty-item text-3xl md:text-4xl font-black text-black tracking-tight mb-4">
          You're booked!
        </h1>

        {/* Subheading */}
        <p className="ty-item text-base md:text-lg text-black/40 font-medium mb-10 max-w-sm mx-auto">
          We've got your call on the calendar. Check your inbox for a confirmation email with all the details.
        </p>

        {/* What to expect */}
        <div className="ty-item bg-[#FAFAFA] rounded-2xl p-6 mb-10 text-left space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-4">What happens next</p>
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-[10px] font-black mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm font-semibold text-black/70">{step}</p>
            </div>
          ))}
        </div>

        {/* Back link */}
        <a
          href="/"
          className="ty-item inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/30 hover:text-red-500 transition-colors duration-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to home
        </a>
      </div>

    </div>
  );
};

export default ThankYou;
