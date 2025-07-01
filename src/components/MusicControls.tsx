
import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '@/config/siteConfig';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const MusicControls: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!siteConfig.backgroundMusic.enabled) return;

    // Find the audio element created by AudioPlayer
    const audio = document.querySelector('audio');
    audioRef.current = audio;

    if (audio) {
      const updatePlayingState = () => {
        setIsPlaying(!audio.paused);
        setIsVisible(true);
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

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!isVisible || !siteConfig.backgroundMusic.enabled) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9998] pointer-events-auto">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-3 shadow-lg">
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlayPause}
            className="text-white hover:text-blue-400 transition-colors duration-200 p-1"
            title={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          
          <button
            onClick={toggleMute}
            className="text-white hover:text-blue-400 transition-colors duration-200 p-1"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicControls;
