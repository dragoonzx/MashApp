import { useState, useEffect, useRef, SyntheticEvent } from "react";
// import * as Tone from "tone";
// @ts-expect-error: no typing
import Wave from "@foobar404/wave";
import { Switch } from '@headlessui/react'
import SignInWithCeramic from "../../components/SignInWithCeramic";
import MashExploreTrack from "../../components/MashExploreTrack";
import { useAudius } from "../../hooks/useAudius";
import { ITrack } from "../../types";
import MashupsList from "../../components/MashupsList";
import MashPlaylists from "../../components/MashPlaylists";

const MashAbout = () => {  
  const [wave] = useState(new Wave());
  const [playing, setPlaying] = useState(false);

  const { host, getTrendingTracks, getTrackSrc } = useAudius();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [trendingTracks, setTrendingTracks] = useState<any[]>([]);

  useEffect(() => {
    if (!host) {
      return;
    }

    getTrendingTracks().then((res) => setTrendingTracks(res.data.slice(0, 20)));
  }, [host, getTrendingTracks]);

  useEffect(() => {
    if (!trendingTracks.length) {
      return;
    }

    const track = trendingTracks.find(
      (track) => track.id === trendingTracks[0]?.id
    );

    setCurrentTrack({
      id: track.id,
      artwork: track.artwork?.["480x480"],
      title: track.title,
      genre: track.genre,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trendingTracks]);

  // const [player, setPlayer] = useState(new Tone.Player());

  const setTrackToPlay = async (trackId: string, e?: SyntheticEvent) => {
    e?.preventDefault();

    const track = trendingTracks.find((track) => track.id === trackId);
    const stream = getTrackSrc(trackId);

    setCurrentTrack({
      id: trackId,
      artwork: track.artwork?.["480x480"],
      title: track.title,
      genre: track.genre,
    });

    if (!audioRef.current) {
      return
    }

    audioRef.current.src = stream

    onTrackPlay();
  };

  const nextTrackPlay = () => {
    const curTrackIndex = trendingTracks.findIndex(
      (track) => track.id === currentTrack?.id
    );
    const nextTrackId = trendingTracks[curTrackIndex + 1]?.id;

    if (curTrackIndex !== undefined && nextTrackId !== undefined) {
      setTrackToPlay(nextTrackId);
    } else {
      const firstTrackId = trendingTracks[0].id;
      setTrackToPlay(firstTrackId);
    }
  };

  const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null);

  useEffect(() => {
    wave.fromElement("audio", "output", { type: "bars", stroke: 2 });
  }, [wave]);

  const onTrackPlay = () => {
    setPlaying(true);
    audioRef.current?.play()
  };

  const onTrackPause = () => {
    setPlaying(false);
    audioRef.current?.pause()
  };

  const trackStatus = playing ? "playing" : "pause";

  const [mashupMode, setMashupMode] = useState(false)

  const toggleMashupMode = (curTrackId: string) => {
    console.log(curTrackId)
    setMashupMode(true)
  }

  return (
    <>
      <div className="bg-indigo-800 min-h-screen text-white">
        <canvas
          id="output"
          className="absolute min-h-screen mx-auto"
          style={{
            width: "100%",
            height: "250px",
            bottom: 0,
            minHeight: "400px",
          }}
          height="500"
          width="2040"
        ></canvas>
        <div className="absolute top-0 min-h-screen min-w-full bg-black bg-opacity-25"></div>
        {/* Left: mashups list */}
        <MashupsList
          trendingTracks={trendingTracks}
          currentTrack={currentTrack}
          setTrackToPlay={setTrackToPlay}
        />
        {/* Center: track & actions */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MashExploreTrack
            currentTrack={currentTrack}
            onTrackPlay={onTrackPlay}
            onTrackPause={onTrackPause}
            toggleMashupMode={toggleMashupMode}
            trackState={trackStatus}
          />
          <button
            onClick={nextTrackPlay}
            className="flex justify-center mx-auto mt-4"
          >
            Next track
          </button>
          <audio
            id="audio"
            ref={audioRef}
            controls
            className="mt-4"
          ></audio>
        </div>
        {/* Right: profile connect & track edit mode */}
        <div className="absolute right-8 top-8 left-auto">
          <div className="flex items-center">
            {mashupMode && <div className="mr-4">MASHUP MODE ON</div>}
            <SignInWithCeramic />
          </div>
        </div>
        <div className="absolute right-8 top-24">
          <MashPlaylists
            trendingTracks={trendingTracks}
            currentTrack={currentTrack}
            setTrackToPlay={setTrackToPlay}
          />
        </div>
      </div>
    </>
  );
};

export default MashAbout;
