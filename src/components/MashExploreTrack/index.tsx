import React from "react";
import { ITrack } from "../../types";

interface IMashExploreTrack {
  currentTrack: ITrack | null;
  onTrackPlay: () => void;
  onTrackPause: () => void;
  onAddToFavourites: () => void;
  toggleMashupMode: (currentTrackId: string) => void;
  trackState: "playing" | "pause";
}

function MashExploreTrack({
  currentTrack,
  onTrackPlay,
  onTrackPause,
  onAddToFavourites,
  toggleMashupMode,
  trackState,
}: IMashExploreTrack) {
  const isPlaying = trackState === "playing";

  return (
    <div
      className="bg-white shadow-lg rounded p-3"
    >
      <div className="group relative">
        <img
          className="w-full md:w-72 block rounded mx-auto"
          src={
            !currentTrack
              ? ""
              : currentTrack.artwork
          }
          alt=""
        />
        <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
          <button 
          onClick={onAddToFavourites}
          className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>
          </button>

          <button
            onClick={isPlaying ? onTrackPause : onTrackPlay}
            className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
          >
            {!isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-play-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          <button
            onClick={() => toggleMashupMode(currentTrack?.id ?? "")}
            className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-5" style={{ maxWidth: "280px" }}>
        <h3 className="text-black text-lg truncate">
          {!currentTrack ? "Epoch" : currentTrack.title}
        </h3>
        <p className="text-gray-600">
          {!currentTrack ? "Tycho" : currentTrack.genre}
        </p>
      </div>
    </div>
  );
}

export default MashExploreTrack;
