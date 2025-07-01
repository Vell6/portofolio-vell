
import React, { useState, useEffect } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { X, Music, Play, Pause } from 'lucide-react';

const MusicNotification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentTrack = siteConfig.backgroundMusic.tracks[siteConfig.backgroundMusic.currentTrack];
  const { popup } = siteConfig.backgroundMusic;

  useEffect(() => {
    if (!popup.enabled || !siteConfig.backgroundMusic.enabled) return;

    // Show notification on page load/refresh
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
    }, popup.animationDuration);
  };

  useEffect(() => {
    if (isVisible && isAnimating) {
      const hideTimer = setTimeout(() => {
        handleClose();
      }, popup.duration);

      return () => clearTimeout(hideTimer);
    }
  }, [isVisible, isAnimating]);

  if (!isVisible || !siteConfig.backgroundMusic.enabled) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div
          className={`
            relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl
            p-6 shadow-2xl max-w-sm w-full mx-4
            transition-all duration-[3000ms] ease-out
            ${isAnimating 
              ? 'translate-y-0 opacity-100 scale-100' 
              : '-translate-y-full opacity-0 scale-95'
            }
          `}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Liquid water effect overlay */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-2 left-4 w-6 h-6 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="absolute top-8 right-6 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-6 left-8 w-3 h-3 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
          >
            <X size={16} />
          </button>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={currentTrack.thumbnail}
                  alt={currentTrack.title}
                  className="w-16 h-16 rounded-xl object-cover shadow-lg"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <Music size={16} className="text-blue-400" />
                  <span className="text-blue-400 text-sm font-medium">Now Playing</span>
                </div>
                
                <h3 className="text-white font-semibold text-lg leading-tight mb-1">
                  {currentTrack.title}
                </h3>
                
                <p className="text-white/80 text-sm mb-2">
                  by {currentTrack.artist}
                </p>
                
                <div className="flex items-center justify-between text-white/60 text-xs">
                  <span>Duration: {currentTrack.duration}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Auto-playing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/70 text-sm mt-3 leading-relaxed">
              {currentTrack.description}
            </p>

            {/* Progress indicator */}
            <div className="mt-4 w-full bg-white/20 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-blue-400 to-purple-400 h-1 rounded-full transition-all duration-1000"
                style={{ width: '0%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicNotification;
