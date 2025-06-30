
import React, { useEffect, useState, useRef } from 'react';
import { School, Briefcase, Calendar, MapPin, GraduationCap, Award, Building2, Heart } from 'lucide-react';

const Background = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  const backgroundData = [
    {
      icon: Calendar,
      title: 'Kelahiran',
      date: '15 Januari 1995',
      location: 'Jakarta, Indonesia',
      description: 'Lahir di Jakarta sebagai anak pertama dari dua bersaudara.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: School,
      title: 'Sekolah Dasar',
      date: '2001 - 2007',
      location: 'SD Negeri 01 Jakarta',
      description: 'Menyelesaikan pendidikan dasar dengan prestasi yang baik dan aktif dalam kegiatan ekstrakurikuler.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: GraduationCap,
      title: 'Sekolah Menengah Pertama',
      date: '2007 - 2010',
      location: 'SMP Negeri 5 Jakarta',
      description: 'Mulai tertarik dengan teknologi dan komputer. Aktif dalam klub komputer sekolah.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Sekolah Menengah Atas',
      date: '2010 - 2013',
      location: 'SMA Negeri 8 Jakarta',
      description: 'Mengambil jurusan IPA dan meraih juara 2 dalam kompetisi programming tingkat provinsi.',
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
            setVisibleItems(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = document.querySelectorAll('.timeline-item');
    items.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

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
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full hidden md:block opacity-30"></div>

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
                  <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 overflow-hidden group">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 md:mb-0 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 font-semibold">
                          {item.date}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="font-medium">{item.location}</span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300">
                        {item.description}
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
    </section>
  );
};

export default Background;
