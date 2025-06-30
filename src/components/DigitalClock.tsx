
import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [prevTime, setPrevTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevTime(time);
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const formatTime = (date: Date) => {
    return {
      hours: date.getHours().toString().padStart(2, '0'),
      minutes: date.getMinutes().toString().padStart(2, '0'),
      seconds: date.getSeconds().toString().padStart(2, '0')
    };
  };

  const currentTime = formatTime(time);
  const previousTime = formatTime(prevTime);

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
    <div className="relative px-4 py-2 bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg overflow-hidden">
      {/* Shine effect every 3 seconds */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        style={{
          animation: 'clockShine 3s ease-in-out infinite',
          transform: 'translateX(-100%)',
        }}
      />
      
      <div className="relative z-10 text-lg font-mono font-bold text-gray-700 dark:text-gray-300 flex items-center space-x-1">
        <TimeDigit current={currentTime.hours[0]} previous={previousTime.hours[0]} index={0} />
        <TimeDigit current={currentTime.hours[1]} previous={previousTime.hours[1]} index={1} />
        <span className="animate-pulse text-blue-500">:</span>
        <TimeDigit current={currentTime.minutes[0]} previous={previousTime.minutes[0]} index={2} />
        <TimeDigit current={currentTime.minutes[1]} previous={previousTime.minutes[1]} index={3} />
        <span className="animate-pulse text-blue-500">:</span>
        <TimeDigit current={currentTime.seconds[0]} previous={previousTime.seconds[0]} index={4} />
        <TimeDigit current={currentTime.seconds[1]} previous={previousTime.seconds[1]} index={5} />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
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
        `
      }} />
    </div>
  );
};

export default DigitalClock;
