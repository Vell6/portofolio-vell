
import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/siteConfig';

const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const currentTrack = siteConfig.backgroundMusic.tracks[siteConfig.backgroundMusic.currentTrack];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !siteConfig.backgroundMusic.enabled) return;

    // Load saved time from localStorage
    const savedTime = localStorage.getItem('audioCurrentTime');
    const hasPlayedBefore = localStorage.getItem('audioHasPlayed');
    
    if (savedTime && hasPlayedBefore) {
      audio.currentTime = parseFloat(savedTime);
      setCurrentTime(parseFloat(savedTime));
    }

    // Set volume
    audio.volume = siteConfig.backgroundMusic.volume;

    // Auto-play setup
    if (siteConfig.backgroundMusic.autoplay) {
      const playAudio = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
          setHasStarted(true);
          localStorage.setItem('audioHasPlayed', 'true');
        } catch (error) {
          console.log('Auto-play prevented by browser');
        }
      };

      playAudio();
    }

    // Update current time
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      localStorage.setItem('audioCurrentTime', audio.currentTime.toString());
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', () => {
      if (siteConfig.backgroundMusic.loop) {
        audio.currentTime = 0;
        audio.play();
      }
    });

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  // Save current time when page unloads
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (audioRef.current) {
        localStorage.setItem('audioCurrentTime', audioRef.current.currentTime.toString());
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <audio
      ref={audioRef}
      src={currentTrack.url}
      loop={siteConfig.backgroundMusic.loop}
      preload="auto"
      style={{ display: 'none' }}
    />
  );
};

export default AudioPlayer;
