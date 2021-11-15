import { useState, useEffect, useRef, SyntheticEvent } from "react";
import { Tab } from "@headlessui/react";
// @ts-expect-error: no typing
import Wave from "@foobar404/wave";
// @ts-expect-error: no typing
import track from "./track2.mp3";
import MashMashupsList from "../../components/MashMashupsList";
import SignInWithCeramic from "../../components/SignInWithCeramic";
import MashExploreTrack from "../../components/MashExploreTrack";
import { classNames } from "../../utils/classNames";
import { useAudius } from "../../hooks/useAudius";
import { durationTimeFormat } from "../../utils/durationTImeFormat";
import { ITrack } from "../../types";

const MashAbout = () => {
  const [wave] = useState(new Wave());
  const [playing, setPlaying] = useState(false);

  const { host, getTrendingTracks, getTrackSrc } = useAudius();

  const [trendingTracks, setTrendingTracks] = useState<any[]>([]);

  useEffect(() => {
    if (!host) {
      return;
    }

    getTrendingTracks().then((res) => setTrendingTracks(res.data.slice(0, 20)));
  }, [host, getTrendingTracks]);

  useEffect(() => {
    if (!trendingTracks.length) {
      return
    }

    setTrackToPlay(trendingTracks[0]?.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trendingTracks])

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const setTrackToPlay = (trackId: string, e?: SyntheticEvent) => {
    if (!audioRef.current) {
      return
    }

    e?.preventDefault()

    const track = trendingTracks.find(track => track.id === trackId)
    const stream = getTrackSrc(trackId)

    setCurrentTrack({
      id: trackId,
      artwork: track.artwork?.['480x480'],
      title: track.title,
      genre: track.genre,
    })

    audioRef.current.src = stream
    onTrackPlay()
  }

  const nextTrackPlay = () => {
    const curTrackIndex = trendingTracks.findIndex(track => track.id === currentTrack?.id)
    const nextTrackId = trendingTracks[curTrackIndex + 1]?.id

    if (curTrackIndex !== undefined && nextTrackId !== undefined) {
      setTrackToPlay(nextTrackId)
    } else {
      const firstTrackId = trendingTracks[0].id
      setTrackToPlay(firstTrackId)
    }
  }

  const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null)

  useEffect(() => {
    wave.fromElement("audio", "output", { type: "bars", stroke: 2 });
  }, [wave]);

  const onTrackPlay = () => {
    audioRef.current?.play();
    setPlaying(true);
  };

  const onTrackPause = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  const trackStatus = playing ? "playing" : "pause";

  const [categories, setCategories] = useState<{
    Trending: any[];
    Mashups: any[];
  }>({
    Trending: [],
    Mashups: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
  });

  useEffect(() => {
    setCategories({ ...categories, Trending: trendingTracks });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trendingTracks]);

  return (
    <>
      <div className="bg-indigo-800 min-h-screen text-white">
        <canvas
          id="output"
          className="absolute min-h-screen mx-auto"
          style={{
            width: '100%',
            height: '250px',
            bottom: 0,
            minHeight: '400px'
          }}
          height="500"
          width="2040"
        ></canvas>
        <div className="absolute top-0 min-h-screen min-w-full bg-black bg-opacity-25"></div>
        {/* Left: mashups list */}
        <Tab.Group>
          <Tab.List className="absolute left-12 top-8 flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-36 py-2.5 text-sm leading-5 font-medium rounded",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                    selected
                      ? "bg-white shadow text-indigo-600"
                      : "text-white hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels
            className="absolute left-8 top-24"
            style={{ width: "334px" }}
          >
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "bg-white rounded p-3 overflow-auto",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
                )}
                style={{ maxHeight: 'calc(100vh - 128px)' }}
              >
                {/* {idx === 0 ? <MashMashupsList /> : <div>kek</div>} */}
                <ul>
                  {posts.map((track) => (
                    <li
                      key={track.id}
                      className={classNames(
                        "flex items-center text-gray-800 relative p-3 rounded-md hover:bg-gray-100",
                        track.id === currentTrack?.id ? 'bg-indigo-100 hover:bg-indigo-100' : ''
                      )}
                    >
                      <img
                        src={track.artwork?.["150x150"]}
                        loading="lazy"
                        className="w-12 h-12 mr-4 rounded"
                        alt=""
                      />
                      <div>
                        <h3 className="text-sm font-medium leading-5">
                          {track.title}
                        </h3>

                        <ul className="flex mt-1 space-x-1 text-xs font-normal leading-4">
                          <li>{durationTimeFormat(track.duration)}</li>
                          {track.mood ? (
                            <>
                              <li>&middot;</li>
                              <li>{track.mood}</li>
                            </>
                          ) : null}
                          <li>&middot;</li>
                          <li>{track.shareCount} shares</li>
                        </ul>
                      </div>

                      <a
                        href="#"
                        onClick={(e) => setTrackToPlay(track.id, e)}
                        className={classNames(
                          "absolute inset-0 rounded-md",
                          "focus:z-10 focus:outline-none focus:ring-2 ring-blue-400"
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
        {/* Center: track & actions */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <MashExploreTrack
            currentTrack={currentTrack}
            onTrackPlay={onTrackPlay}
            onTrackPause={onTrackPause}
            trackState={trackStatus}
          />
          <button onClick={nextTrackPlay} className="flex justify-center mx-auto mt-4">
            Next track
          </button>
          <audio
            id="audio"
            ref={audioRef}
            src={track}
            controls
            className="mt-4"
          ></audio>
        </div>
        {/* Right: profile connect & track edit mode */}
        <div className="absolute right-8 top-8 left-auto">
          <SignInWithCeramic />
        </div>
      </div>
    </>
  );
};

export default MashAbout;
