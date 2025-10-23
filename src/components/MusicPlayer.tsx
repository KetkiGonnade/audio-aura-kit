import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import albumArt from "@/assets/album-art.jpg";
import type { Track } from "@/types/music";

interface MusicPlayerProps {
  track: Track;
  onNext: () => void;
  onPrevious: () => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const MusicPlayer = ({ track, onNext, onPrevious }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", updateTime);
    
    return () => audio.removeEventListener("timeupdate", updateTime);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [track]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  return (
    <Card className="relative overflow-hidden border-border/50 bg-card/95 backdrop-blur-xl p-8">
      <div className="absolute inset-0 bg-gradient-primary opacity-5" />
      
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Album Art */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
          <img
            src={albumArt}
            alt={track.album}
            className={`relative w-64 h-64 rounded-xl shadow-2xl transition-transform duration-300 ${
              isPlaying ? "animate-pulse-glow" : ""
            }`}
          />
        </div>

        {/* Track Info */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {track.title}
          </h2>
          <p className="text-muted-foreground">{track.artist}</p>
          <p className="text-sm text-muted-foreground/70">{track.album}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-2">
          <Slider
            value={[currentTime]}
            max={track.duration}
            step={1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(track.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <Button
            variant="player"
            size="icon"
            onClick={onPrevious}
            aria-label="Previous track"
          >
            <SkipBack className="h-5 w-5" />
          </Button>

          <Button
            variant="play"
            size="play-icon"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="shadow-glow-primary"
          >
            {isPlaying ? (
              <Pause className="h-7 w-7" />
            ) : (
              <Play className="h-7 w-7 ml-1" />
            )}
          </Button>

          <Button
            variant="player"
            size="icon"
            onClick={onNext}
            aria-label="Next track"
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="w-full max-w-xs flex items-center gap-4">
          <Volume2 className="h-5 w-5 text-muted-foreground" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={(value) => setVolume(value[0])}
            className="cursor-pointer"
          />
          <span className="text-sm text-muted-foreground w-12 text-right">
            {volume}%
          </span>
        </div>
      </div>

      <audio ref={audioRef} src={track.audioUrl} />
    </Card>
  );
};
