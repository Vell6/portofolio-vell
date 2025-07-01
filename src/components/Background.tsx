
import React, { useEffect, useState, useRef } from 'react';
import { School, Briefcase, Calendar, MapPin, GraduationCap, Award, Building2, Heart } from 'lucide-react';

const Background = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [typingStates, setTypingStates] = useState<{ [key: number]: { [field: string]: string } }>({});
  const timelineRef = useRef<HTMLDivElement>(null);

  const backgroundData = [
    {
      icon: Calendar,
      title: 'Lahir',
      date: '26 Juni 2009',
      location: 'Kalimantan Barat, Indonesia',
      description: 'Lahir di Kalimantan Barat sebagai anak kedua dari dua bersaudara.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: School,
      title: 'Sekolah Dasar',
      date: '2016 - 2022',
      location: 'SDN 15 Perigi Nyatuk ',
      description: 'Menyelesaikan pendidikan dasar dengan prestasi yang baik dan aktif dalam kegiatan Pendidikan akademik.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: GraduationCap,
      title: 'Sekolah Menengah Pertama',
      date: '2022 - 2024',
      location: 'SMP PGRI 1 Paloh',
      description: 'Mulai tertarik dengan teknologi dan komputer. Aktif dalam klub komputer sekolah.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Sekolah Menengah Kejuruan',
      date: '2024 - Sekarang',
      location: 'SMK Negeri 1 Paloh',
      description: 'Mengambil jurusan DKV (Desain Komunikasi Visual) dan meraih juara 2 dalam kompetisi desainer tingkat provinsi.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Building2,
      title: 'Perguruan Tinggi',
      date: '2013 - 2017',
      location: 'Universitas Indonesia',
      description: 'Menyelesaikan S1 Teknik Informatika dengan IPK 3.75. Aktif dalam organisasi mahasiswa dan magang di berbagai perusahaan teknologi.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Briefcase,
      title: 'Karir Pertama',
      date: '2017 - 2019',
      location: 'PT. Tech Solutions',
      description: 'Memulai karir sebagai Junior Frontend Developer. Mengembangkan berbagai aplikasi web menggunakan React dan JavaScript.',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: Briefcase,
      title: 'Pengembangan Karir',
      date: '2019 - 2022',
      location: 'PT. Digital Innovation',
      description: 'Dipromosikan menjadi Senior Frontend Developer. Memimpin tim dalam mengembangkan aplikasi web skala besar.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Heart,
      title: 'Freelance Developer',
      date: '2022 - Sekarang',
      location: 'Remote Work',
      description: 'Memutuskan menjadi freelance developer untuk memberikan solusi terbaik kepada klien dengan fleksibilitas yang lebih tinggi.',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleItems(prev => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          } else {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleItems(prev => prev.filter(i => i !== index));
            setTypingStates(prev => {
              const newStates = { ...prev };
              delete newStates[index];
              return newStates;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = document.querySelectorAll('.timeline-item');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const TypewriterText = ({ text, isVisible, field, index, delay = 0 }: { 
    text: string, 
    isVisible: boolean, 
    field: string,
    index: number,
    delay?: number 
  }) => {
    useEffect(() => {
      if (isVisible && !typingStates[index]?.[field]) {
        const timer = setTimeout(() => {
          let currentIndex = 0;
          const typeTimer = setInterval(() => {
            setTypingStates(prev => ({
              ...prev,
              [index]: {
                ...prev[index],
                [field]: text.slice(0, currentIndex)
              }
            }));
            currentIndex++;
            
            if (currentIndex > text.length) {
              clearInterval(typeTimer);
            }
          }, 30);
          
          return () => clearInterval(typeTimer);
        }, delay);
        
        return () => clearTimeout(timer);
      }
    }, [text, isVisible, field, index, delay]);

    return <span>{typingStates[index]?.[field] || ''}</span>;
  };

  return (
    <section id="background" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 transition-all duration-700">
            Riwayat & Latar Belakang
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto hover:text-gray-800 dark:hover:text-white transition-colors duration-300">
            Perjalanan hidup dan karir yang telah membentuk siapa saya hari ini.
          </p>
        </div>

        <div className="relative" ref={timelineRef}>
          {/* Timeline line with connecting dots and flowing lines */}
          <div className="absolute left-8 top-0 bottom-0 w-4 hidden md:block">
            {/* Main timeline line */}
            <div className="w-full h-full bg-white/10 backdrop-blur-xl rounded-full border border-white/20 relative overflow-hidden">
              {/* Animated flowing light sweep */}
              <div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/40 to-transparent w-full h-12 rounded-full"
                style={{
                  animation: 'liquidFlow 3s ease-in-out infinite',
                  transform: 'translateY(-100%)',
                }}
              />
            </div>
            
            {/* Connection dots */}
            {backgroundData.map((_, index) => (
              <div
                key={index}
                className="absolute w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-2 border-white/30 backdrop-blur-sm shadow-lg"
                style={{
                  top: `${(index * 100) / (backgroundData.length - 1)}%`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  animation: `dotPulse 2s ease-in-out infinite ${index * 0.2}s`,
                }}
              />
            ))}

            {/* Connecting flowing lines between icons */}
            {backgroundData.slice(0, -1).map((_, index) => (
              <div
                key={`line-${index}`}
                className="absolute w-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/10 overflow-hidden"
                style={{
                  top: `${((index + 0.5) * 100) / (backgroundData.length - 1)}%`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  height: `${100 / (backgroundData.length - 1)}%`,
                }}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-300/50 to-transparent w-full h-8 rounded-full"
                  style={{
                    animation: `liquidFlow 3s ease-in-out infinite ${index * 0.3}s`,
                    transform: 'translateY(-100%)',
                  }}
                />
              </div>
            ))}
          </div>

          <div className="space-y-12">
            {backgroundData.map((item, index) => (
              <div
                key={index}
                data-index={index}
                className={`timeline-item group relative transform transition-all duration-700 ${
                  visibleItems.includes(index)
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-12 opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className={`relative w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg`}>
                      <item.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20 dark:border-gray-700/20 hover:border-blue-300/30 dark:hover:border-blue-600/30 overflow-hidden group">
                    <div className="p-6">
                      <div className={`flex flex-col md:flex-row md:items-center md:justify-between mb-4 transform transition-all duration-500 ${
                        visibleItems.includes(index) 
                          ? 'translate-x-0 opacity-100' 
                          : '-translate-x-8 opacity-0'
                      }`}>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 md:mb-0 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          <TypewriterText 
                            text={item.title} 
                            isVisible={visibleItems.includes(index)}
                            field="title"
                            index={index}
                            delay={200}
                          />
                        </h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 font-semibold">
                          <TypewriterText 
                            text={item.date} 
                            isVisible={visibleItems.includes(index)}
                            field="date"
                            index={index}
                            delay={400}
                          />
                        </div>
                      </div>
                      
                      <div className={`flex items-center text-gray-600 dark:text-gray-300 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-500 ${
                        visibleItems.includes(index) 
                          ? 'translate-x-0 opacity-100' 
                          : '-translate-x-8 opacity-0'
                      }`}
                      style={{ transitionDelay: '100ms' }}>
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="font-medium">
                          <TypewriterText 
                            text={item.location} 
                            isVisible={visibleItems.includes(index)}
                            field="location"
                            index={index}
                            delay={600}
                          />
                        </span>
                      </div>
                      
                      <p className={`text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-white transition-all duration-500 ${
                        visibleItems.includes(index) 
                          ? 'translate-x-0 opacity-100' 
                          : '-translate-x-8 opacity-0'
                      }`}
                      style={{ transitionDelay: '200ms' }}>
                        <TypewriterText 
                          text={item.description} 
                          isVisible={visibleItems.includes(index)}
                          field="description"
                          index={index}
                          delay={800}
                        />
                      </p>
                    </div>
                    
                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes liquidFlow {
            0% { transform: translateY(-100%); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translateY(200%); opacity: 0; }
          }
          
          @keyframes dotPulse {
            0%, 100% { 
              transform: translateX(-50%) scale(1); 
              opacity: 0.7; 
            }
            50% { 
              transform: translateX(-50%) scale(1.2); 
              opacity: 1; 
            }
          }
        `
      }} />
    </section>
  );
};

export default Background;
