import { useState, useEffect, useRef } from 'react';
import { MUSIC_LIST } from '../../constants/music';
import Button from './Button';
import musicImg from '../../../assets/music.svg';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(MUSIC_LIST[currentTrackIndex].url);

    // Handle track ending
    const handleTrackEnd = () => {
      // Play next track
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % MUSIC_LIST.length);
    };

    audioRef.current.addEventListener('ended', handleTrackEnd);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleTrackEnd);
        audioRef.current.pause();
      }
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Button
      imgUrl={musicImg}
      onClick={togglePlay}
      className={`opacity-100 hover:opacity-75 pointer-events-auto`}
    >
      {isPlaying ? 'Mute' : 'Music'}
    </Button>
  );
}
