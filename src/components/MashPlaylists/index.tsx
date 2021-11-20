/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import { useState, useEffect, SyntheticEvent } from "react";
import { Tab } from "@headlessui/react";
import { classNames } from "../../utils/classNames";
import { durationTimeFormat } from "../../utils/durationTImeFormat";
import { ITrack } from "../../types";
import { useAudioEffects } from "../../hooks/useAudioEffects";
import logo2 from '../../assets/logo2.png'

interface IMashPlaylists {
  playlistTracks: any[];
  currentTrack: ITrack | null;
  setTrackToPlay: (id: string, e?: SyntheticEvent) => void;
}

function MashPlaylists({
  playlistTracks,
  currentTrack,
  setTrackToPlay
}: IMashPlaylists) {
  const { playClick } = useAudioEffects()

  const [categories, setCategories] = useState<{
    Playlist: any[];
    Friends: any[];
  }>({
    Playlist: [],
    Friends: [],
  });

  useEffect(() => {
    setCategories({ ...categories, Playlist: playlistTracks });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistTracks]);

  return (
    <Tab.Group onChange={() => playClick()}>
      <Tab.List className="flex justify-center p-1 space-x-1 bg-blue-900/20 rounded-xl">
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
      <Tab.Panels className="mt-4" style={{ width: "334px" }}>
        {Object.values(categories).map((posts, idx) => (
          <Tab.Panel
            key={idx}
            className={classNames(
              "bg-white rounded p-3 overflow-auto",
              "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
            )}
            style={{ maxHeight: "400px" }}
          >
            {/* {idx === 0 ? <MashMashupsList /> : <div>kek</div>} */}
            <ul>
              {posts.map((track) => (
                <li
                  key={track.id}
                  className={classNames(
                    "flex items-center text-gray-800 relative p-3 rounded-md hover:bg-gray-100",
                    track.id === currentTrack?.id
                      ? "bg-indigo-100 hover:bg-indigo-100"
                      : ""
                  )}
                >
                  <img
                    src={track.artwork?.["150x150"] ?? logo2}
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
  );
}

export default MashPlaylists;
