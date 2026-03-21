import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const screenshots = [
  '1.png','2.png','3.jpg','4.jpg','5.png','6.png',
  '12.jpg','13.png','14.png','15.png','17.jpg','18.jpg','19.jpg',
  '20.jpg','21.jpg','22.png','24.png','25.png','27.png','28.png','29.png',
  '30.png','33.png','34.png','35.png','36.png','37.png','38.png','39.png',
  '41.png','42.png','43.png','44.png','45.png','46.png','47.png','49.png',
  '50.png','51.png','52.png','53.png','54.png','55.png','57.png','59.png',
  '60.jpeg',
];

const VISIBLE = 5; // cards shown at once (center ± 2)

interface CardStyle {
  transform: string;
  opacity: number;
  zIndex: number;
  filter: string;
}

function getCardStyle(offset: number): CardStyle {
  // offset: distance from center (-2 … +2)
  const abs = Math.abs(offset);
  const sign = offset < 0 ? -1 : 1;

  const rotateY = sign * (abs === 1 ? 42 : 62);
  const translateX = sign * (abs === 1 ? 52 : 96);
  const scale = abs === 0 ? 1 : abs === 1 ? 0.78 : 0.58;
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.72 : 0.38;
  const zIndex = VISIBLE - abs;
  const brightness = abs === 0 ? 1 : abs === 1 ? 0.85 : 0.65;

  return {
    transform: `perspective(1200px) translateX(${translateX}%) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex,
    filter: `brightness(${brightness})`,
  };
}

export default function DepthDeckCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = screenshots.length;

  const go = useCallback((dir: 1 | -1) => {
    setActive((prev) => (prev + dir + total) % total);
  }, [total]);

  // Auto-play every 3.5s
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => go(1), 3500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, go]);

  const handleCardClick = (offset: number) => {
    if (offset === 0) {
      setLightbox(active);
    } else {
      setActive((active + offset + total) % total);
    }
  };

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const offsets = [-2, -1, 0, 1, 2];

  return (
    <div
      className="relative w-full select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Carousel stage */}
      <div className="relative h-[320px] sm:h-[380px] md:h-[440px] flex items-center justify-center overflow-visible">
        {offsets.map((offset) => {
          const idx = (active + offset + total) % total;
          const style = getCardStyle(offset);
          const isCenter = offset === 0;

          return (
            <div
              key={`${idx}-${offset}`}
              onClick={() => handleCardClick(offset)}
              style={{
                transform: style.transform,
                opacity: style.opacity,
                zIndex: style.zIndex,
                filter: style.filter,
                transition: 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.45s ease, filter 0.45s ease',
              }}
              className={`
                absolute w-[52%] sm:w-[46%] md:w-[40%] aspect-[4/3]
                rounded-2xl overflow-hidden shadow-2xl
                ${isCenter
                  ? 'cursor-zoom-in ring-2 ring-red-500/30 shadow-[0_30px_80px_-10px_rgba(0,0,0,0.35)]'
                  : 'cursor-pointer hover:brightness-90'}
              `}
            >
              <img
                src={`/screenshots/${screenshots[idx]}`}
                alt={`Result ${idx + 1}`}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
            </div>
          );
        })}
      </div>

      {/* Arrow buttons */}
      <button
        onClick={() => go(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-black/[0.06] shadow-lg flex items-center justify-center text-black/50 hover:text-red-500 hover:border-red-500/20 hover:shadow-red-500/10 transition-all duration-300 -translate-x-1/2"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-black/[0.06] shadow-lg flex items-center justify-center text-black/50 hover:text-red-500 hover:border-red-500/20 hover:shadow-red-500/10 transition-all duration-300 translate-x-1/2"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots / counter */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {screenshots.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? 'w-6 h-2 bg-red-500'
                : 'w-2 h-2 bg-black/15 hover:bg-red-500/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`/screenshots/${screenshots[lightbox]}`}
              alt={`Result ${lightbox + 1}`}
              className="w-full h-full object-contain bg-black"
            />
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
