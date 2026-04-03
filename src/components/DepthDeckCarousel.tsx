import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

const base = import.meta.env.BASE_URL;

const imageFiles = [
  '1.png',  '2.png',  '3.jpg',  '4.jpg',  '5.png',  '6.png',
  '12.jpg', '13.png', '14.png', '15.png', '17.jpg', '18.jpg',
  '19.jpg', '20.jpg', '21.jpg', '22.png', '24.png', '25.png',
  '27.png', '28.png', '29.png', '30.png', '33.png', '34.png',
  '35.png', '36.png', '37.png', '38.png', '39.png', '41.png',
  '42.png', '43.png', '44.png', '45.png', '46.png', '47.png',
  '49.png', '50.png', '51.png', '52.png', '53.png', '54.png',
  '55.png', '57.png', '59.png', '60.jpeg',
];

const images = imageFiles.map((f) => `${base}screenshots/${f}`);

const SIDES = 3; // cards visible on each side of center

interface Props { autoplayInterval?: number; }

// Card transform values for the fan-arc coverflow
const OFFSETS: Record<number, { x: number; y: number; scale: number; rotY: number; opacity: number; z: number }> = {
  0:  { x:    0, y:   0, scale: 1.00, rotY:   0, opacity: 1.00, z: 10 },
  1:  { x:  300, y:  28, scale: 0.80, rotY: -42, opacity: 0.90, z:  9 },
  '-1':{ x: -300, y:  28, scale: 0.80, rotY:  42, opacity: 0.90, z:  9 },
  2:  { x:  520, y:  70, scale: 0.64, rotY: -54, opacity: 0.65, z:  8 },
  '-2':{ x: -520, y:  70, scale: 0.64, rotY:  54, opacity: 0.65, z:  8 },
  3:  { x:  680, y: 110, scale: 0.52, rotY: -62, opacity: 0.40, z:  7 },
  '-3':{ x: -680, y: 110, scale: 0.52, rotY:  62, opacity: 0.40, z:  7 },
};

export default function DepthDeckCarousel({ autoplayInterval = 4000 }: Props) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((dir: 1 | -1) => {
    setActive((p) => (p + dir + images.length) % images.length);
  }, []);

  useEffect(() => {
    if (paused || lightbox) { if (timer.current) clearInterval(timer.current); return; }
    timer.current = setInterval(() => go(1), autoplayInterval);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [paused, lightbox, autoplayInterval, go]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  go(-1);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'Escape')     setLightbox(false);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [go]);

  const cards = [];
  for (let off = -SIDES; off <= SIDES; off++) {
    const idx = (active + off + images.length) % images.length;
    cards.push({ idx, off });
  }

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden select-none"
      style={{ background: '#ffffff' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Stage */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: 'clamp(420px, 68vw, 720px)', perspective: '1600px', perspectiveOrigin: '50% 60%' }}
      >
        {cards.map(({ idx, off }) => {
          const t = OFFSETS[off as keyof typeof OFFSETS] ?? OFFSETS[Math.sign(off) * SIDES as keyof typeof OFFSETS];
          const isCenter = off === 0;

          return (
            <motion.div
              key={idx}
              animate={{
                x: t.x,
                y: t.y,
                scale: t.scale,
                rotateY: t.rotY,
                opacity: t.opacity,
                zIndex: t.z,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              onClick={() => isCenter ? setLightbox(true) : setActive(idx)}
              className="absolute cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                width: 'clamp(240px, 34vw, 500px)',
                aspectRatio: '16/9',
              }}
              whileHover={isCenter
                ? { scale: t.scale + 0.025, y: t.y - 6 }
                : { opacity: Math.min(t.opacity + 0.18, 1) }
              }
            >
              <div className={`w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative bg-black/[0.04]
                ${isCenter ? 'ring-[3px] ring-white/30' : ''}`}>
                <img
                  src={images[idx]}
                  alt={`Result ${idx + 1}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  draggable={false}
                />
                {!isCenter && <div className="absolute inset-0 bg-black/25" />}
                {isCenter && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors duration-300 group">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="relative z-20 flex items-center justify-center gap-5 pt-2 pb-7">
        <button
          onClick={() => go(-1)}
          className="w-9 h-9 rounded-full bg-black/5 border border-black/10 flex items-center justify-center text-black/40 hover:text-red-500 hover:bg-black/10 transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {images.map((_, i) => {
            const dist = Math.abs(i - active);
            if (dist > 5 && i !== 0 && i !== images.length - 1) {
              if (dist === 6) return <span key={i} className="text-white/25 text-[8px]">…</span>;
              return null;
            }
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? 'w-5 h-1.5 bg-red-500' : 'w-1.5 h-1.5 bg-black/15 hover:bg-black/35'
                }`}
              />
            );
          })}
        </div>

        <button
          onClick={() => go(1)}
          className="w-9 h-9 rounded-full bg-black/5 border border-black/10 flex items-center justify-center text-black/40 hover:text-red-500 hover:bg-black/10 transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <p className="absolute bottom-2 inset-x-0 text-center text-[9px] uppercase tracking-widest text-black/20 font-bold pointer-events-none">
        ← → to navigate · click center image to expand
      </p>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[300] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="relative w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[active]}
                alt={`Result ${active + 1}`}
                className="w-full max-h-[85vh] object-contain rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
              />
              <button
                onClick={() => go(-1)}
                className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white border border-white/10 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => go(1)}
                className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white border border-white/10 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLightbox(false)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 hover:bg-red-500 flex items-center justify-center text-white transition-all"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white/80 text-xs font-bold tracking-widest">
                {active + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
