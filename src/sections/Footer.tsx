import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Youtube, Instagram, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Youtube, label: 'YouTube', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'X', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
];

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Social icons animation
      gsap.fromTo(
        '.social-icon',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-white pt-24 pb-12 border-t border-black/[0.03] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-red-500/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="space-y-8">
            <a href="#" className="flex items-center gap-1 group">
              <span className="font-black text-3xl tracking-tighter uppercase text-black">
                Space
              </span>
              <span className="font-black text-3xl tracking-tighter uppercase text-red-500">
                Leads
              </span>
            </a>
            <p className="text-black/40 font-medium leading-relaxed max-w-xs">
              The #1 YouTube Sales Engine for high-ticket agency owners and coaches. We help you dominate your market through cinematic authority.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="social-icon w-12 h-12 rounded-full bg-[#FAFAFA] border border-black/[0.03] flex items-center justify-center text-black/40 hover:text-white hover:bg-red-500 transition-all duration-500 group/social"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 transition-transform duration-500 group-hover/social:scale-110" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-black">Navigation</h4>
            <div className="flex flex-col gap-4">
              {['Why YouTube', 'Portfolio', 'Process', 'Results', 'FAQ'].map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase().replace(' ', '-')}`} 
                  className="text-black/40 font-bold hover:text-red-500 flex items-center gap-2 group/link transition-all"
                >
                  <span>{link}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-black">Contact</h4>
            <div className="flex flex-col gap-4">
              <p className="text-black/40 font-bold">hello@spaceleads.io</p>
              <p className="text-black/40 font-bold">Dubai, UAE</p>
            </div>
          </div>

          {/* Newsletter/Mailing */}
          <div className="space-y-8">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-black">Stay Updated</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-[#FAFAFA] border border-black/[0.03] rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:border-red-500/50 transition-all"
              />
              <button className="absolute right-2 top-2 bottom-2 px-4 rounded-xl bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-500 transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-black/[0.03] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20">
            &copy; {new Date().getFullYear()} SpaceLeads. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20 hover:text-red-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20 hover:text-red-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
