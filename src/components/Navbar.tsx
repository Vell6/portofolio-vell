
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon, Play, Pause, VolumeX } from 'lucide-react';
import DigitalClock from './DigitalClock';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrolled(scrollTop > 50);
      setScrollProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Find the audio element created by AudioPlayer
    const audio = document.querySelector('audio');
    audioRef.current = audio;

    if (audio) {
      const updatePlayingState = () => {
        setIsPlaying(!audio.paused);
      };

      audio.addEventListener('play', updatePlayingState);
      audio.addEventListener('pause', updatePlayingState);
      audio.addEventListener('loadstart', updatePlayingState);

      // Initial state
      updatePlayingState();

      return () => {
        audio.removeEventListener('play', updatePlayingState);
        audio.removeEventListener('pause', updatePlayingState);
        audio.removeEventListener('loadstart', updatePlayingState);
      };
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log('Play failed:', error);
        });
      }
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Background', href: '#background' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 relative overflow-hidden ${
        scrolled
          ? 'bg-white/5 dark:bg-gray-900/5 backdrop-blur-2xl border-b border-white/10 dark:border-gray-700/10 shadow-2xl'
          : 'bg-white/2 dark:bg-gray-900/2 backdrop-blur-xl'
      }`}
      style={{ 
        position: 'fixed',
        borderRadius: scrolled ? '0 0 32px 32px' : '0 0 24px 24px',
        background: scrolled 
          ? 'radial-gradient(ellipse at top, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
          : 'radial-gradient(ellipse at top, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        boxShadow: scrolled 
          ? '0 16px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(255,255,255,0.05)'
          : '0 8px 40px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      {/* Progress Bar - Fixed rectangular shape */}
      <div 
        className="absolute bottom-0 left-0 h-1 transition-all duration-300 ease-out bg-gradient-to-r from-blue-500 to-cyan-500 overflow-hidden"
        style={{ 
          width: `${scrollProgress}%`,
          opacity: scrollProgress > 0 ? 0.8 : 0,
        }}
      >
        {scrollProgress > 0 && (
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{
              animation: 'progressShine 2s ease-in-out infinite',
              transform: 'translateX(-100%)',
              width: '100%',
            }}
          />
        )}
      </div>

      {scrollProgress === 0 && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
          style={{
            animation: 'globalShine 5s ease-in-out infinite',
            transform: 'translateX(-100%)',
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform duration-300 relative z-10 drop-shadow-sm"
          >
            JD
          </a>

          {/* Digital Clock - Center */}
          <div className="hidden lg:block">
            <DigitalClock />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-300 group z-10 drop-shadow-sm"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
              </a>
            ))}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/20 dark:bg-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-600/30 transition-all duration-300 relative z-10 backdrop-blur-sm border border-white/20 dark:border-gray-600/20"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500 drop-shadow-sm" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 drop-shadow-sm" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Digital Clock */}
            <div className="lg:hidden">
              <DigitalClock />
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/20 dark:bg-gray-700/20 hover:bg-white/30 dark:hover:bg-gray-600/30 transition-all duration-300 relative z-10 backdrop-blur-sm border border-white/20 dark:border-gray-600/20"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500 drop-shadow-sm" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 drop-shadow-sm" />
              )}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors duration-300 relative z-10 backdrop-blur-sm"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300 drop-shadow-sm" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300 drop-shadow-sm" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-2 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-2xl mt-2 border border-white/20 dark:border-gray-700/20 relative z-10 shadow-xl">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="block px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/10 dark:hover:bg-gray-800/10 transition-colors duration-300 font-medium rounded-xl mx-2 backdrop-blur-sm"
              >
                {item.name}
              </a>
            ))}
            
            {/* Music Controls in Mobile Menu */}
            <div className="px-6 py-3 border-t border-white/20 dark:border-gray-700/20 mt-2">
              <div className="text-gray-700 dark:text-gray-300 font-medium mb-2">Music Controls</div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={togglePlayPause}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  <span className="text-sm">{isPlaying ? 'Pause' : 'Play'}</span>
                </button>
                
                <button
                  onClick={stopMusic}
                  className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 text-gray-700 dark:text-gray-300 text-sm"
                >
                  Stop
                </button>
                
                <button
                  onClick={toggleMute}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                >
                  <VolumeX size={16} />
                  <span className="text-sm">{isMuted ? 'Unmute' : 'Mute'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes progressShine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes globalShine {
            0% { transform: translateX(-100%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
          }
        `
      }} />
    </nav>
  );
};

export default Navbar;
