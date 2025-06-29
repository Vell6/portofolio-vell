
import React, { useEffect, useState, useRef } from 'react';
import { Code2, Palette, Rocket, Users } from 'lucide-react';

const About = () => {
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'Frontend Development', percentage: 95, color: 'from-blue-500 to-cyan-500' },
    { name: 'Backend Development', percentage: 88, color: 'from-green-500 to-emerald-500' },
    { name: 'UI/UX Design', percentage: 92, color: 'from-purple-500 to-pink-500' },
    { name: 'Mobile Development', percentage: 85, color: 'from-orange-500 to-red-500' }
  ];

  const features = [
    {
      icon: Code2,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code following best practices.'
    },
    {
      icon: Palette,
      title: 'Creative Design',
      description: 'Crafting beautiful and intuitive user interfaces with attention to detail.'
    },
    {
      icon: Rocket,
      title: 'Performance',
      description: 'Optimizing applications for speed, SEO, and exceptional user experience.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working effectively in teams and communicating ideas clearly.'
    }
  ];

  // Intersection Observer for skills animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !skillsVisible) {
          setSkillsVisible(true);
          animateSkills();
        }
      },
      { threshold: 0.5 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, [skillsVisible]);

  const animateSkills = () => {
    skills.forEach((skill, index) => {
      let current = 0;
      const target = skill.percentage;
      const increment = target / 100;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
          
          // Add glow effect when animation completes
          setTimeout(() => {
            const skillBar = document.getElementById(`skill-bar-${index}`);
            if (skillBar) {
              skillBar.classList.add('skill-complete-glow');
              setTimeout(() => {
                skillBar.classList.remove('skill-complete-glow');
              }, 2000);
            }
          }, 500);
        }
        
        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = Math.round(current);
          return newValues;
        });
      }, 20);
    });
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 transition-all duration-700">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto hover:text-gray-800 dark:hover:text-white transition-colors duration-300">
            I'm a passionate developer with 5+ years of experience creating digital solutions 
            that make a difference. I love turning complex problems into simple, beautiful designs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Profile Image & Info */}
          <div className="relative group">
            <div className="relative w-80 h-80 mx-auto transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                alt="Profile"
                className="relative w-full h-full object-cover rounded-full border-4 border-white shadow-2xl group-hover:border-blue-400 transition-all duration-500"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-8" ref={skillsRef}>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">My Skills</h3>
            {skills.map((skill, index) => (
              <div key={skill.name} className="group hover:scale-105 transition-all duration-300">
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{skill.name}</span>
                  <span className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 font-bold">
                    {skillsVisible ? animatedValues[index] : 0}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden group-hover:h-5 transition-all duration-300 relative">
                  <div
                    id={`skill-bar-${index}`}
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                    style={{ 
                      width: `${skillsVisible ? animatedValues[index] : 0}%`,
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:rotate-2 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                  <feature.icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{feature.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .skill-complete-glow {
          position: relative;
        }
        
        .skill-complete-glow::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          animation: glowSweep 2s ease-in-out;
        }
        
        @keyframes glowSweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
};

export default About;
