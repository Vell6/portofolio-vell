import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const texts = ['Full Stack Developer', 'UI/UX Designer', 'Creative Thinker', 'Problem Solver'];
  const currentText = texts[Math.floor(currentIndex / 100) % texts.length];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex % 100 < currentText.length) {
        setDisplayText(currentText.slice(0, (currentIndex % 100) + 1));
      } else if (currentIndex % 100 < currentText.length + 20) {
        // Pause at full text
      } else {
        setDisplayText('');
      }
      setCurrentIndex(prev => prev + 1);
    }, 100);

    return () => clearTimeout(timer);
  }, [currentIndex, currentText]);

  // Animated Atoms Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const atoms: any[] = [];
    const connections: any[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create atoms
    for (let i = 0; i < 50; i++) {
      atoms.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 2,
        hue: Math.random() * 360,
        hueSpeed: (Math.random() - 0.5) * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update atoms
      atoms.forEach(atom => {
        atom.x += atom.vx;
        atom.y += atom.vy;
        atom.hue += atom.hueSpeed;

        // Bounce off edges
        if (atom.x <= 0 || atom.x >= canvas.width) atom.vx *= -1;
        if (atom.y <= 0 || atom.y >= canvas.height) atom.vy *= -1;

        // Keep in bounds
        atom.x = Math.max(0, Math.min(canvas.width, atom.x));
        atom.y = Math.max(0, Math.min(canvas.height, atom.y));
      });

      // Draw connections
      connections.length = 0;
      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const dx = atoms[i].x - atoms[j].x;
          const dy = atoms[i].y - atoms[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 1 - distance / 150;
            const hue = (atoms[i].hue + atoms[j].hue) / 2;
            
            ctx.beginPath();
            ctx.moveTo(atoms[i].x, atoms[i].y);
            ctx.lineTo(atoms[j].x, atoms[j].y);
            ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${opacity * 0.3})`;
            ctx.lineWidth = opacity * 2;
            ctx.stroke();

            // Add glow effect to connections
            ctx.beginPath();
            ctx.moveTo(atoms[i].x, atoms[i].y);
            ctx.lineTo(atoms[j].x, atoms[j].y);
            ctx.strokeStyle = `hsla(${hue}, 80%, 80%, ${opacity * 0.1})`;
            ctx.lineWidth = opacity * 6;
            ctx.stroke();
          }
        }
      }

      // Draw atoms with glow
      atoms.forEach(atom => {
        // Outer glow
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.radius * 3, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(atom.x, atom.y, 0, atom.x, atom.y, atom.radius * 3);
        glowGradient.addColorStop(0, `hsla(${atom.hue}, 80%, 70%, 0.3)`);
        glowGradient.addColorStop(1, `hsla(${atom.hue}, 80%, 70%, 0)`);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Main atom
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, atom.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${atom.hue}, 70%, 60%)`;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(atom.x - atom.radius * 0.3, atom.y - atom.radius * 0.3, atom.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${atom.hue}, 80%, 80%, 0.8)`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      {/* Animated Atoms Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'blur(0.5px)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <div className="mb-8 transform hover:scale-105 transition-all duration-500 hover:rotate-1">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-fade-in hover:from-pink-400 hover:via-blue-500 hover:to-purple-500 transition-all duration-700">
            John Doe
          </h1>
          <div className="h-12 flex items-center justify-center">
            <p className="text-2xl md:text-3xl text-gray-300 hover:text-white transition-colors duration-300">
              I'm a <span className="text-blue-400 font-semibold hover:text-pink-400 transition-colors duration-500">{displayText}</span>
              <span className="animate-pulse text-blue-400">|</span>
            </p>
          </div>
        </div>

        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in hover:text-white hover:scale-105 transition-all duration-500">
          Passionate about creating amazing digital experiences through clean code and innovative design. 
          Let's build something incredible together.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25 hover:rotate-2">
            <span className="relative z-10 flex items-center gap-2 group-hover:scale-110 transition-transform duration-300">
              <Download size={20} className="group-hover:rotate-180 transition-transform duration-500" />
              Download CV
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button className="px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-all duration-500 hover:scale-110 hover:border-pink-400 hover:bg-pink-400 hover:-rotate-2">
            View My Work
          </button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-16">
          {[
            { icon: Github, href: '#', label: 'GitHub' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Mail, href: '#', label: 'Email' }
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              className="group p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-500 hover:scale-125 hover:rotate-12"
              aria-label={label}
            >
              <Icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:scale-125 transition-transform duration-300">
          <ChevronDown className="w-8 h-8 text-gray-400 hover:text-white transition-colors duration-300" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
