import { useState } from "react";
import { MusicPlayer } from "@/components/MusicPlayer";
import { TrackList } from "@/components/TrackList";
import { tracks } from "@/data/tracks";

const Index = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentTrack = tracks[currentTrackIndex];

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrevious = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleSelectTrack = (trackId: number) => {
    const index = tracks.findIndex((t) => t.id === trackId);
    if (index !== -1) {
      setCurrentTrackIndex(index);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-bg p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Music Player
          </h1>
          <p className="text-muted-foreground text-lg">
            Immerse yourself in the sound
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <MusicPlayer
            track={currentTrack}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
          
          <TrackList
            tracks={tracks}
            currentTrack={currentTrack}
            onSelectTrack={(track) => handleSelectTrack(track.id)}
          />
        </div>
      </div>
    </main>
  );
};

export default Index;
