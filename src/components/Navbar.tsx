
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
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
          ? 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 shadow-2xl'
          : 'bg-white/5 dark:bg-gray-900/5 backdrop-blur-sm'
      }`}
      style={{ 
        position: 'fixed',
        borderRadius: scrolled ? '0 0 24px 24px' : '0',
        background: scrolled 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        boxShadow: scrolled 
          ? '0 8px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
          : '0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      {/* Progress Bar with Blue to Cyan Gradient */}
      <div 
        className="absolute top-0 left-0 h-full transition-all duration-300 ease-out bg-gradient-to-r from-blue-500 to-cyan-500 rounded-r-full"
        style={{ 
          width: `${scrollProgress}%`,
          opacity: scrollProgress > 0 ? 0.8 : 0,
        }}
      >
        {/* Shine effect within progress bar */}
        {scrollProgress > 0 && (
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-r-full"
            style={{
              animation: 'shineSweep 5s ease-in-out infinite',
              transform: 'translateX(-100%)',
            }}
          />
        )}
      </div>

      {/* Global shine effect when no progress */}
      {scrollProgress === 0 && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
          style={{
            animation: 'globalShine 5s ease-in-out infinite',
            transform: 'translateX(-100%)',
          }}
        />
      )}

      <div className="max-w-6xl mx-auto px-6 relative z-10">
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
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
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
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shineSweep {
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
