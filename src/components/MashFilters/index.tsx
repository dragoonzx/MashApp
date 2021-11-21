import { SyntheticEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Tone from "tone";
import { state } from "../../state";
import { make_download } from "../../utils/makeDownload";

function MashFilters({
  setWaveformContext,
}: {
  setWaveformContext: (context: any) => void;
}) {
  const [player, setPlayer] = useState<Tone.Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const player = new Tone.Player(state.currentTrack?.stream).toDestination();
    setPlayer(player);
    Tone.loaded().then(() => {
      setLoading(false);
    });
  }, []);

  const [distortion, setDistortion] = useState(0);
  const [chorus, setChorus] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [bitCrusher, setBitCrusher] = useState(0);

  const handleDistortionChange = (e: SyntheticEvent) => {
    setDistortion(+(e.target as HTMLInputElement).value);
  };

  const onChorusChange = (e: SyntheticEvent) => {
    setChorus((e.target as HTMLInputElement).checked);
  };

  const onFeedbackChange = (e: SyntheticEvent) => {
    setFeedback((e.target as HTMLInputElement).checked);
  };

  const handleBitCrusherChange = (e: SyntheticEvent) => {
    setBitCrusher(+(e.target as HTMLInputElement).value);
  };

  const [filters, setFilters] = useState<any>({
    distortion,
  });

  const [buffer, setBuffer] = useState<any>(null);

  const play = () => {
    if (!player) {
      return;
    }

    const distortionFilter = new Tone.Distortion(distortion).toDestination();
    let chorusFilter;

    if (chorus) {
      chorusFilter = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
    }

    let feedbackFilter;
    if (feedback) {
      feedbackFilter = new Tone.FeedbackDelay("8n", 0.5).toDestination();
    }

    let bitCrusherFilter;
    if (bitCrusher) {
      bitCrusherFilter = new Tone.BitCrusher(bitCrusher).toDestination();
    }

    setFilters({
      distortion: distortionFilter,
      chorus: chorusFilter,
      feedback: feedbackFilter,
      bitCrusher: bitCrusherFilter,
    });

    player.connect(distortionFilter);
    if (chorusFilter) {
      player.connect(chorusFilter);
    }
    if (feedbackFilter) {
      player.connect(feedbackFilter);
    }
    if (bitCrusherFilter) {
      player.connect(bitCrusherFilter);
    }

    setWaveformContext(player.context);
    console.log(player.buffer.get())
    // buffer sometimes break
    setBuffer(player.buffer.get());
    player.start();
  };

  const pause = () => {
    try {
      Object.keys(filters).forEach((filter) => {
        if (filters[filter]) {
          player?.disconnect(filters[filter]);
        }
      });
    } catch (err) {
      console.error(err);
    }
    player?.stop();
  };

  const [savedMashup, setSavedMashup] = useState<any>(null);

  const saveMashup = () => {
    console.log("save");
    if (!buffer) {
      console.error("no buffer");
      return;
    }

    const savedMashup = make_download(buffer);
    setSavedMashup(savedMashup);
  };

  return (
    <div>
      <h1 className="text-white text-2xl">Mashup Workstation</h1>
      <div
        className="relative bg-gray-900 border p-10 rounded"
        style={{ height: "28rem" }}
      >
        {loading ? (
          <motion.svg
            initial={{ scale: 1.0, opacity: 0.8 }}
            animate={{ scale: 0.9, opacity: 1 }}
            transition={{
              yoyo: Infinity,
              duration: 0.5,
              ease: "easeIn",
            }}
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </motion.svg>
        ) : (
          <div className="">
            <button onClick={play}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button onClick={pause}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        )}

        <div
          className="mt-12 grid grid-cols-2 gap-6"
          style={{ maxWidth: "500px" }}
        >
          <label className="flex flex-col w-40">
            Distortion
            <input
              type="range"
              min="0"
              max="100"
              step="20"
              value={distortion}
              onChange={handleDistortionChange}
            />
          </label>
          <label className="flex flex-col w-40">
            Chorus
            <input type="checkbox" checked={chorus} onChange={onChorusChange} />
          </label>
          <label className="flex flex-col w-40">
            Feedback delay
            <input
              type="checkbox"
              checked={feedback}
              onChange={onFeedbackChange}
            />
          </label>
          <label className="flex flex-col w-40">
            BitCrusher
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={bitCrusher}
              onChange={handleBitCrusherChange}
            />
          </label>
        </div>

        <div className="flex mt-12">
          <button className="text-indigo-600 mr-8 inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 transition duration-150 ease-in-out border-2 border-indigo-500 hover:border-white hover:text-white rounded focus:outline-none">
            Reset
          </button>
          {savedMashup ? (
            <a
              download={savedMashup.name}
              href={savedMashup.href}
              className="inline-flex mr-4 items-center justify-center px-4 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none"
            >
              Save mashup
            </a>
          ) : (
            <button
              onClick={saveMashup}
              className="inline-flex mr-4 items-center justify-center px-4 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none"
            >
              Create mashup
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MashFilters;
