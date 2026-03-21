import { useState } from 'react';
import { Play } from 'lucide-react';

interface LiteYouTubeProps {
  videoId: string;
  title?: string;
  aspectRatio?: 'video' | 'portrait';
  className?: string;
}

const LiteYouTube = ({ 
  videoId, 
  title = 'YouTube video player', 
  aspectRatio = 'video',
  className = '' 
}: LiteYouTubeProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  // YouTube embed URL with performance optimizations
  // rel=0: only show related vids from same channel
  // modestbranding=1: hide YT logo
  // autoplay=1&mute=0: start playing immediately on load
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`;

  const handlePlay = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      className={`relative w-full overflow-hidden bg-black group transition-all duration-500 ${
        aspectRatio === 'portrait' ? 'aspect-[9/16]' : 'aspect-video'
      } ${className}`}
    >
      {!isLoaded ? (
        <button
          onClick={handlePlay}
          className="absolute inset-0 w-full h-full flex items-center justify-center p-0 border-none bg-transparent cursor-pointer overflow-hidden focus:outline-none"
          aria-label={`Play ${title}`}
        >
          {/* Thumbnail with hover zoom */}
          <img
            src={thumbnailUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay gradient for depth */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

          {/* Branded Play Button */}
          <div className="relative z-10 w-20 h-20 flex items-center justify-center bg-red-600/90 text-white rounded-full shadow-[0_0_50px_rgba(239,68,68,0.4)] group-hover:bg-red-500 group-hover:scale-110 group-hover:shadow-[0_0_70px_rgba(239,68,68,0.6)] transition-all duration-500 ease-out">
            <Play className="w-8 h-8 fill-current ml-1" />
          </div>

          {/* Pulse Effect */}
          <div className="absolute w-20 h-20 bg-red-500/30 rounded-full animate-ping opacity-75 group-hover:opacity-100" />
        </button>
      ) : (
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default LiteYouTube;
