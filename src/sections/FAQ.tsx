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
      'We work with coaches, consultants, and agency owners who sell high-ticket offers ($3,000+). Our ideal clients are already making $20K+ per month and want to scale through YouTube.',
  },
  {
    question: 'How soon can I expect results?',
    answer:
      'Most clients see their first inbound leads within 30-60 days. The full system typically takes 90 days to fully optimize and start generating 10-20 qualified calls per month consistently.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Our done-for-you YouTube sales system starts at $5,000/month. We also offer performance-based pricing for select clients. Book a call to discuss which option works best for your business.',
  },
  {
    question: 'Are your contracts month to month?',
    answer:
      'Yes, after an initial 90-day commitment to allow the system to fully ramp up, all contracts are month-to-month. We believe in earning your business every month.',
  },
  {
    question: 'What happens when we start working together?',
    answer:
      "We begin with a comprehensive strategy session to understand your offer, audience, and goals. Then we handle everything—from research and scripting to editing and optimization. You just show up and film.",
  },
  {
    question: 'How many videos will we be making?',
    answer:
      'We typically recommend 4-8 videos per month depending on your goals and capacity. This frequency is optimal for YouTube algorithm favor without overwhelming your schedule.',
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
        <div ref={faqsRef} className="space-y-4 md:space-y-6">
          {faqs.map((faq, index) => (
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
