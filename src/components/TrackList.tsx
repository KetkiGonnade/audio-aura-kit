import { Music } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Track } from "@/types/music";

interface TrackListProps {
  tracks: Track[];
  currentTrack: Track;
  onSelectTrack: (track: Track) => void;
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const TrackList = ({ tracks, currentTrack, onSelectTrack }: TrackListProps) => {
  return (
    <Card className="p-6 border-border/50 bg-card/95 backdrop-blur-xl">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Music className="h-5 w-5 text-primary" />
        Playlist
      </h3>
      <div className="space-y-2">
        {tracks.map((track) => {
          const isActive = track.id === currentTrack.id;
          return (
            <button
              key={track.id}
              onClick={() => onSelectTrack(track)}
              className={`w-full p-4 rounded-lg text-left transition-all hover:bg-secondary/50 ${
                isActive
                  ? "bg-gradient-primary/10 border border-primary/30"
                  : "bg-secondary/20"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      isActive ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {track.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{track.artist}</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDuration(track.duration)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};
