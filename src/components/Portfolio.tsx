
import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Eye } from 'lucide-react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      description: 'Modern e-commerce platform built with React and Node.js',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      demo: '#'
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
      description: 'Secure mobile banking application with biometric authentication',
      tech: ['React Native', 'Firebase', 'Redux'],
      github: '#',
      demo: '#'
    },
    {
      id: 3,
      title: 'Design System',
      category: 'design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
      description: 'Comprehensive design system for enterprise applications',
      tech: ['Figma', 'Storybook', 'CSS'],
      github: '#',
      demo: '#'
    },
    {
      id: 4,
      title: 'AI Dashboard',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      description: 'Analytics dashboard with AI-powered insights',
      tech: ['Vue.js', 'Python', 'TensorFlow'],
      github: '#',
      demo: '#'
    },
    {
      id: 5,
      title: 'Food Delivery App',
      category: 'mobile',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop',
      description: 'Real-time food delivery tracking application',
      tech: ['Flutter', 'Firebase', 'Google Maps'],
      github: '#',
      demo: '#'
    },
    {
      id: 6,
      title: 'Brand Identity',
      category: 'design',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop',
      description: 'Complete brand identity design for tech startup',
      tech: ['Illustrator', 'Photoshop', 'InDesign'],
      github: '#',
      demo: '#'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'design', name: 'Design' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse tracking for button hover effect
  const handleMouseMove = (e: React.MouseEvent, buttonId: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden" ref={sectionRef}>
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute -left-20 top-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          style={{ transform: `translateX(${scrollY * 0.1}px) translateY(${scrollY * -0.05}px)` }}
        />
        <div 
          className="absolute -right-20 bottom-20 w-60 h-60 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          style={{ transform: `translateX(${scrollY * -0.15}px) translateY(${scrollY * 0.1}px)` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 transition-all duration-700">
            My Portfolio
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto hover:text-gray-800 dark:hover:text-white transition-colors duration-300">
            A collection of projects that showcase my skills and passion for creating 
            exceptional digital experiences.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              onMouseMove={(e) => handleMouseMove(e, category.id)}
              onMouseEnter={() => setHoveredButton(category.id)}
              onMouseLeave={() => setHoveredButton(null)}
              className={`relative px-8 py-4 rounded-full font-semibold transition-all duration-500 overflow-hidden group ${
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-110'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:scale-105'
              }`}
            >
              <span className="relative z-10">{category.name}</span>
              
              {/* Animated background for hover */}
              {hoveredButton === category.id && activeFilter !== category.id && (
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full transition-all duration-300"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, transparent 70%)`,
                  }}
                />
              )}
              
              {/* Active state glow */}
              {activeFilter === category.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid with Parallax */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transform: `translateX(${index % 2 === 0 ? 
                  Math.max(-100, Math.min(0, (scrollY - 800) * 0.1)) : 
                  Math.min(100, Math.max(0, -(scrollY - 800) * 0.1))
                }px) translateY(${Math.max(-50, Math.min(0, (scrollY - 600) * 0.05))}px)`,
              }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden group-hover:scale-105 transition-transform duration-700">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    <a
                      href={project.github}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-125 hover:rotate-12"
                      aria-label="View source code"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={project.demo}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-125 hover:-rotate-12"
                      aria-label="View live demo"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 group-hover:bg-gray-50 dark:group-hover:bg-gray-700 transition-colors duration-300">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 group-hover:scale-105">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full font-medium hover:scale-110 transition-transform duration-300 hover:bg-blue-200 dark:hover:bg-blue-800/50"
                      style={{ animationDelay: `${techIndex * 0.05}s` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <button 
                  className="relative w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-500 flex items-center justify-center gap-2 group-hover:scale-105 overflow-hidden"
                  onMouseMove={(e) => handleMouseMove(e, `project-${project.id}`)}
                  onMouseEnter={() => setHoveredButton(`project-${project.id}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Eye className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                    View Project
                  </span>
                  
                  {/* Dynamic hover effect */}
                  {hoveredButton === `project-${project.id}` && (
                    <div 
                      className="absolute inset-0 transition-all duration-300"
                      style={{
                        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(236, 72, 153, 0.4) 0%, transparent 70%)`,
                      }}
                    />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
