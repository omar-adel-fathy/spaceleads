import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: 'Who do you work with?',
    answer: (
      <ul className="space-y-1 list-none">
        {[
          'Coaches',
          'Consultants',
          'Course / Info-product Sellers',
          'Service Providers (Agency Owners)',
          'Any B2B/B2C business owners wanting to grow their brand',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
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
    question: "I'm already getting clients from other channels. Why YouTube?",
    answer:
      "You don’t need YouTube to replace what’s working. You need it to multiply it. While you’re closing deals, your videos are building trust, warming up cold leads, and pre-selling your offer. It compounds quietly in the background — and makes every other channel you run perform better.",
  },
  {
    question: 'How much time will this take me?',
    answer:
      'Just 60–90 minutes a week. Or a single batch session once a month. We take care of scripting, editing, SEO, and publishing. You stay focused on running your business.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Investment ranges from $1.8K/mo to $5K/mo based on what you need. The best way to find out what\'s right for you is to get on a call.',
  },
  {
    question: "What if I'm starting from zero with no audience?",
    answer:
      "It doesn't matter. Some of our strongest results came from channels with under 500 subscribers. YouTube is search-based — you show up in front of buyers who are actively looking, not just people who already follow you.",
  },
  {
    question: 'What happens when we start working together?',
    answer: (
      <ul className="space-y-1 list-none">
        {[
          'We hop on an onboarding call',
          'You will fill in an onboarding form',
          'We set up your WhatsApp group, Google Drive folder, and Notion dashboard',
          'You get the first script in the first 2-3 days, ready to record',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
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

// Split FAQs into two columns
const leftFaqs = faqs.slice(0, Math.ceil(faqs.length / 2));
const rightFaqs = faqs.slice(Math.ceil(faqs.length / 2));

interface FAQCardProps {
  faq: FAQItem;
  index: number;
  openIndex: number | null;
  onToggle: (i: number) => void;
}

const FAQCard = ({ faq, index, openIndex, onToggle }: FAQCardProps) => {
  const isOpen = openIndex === index;
  return (
    <div
      className={`rounded-[1.75rem] border transition-all duration-300 ease-out overflow-hidden ${
        isOpen
          ? 'bg-[#FAFAFA] border-red-500/20 shadow-lg'
          : 'bg-white border-black/[0.04] hover:border-red-500/10 hover:shadow-md'
      }`}
    >
      <button
        onClick={() => onToggle(index)}
        className="w-full px-7 md:px-8 py-7 flex items-center justify-between text-left group"
      >
        <span
          className={`text-base md:text-lg font-black transition-colors duration-300 pr-4 ${
            isOpen ? 'text-red-500' : 'text-black group-hover:text-red-500'
          }`}
        >
          {faq.question}
        </span>
        <div
          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm ${
            isOpen
              ? 'bg-red-500 rotate-180 shadow-red-500/40'
              : 'bg-black/[0.04] group-hover:bg-red-500/10'
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4 text-white" />
          ) : (
            <Plus className={`w-4 h-4 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-black/40 group-hover:text-red-500'}`} />
          )}
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-7 md:px-8 pb-8">
            <div className="w-full h-px bg-black/[0.05] mb-6" />
            <div className="text-sm md:text-base text-black/50 leading-relaxed font-medium">
              {faq.answer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
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
      // Left column
      gsap.fromTo(
        leftColRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      // Right column — slight delay
      gsap.fromTo(
        rightColRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-black mb-6 tracking-tighter">
            Frequently Asked <span className="text-red-500">Questions</span>
          </h2>
          <p className="text-lg md:text-xl text-black/40 max-w-2xl mx-auto font-medium leading-relaxed">
            Everything you need to know about scaling with our YouTube client acquisition system.
          </p>
        </div>

        {/* Two-column FAQ grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Left column */}
          <div ref={leftColRef} className="flex flex-col gap-4 md:gap-5">
            {leftFaqs.map((faq, i) => (
              <FAQCard
                key={i}
                faq={faq}
                index={i}
                openIndex={openIndex}
                onToggle={toggleFAQ}
              />
            ))}
          </div>
          {/* Right column — indices continue from where left stopped */}
          <div ref={rightColRef} className="flex flex-col gap-4 md:gap-5">
            {rightFaqs.map((faq, i) => (
              <FAQCard
                key={i + leftFaqs.length}
                faq={faq}
                index={i + leftFaqs.length}
                openIndex={openIndex}
                onToggle={toggleFAQ}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background glows */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-red-500/5 blur-[100px] rounded-full -ml-36 pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-red-500/5 blur-[100px] rounded-full -mr-36 pointer-events-none" />
    </section>
  );
};

export default FAQ;
