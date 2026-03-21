import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Who do you work with?',
    answer:
      'Coaches, Consultants, Course / Info-product Sellers, Service Providers (Agency Owners), and any B2B/B2C business owners wanting to grow their brand.',
  },
  {
    question: 'What exactly do you help with?',
    answer:
      'We run your entire YouTube operation. Strategy, scripting, editing, SEO, thumbnails, publishing — all handled. You show up once a month to record. That\'s it. Everything else is built to bring qualified leads straight to your calendar.',
  },
  {
    question: 'Why post on YouTube?',
    answer:
      'Unlike ads that stop the second you pause spend, or cold outreach that gets ignored — YouTube captures buyers who are already looking. High intent. Evergreen. One video can drive leads for months without touching your ad budget.',
  },
  {
    question: 'How soon can I expect results?',
    answer:
      'Every channel is different. Starting from scratch, most clients see traction within 90 days. Already have an audience? Results typically show up in the first month.',
  },
  {
    question: 'How many videos will be created per month?',
    answer:
      '4 videos a month is where we start most clients — it\'s the sweet spot. Need more volume? We have packages for 6 and 8 videos a month, and we can scale beyond that if needed.',
  },
  {
    question: 'What is the turnaround time?',
    answer:
      'Most videos are turned around in 4–6 days. That covers anything under 15 minutes from footage to final delivery.',
  },
];

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

      // FAQ items animation
      const faqItems = faqsRef.current?.querySelectorAll('.faq-item');
      if (faqItems) {
        gsap.fromTo(
          faqItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: faqsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-24 md:py-40 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - centered */}
        <div ref={headingRef} className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <HelpCircle className="w-3 h-3" />
            <span>Support</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-black mb-8 tracking-tighter">
            Commonly Asked <span className="text-red-500">Questions</span>
          </h2>
          <p className="text-lg md:text-xl text-black/40 max-w-2xl mx-auto font-medium leading-relaxed">
            Everything you need to know about scaling your brand with our YouTube sales engine.
          </p>
        </div>

        {/* FAQ List */}
        <div ref={faqsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-start">
          {[faqs.slice(0, 3), faqs.slice(3)].map((column, colIndex) => (
            <div key={colIndex} className="space-y-4 md:space-y-6">
              {column.map((faq, localIndex) => {
                const index = colIndex * 3 + localIndex;
                return (
                  <div
                    key={index}
                    className={`faq-item group rounded-[2rem] border transition-all duration-500 ease-out overflow-hidden ${
                      openIndex === index
                        ? 'bg-[#FAFAFA] border-red-500/20 shadow-2xl scale-[1.02]'
                        : 'bg-white border-black/[0.03] hover:border-red-500/10 hover:shadow-xl'
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-8 md:px-10 py-8 flex items-center justify-between text-left group"
                    >
                      <span className={`text-lg md:text-xl font-black transition-colors duration-500 pr-6 ${
                        openIndex === index ? 'text-red-500' : 'text-black group-hover:text-red-500'
                      }`}>
                        {faq.question}
                      </span>
                      <div
                        className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-700 shadow-sm ${
                          openIndex === index
                            ? 'bg-red-500 rotate-180 scale-110 shadow-red-500/50'
                            : 'bg-black/[0.03] group-hover:bg-red-500/10'
                        }`}
                      >
                        {openIndex === index ? (
                          <Minus className="w-5 h-5 text-white" />
                        ) : (
                          <Plus
                            className={`w-5 h-5 transition-colors duration-500 ${
                              openIndex === index ? 'text-white' : 'text-black/40 group-hover:text-red-500'
                            }`}
                          />
                        )}
                      </div>
                    </button>

                    {/* Answer */}
                    <div
                      className={`overflow-hidden transition-all duration-700 ease-in-out ${
                        openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-8 md:px-10 pb-10">
                        <div className="w-full h-px bg-black/[0.05] mb-8" />
                        <p className="text-base md:text-lg text-black/50 leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
