
import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [prevTime, setPrevTime] = useState(new Date());
  const [showDay, setShowDay] = useState(false);

  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevTime(time);
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  useEffect(() => {
    // Toggle day display every 20 seconds (show for 5 seconds, hide for 15 seconds)
    const dayTimer = setInterval(() => {
      setShowDay(true);
      setTimeout(() => {
        setShowDay(false);
      }, 5000); // Show for 5 seconds
    }, 20000); // Every 20 seconds

    return () => clearInterval(dayTimer);
  }, []);

  const formatTime = (date: Date) => {
    return {
      hours: date.getHours().toString().padStart(2, '0'),
      minutes: date.getMinutes().toString().padStart(2, '0'),
      seconds: date.getSeconds().toString().padStart(2, '0')
    };
  };

  const currentTime = formatTime(time);
  const previousTime = formatTime(prevTime);
  const currentDay = days[time.getDay()];

  const TimeDigit = ({ current, previous, index }: { current: string, previous: string, index: number }) => {
    const hasChanged = current !== previous;
    
    return (
      <span 
        className="inline-block relative overflow-hidden"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <span
          className={`inline-block transition-all duration-300 ${
            hasChanged ? 'animate-[flipIn_0.3s_ease-out]' : ''
          }`}
          key={current}
        >
          {current}
        </span>
      </span>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Main clock container */}
      <div className="relative px-4 py-2 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg overflow-hidden">
        {/* Shine effect every 3 seconds */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{
            animation: 'clockShine 3s ease-in-out infinite',
            transform: 'translateX(-100%)',
          }}
        />
        
        <div className="relative z-10 flex items-center">
          {/* Time display with adaptive colors */}
          <div className="text-lg font-mono font-bold flex items-center space-x-1 transition-colors duration-500"
               style={{
                 color: 'var(--clock-text-color, rgba(255,255,255,0.9))',
                 textShadow: '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)'
               }}>
            <TimeDigit current={currentTime.hours[0]} previous={previousTime.hours[0]} index={0} />
            <TimeDigit current={currentTime.hours[1]} previous={previousTime.hours[1]} index={1} />
            <span className="animate-pulse" style={{ color: 'rgba(59, 130, 246, 0.8)' }}>:</span>
            <TimeDigit current={currentTime.minutes[0]} previous={previousTime.minutes[0]} index={2} />
            <TimeDigit current={currentTime.minutes[1]} previous={previousTime.minutes[1]} index={3} />
            <span className="animate-pulse" style={{ color: 'rgba(59, 130, 246, 0.8)' }}>:</span>
            <TimeDigit current={currentTime.seconds[0]} previous={previousTime.seconds[0]} index={4} />
            <TimeDigit current={currentTime.seconds[1]} previous={previousTime.seconds[1]} index={5} />
          </div>
        </div>
      </div>

      {/* Day name card with connecting element */}
      <div 
        className={`relative transition-all duration-500 ease-in-out ${
          showDay 
            ? 'opacity-100 translate-y-0 max-h-20' 
            : 'opacity-0 -translate-y-2 max-h-0'
        }`}
      >
        {/* Connecting line */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-300/50 to-transparent w-full h-4 rounded-full"
            style={{
              animation: 'liquidFlow 3s ease-in-out infinite',
              transform: 'translateY(-100%)',
            }}
          />
        </div>
        
        {/* Day card */}
        <div className="relative px-3 py-1 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-lg border border-white/20 dark:border-gray-700/20 shadow-lg overflow-hidden">
          {/* Shine effect */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{
              animation: 'clockShine 3s ease-in-out infinite 1s',
              transform: 'translateX(-100%)',
            }}
          />
          
          <div className="relative z-10 text-xs font-medium transition-colors duration-500"
               style={{
                 color: 'var(--clock-text-color, rgba(255,255,255,0.9))',
                 textShadow: '0 0 8px rgba(59, 130, 246, 0.4), 0 0 16px rgba(139, 92, 246, 0.2)'
               }}>
            {currentDay}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @media (prefers-color-scheme: light) {
            :root {
              --clock-text-color: rgba(59, 130, 246, 1);
            }
          }
          
          @media (prefers-color-scheme: dark) {
            :root {
              --clock-text-color: rgba(255, 255, 255, 0.9);
            }
          }
          
          .dark {
            --clock-text-color: rgba(255, 255, 255, 0.9);
          }
          
          html:not(.dark) {
            --clock-text-color: rgba(59, 130, 246, 1);
          }
          
          @keyframes clockShine {
            0% { transform: translateX(-100%); opacity: 0; }
            33% { opacity: 1; }
            100% { transform: translateX(100%); opacity: 0; }
          }
          
          @keyframes flipIn {
            0% { transform: rotateX(-90deg); opacity: 0; }
            50% { transform: rotateX(0deg); opacity: 1; }
            100% { transform: rotateX(0deg); opacity: 1; }
          }
          
          @keyframes liquidFlow {
            0% { transform: translateY(-100%); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translateY(200%); opacity: 0; }
          }
        `
      }} />
    </div>
  );
};

export default DigitalClock;
