
import React, { useState, useEffect } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { X, Music } from 'lucide-react';

const MusicNotification: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const currentTrack = siteConfig.backgroundMusic.tracks[siteConfig.backgroundMusic.currentTrack];
  const { popup } = siteConfig.backgroundMusic;

  useEffect(() => {
    if (!popup.enabled || !siteConfig.backgroundMusic.enabled) return;

    // Show notification on page load/refresh
    const initialTimer = setTimeout(() => {
      showNotification();
    }, 500);

    // Set up recurring notifications
    const recurringTimer = setInterval(() => {
      showNotification();
    }, popup.showInterval);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(recurringTimer);
    };
  }, []);

  const showNotification = () => {
    setIsVisible(true);
    setIsAnimating(true);
    
    // Show particles after animation completes
    setTimeout(() => {
      setShowParticles(true);
    }, 1000);

    // Hide notification after duration
    setTimeout(() => {
      handleClose();
    }, popup.duration);
  };

  const handleClose = () => {
    setIsAnimating(false);
    setShowParticles(false);
    setTimeout(() => {
      setIsVisible(false);
    }, popup.animationDuration);
  };

  if (!isVisible || !siteConfig.backgroundMusic.enabled) return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none">
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div
          className={`
            relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl
            p-4 shadow-2xl max-w-md w-full mx-4 h-20
            transition-all duration-[3000ms] ease-out overflow-hidden
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
          {/* Shine Animation */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent rounded-xl"
            style={{
              animation: isAnimating ? 'diagonalShine 2s ease-in-out 2' : 'none',
              transform: 'translateX(-100%) translateY(-100%)',
            }}
          />

          {/* Liquid water effect overlay */}
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1 left-3 w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="absolute top-3 right-4 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-2 left-6 w-1 h-1 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>

          {/* Particle Effects */}
          {showParticles && (
            <>
              {/* Top particles */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`top-${i}`}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                    style={{
                      left: `${(i - 4) * 12}px`,
                      animationDelay: `${i * 100}ms`,
                      animationDuration: '1s',
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>
              
              {/* Bottom particles */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`bottom-${i}`}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full"
                    style={{
                      left: `${(i - 4) * 12}px`,
                      animation: `particleFloat 1.5s ease-out ${i * 100}ms`,
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/10 z-10"
          >
            <X size={12} />
          </button>

          {/* Content */}
          <div className="relative z-10 h-full">
            <div className="flex items-center space-x-3 h-full">
              <div className="flex-shrink-0">
                <img
                  src={currentTrack.thumbnail}
                  alt={currentTrack.title}
                  className="w-12 h-12 rounded-lg object-cover shadow-lg"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1 mb-1">
                  <Music size={12} className="text-blue-400" />
                  <span className="text-blue-400 text-xs font-medium">Now Playing</span>
                </div>
                
                <h3 className="text-white font-semibold text-sm leading-tight mb-1 truncate">
                  {currentTrack.title}
                </h3>
                
                <div className="flex items-center justify-between text-white/60 text-xs">
                  <span className="truncate">by {currentTrack.artist}</span>
                  <div className="flex items-center space-x-1 ml-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Auto-playing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes diagonalShine {
            0% { 
              transform: translateX(-150%) translateY(-150%); 
              opacity: 0; 
            }
            50% { 
              transform: translateX(0%) translateY(0%); 
              opacity: 1; 
            }
            100% { 
              transform: translateX(150%) translateY(150%); 
              opacity: 0; 
            }
          }
          
          @keyframes particleFloat {
            0% { 
              transform: translateY(0px) scale(1); 
              opacity: 0.7; 
            }
            50% { 
              transform: translateY(-8px) scale(1.2); 
              opacity: 1; 
            }
            100% { 
              transform: translateY(-16px) scale(0.8); 
              opacity: 0; 
            }
          }
        `
      }} />
    </div>
  );
};

export default MusicNotification;
