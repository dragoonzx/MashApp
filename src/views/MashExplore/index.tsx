import { useState, useEffect, useRef, SyntheticEvent } from "react";
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";
// import * as Tone from "tone";
// @ts-expect-error: no typing
import Wave from "@foobar404/wave";
import SignInWithCeramic from "../../components/SignInWithCeramic";
import MashExploreTrack from "../../components/MashExploreTrack";
import { useAudius } from "../../hooks/useAudius";
import { ITrack } from "../../types";
import MashupsList from "../../components/MashupsList";
import MashPlaylists from "../../components/MashPlaylists";
import { state, useSnapshot } from "../../state";
import MashDialog from "../../components/MashDialog";
import { useMoralisQuery } from "react-moralis";
import { getIPFSUrl } from "../../utils/getIPFS";
import MashLoader from "../../components/MashLoader";
import { useMoralisFile, useNewMoralisObject } from 'react-moralis';

const MashAbout = () => {
  useEffect(() => {
    (new Wave()).fromElement("audio", "output", { type: "bars", stroke: 2 });

    return () => {
      // @ts-ignore
      if (!window.$wave?.audio?.source) {
        return
      }

      // @ts-ignore
      window.$wave.audio.source = null
    }
  }, []);

  const { data, error, isLoading } = useMoralisQuery("Mashups");
  const [mashupTracks, setMashupTracks] = useState<any[]>([])

  useEffect(() => {
    if (!data.length) {
      return
    }
    console.log(data)
    const mashups = data.map(v => ({
      id: v.get('mashup')?.mashupHash,
      userId: v.get('user')?.id,
      userName: v.get('user')?.name,
      mashup: `${getIPFSUrl(v.get('mashup')?.mashupHash)}`,
      title: v.get('mashup')?.title
    }))
    console.log(mashups)
    setMashupTracks(mashups)
  }, [data])

  const [loading, setLoading] = useState(true)

  const [playing, setPlaying] = useState(false);

  const { host, getTrendingTracks, getTrackSrc } = useAudius();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [trendingTracks, setTrendingTracks] = useState<any[]>([]);

  const [playlistTracks, setPlaylistTracks] = useState<any[]>([]);


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

    let track = trendingTracks.find(
      (track) => track.id === trendingTracks[0]?.id
    );

    const trackId = track.id

    let stream = ''
  
    if (!track) {
      track = mashupTracks.find(track => track.id === trackId)
      stream = track.mashup
    } else {
      stream = getTrackSrc(trackId);
    }
    console.log(stream)
    setCurrentTrack({
      id: track.id,
      artwork: track.artwork?.["480x480"],
      title: track.title,
      genre: track.genre,
      stream
    });
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trendingTracks]);

  const setTrackToPlay = async (trackId: string, e?: SyntheticEvent) => {
    e?.preventDefault();

    let track = trendingTracks.find((track) => track.id === trackId);

    let stream = ''
  
    if (!track) {
      track = mashupTracks.find(track => track.id === trackId)
      stream = track.mashup
    } else {
      stream = getTrackSrc(trackId);
    }

    setCurrentTrack({
      id: trackId,
      artwork: track?.artwork?.["480x480"],
      title: track?.title,
      genre: track?.genre,
      stream
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

  const onTrackPlay = () => {
    setPlaying(true);
    audioRef.current?.play()
  };

  const onTrackPause = () => {
    setPlaying(false);
    audioRef.current?.pause()
  };

  const snap = useSnapshot(state)

  const { isSaving, save } = useNewMoralisObject('FavouriteTracks');
  const favQuery = useMoralisQuery("FavouriteTracks");

  const onAddToFavourites = async () => {

    if(state?.currentUser == null || currentTrack == null){
      console.log("Cannot save, you are not logged in")
      return;
    }
    
    // const currentTracks: string[] = favQuery?.data.map((v) => v.get("tracks")) ?? {};
    const currentTracks: string[] = JSON.parse(localStorage.getItem('favTracks')??"[]") ?? {};
    const currentTrackId: string = currentTrack.id;

    const index = currentTracks.indexOf(currentTrackId);
    if(index == -1){
      console.log(`Push "${currentTrackId}" to fav tracks`)
      currentTracks.push(currentTrackId)
    }
    else{
      console.log(`Removing "${currentTrackId}" from fav tracks`);
      currentTracks.splice(index, 1)
    }

    console.log(`saving fav tracks (${currentTracks.length}): ` + JSON.stringify(currentTracks));
    
    localStorage.setItem('favTracks', JSON.stringify(currentTracks))
    
    const tracks = await Promise.all(currentTracks.map(async x => await fetch(getTrackSrc(x))));
    setPlaylistTracks(tracks);
    // await save({
    //   user: {
    //     id: state.currentUser.id,
    //     name: state.currentUser.name,
    //   },
    //   tracks: currentTracks.slice(0, 3),
    // });
  };

  const trackStatus = playing ? "playing" : "pause";

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  const navigate = useNavigate();

  const toggleMashupMode = (curTrackId: string) => {
    if (!currentTrack) {
      return
    }

    if (!state.currentUser) {
      openModal()
      return
    }

    state.currentTrack = { ...currentTrack }
    state.mashupMode = true

    setTimeout(() => {
      navigate('/edit');
    }, 800)
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const trackVariants = {
    center: { scale: 1 },
    top: { x: '-160%', y: '-66%', scale: 0.2 }
  }

  return (
    <>
      {loading && <MashLoader />}
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
        <div className="absolute bg-pattern top-0 min-h-screen min-w-full bg-black bg-opacity-25"></div>
        {/* Left: mashups list */}
        <motion.div
          initial="hidden"
          animate={(snap.mashupMode || loading) ? 'hidden' : 'visible'}
          variants={variants}
        >
          <MashupsList
            trendingTracks={trendingTracks}
            mashupTracks={mashupTracks}
            currentTrack={currentTrack}
            setTrackToPlay={setTrackToPlay}
          />
        </motion.div>
        {/* Center: track & actions */}
        <motion.div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial="hidden"
          animate={loading ? 'hidden' : 'visible'}
          variants={variants}
        >
          <motion.div
            initial="center"
            animate={snap.mashupMode ? 'top' : 'center'}
            variants={trackVariants}
          >
            <MashExploreTrack
              currentTrack={currentTrack}
              onTrackPlay={onTrackPlay}
              onTrackPause={onTrackPause}
              onAddToFavourites={onAddToFavourites}
              toggleMashupMode={toggleMashupMode}
              trackState={trackStatus}
            />
            <MashDialog
              title="You need to sign in"
              description="In order to edit or upload new tracks you need to sign in"
              isOpen={isOpen}
              closeModal={closeModal}
            />
          </motion.div>
          <motion.div
            initial="visible"
            animate={snap.mashupMode ? 'hidden' : 'visible'}
            variants={variants}
          >
            <button
              onClick={nextTrackPlay}
              className="flex justify-center mx-auto mt-4"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
            <audio
              id="audio"
              ref={audioRef}
              controls
              className="mt-4"
            ></audio>
          </motion.div>
        </motion.div>
        {/* Right: profile connect & track edit mode */}
        <div className="absolute right-8 top-8 left-auto">
          <div className="flex items-center">
            <SignInWithCeramic />
          </div>
        </div>
        <motion.div
          className="absolute right-8 top-24"
          initial="hidden"
          animate={(snap.mashupMode || loading) ? 'hidden' : 'visible'}
          variants={variants}
        >
          <MashPlaylists
            playlistTracks={playlistTracks}
            currentTrack={currentTrack}
            setTrackToPlay={setTrackToPlay}
          />
        </motion.div>
      </div>
    </>
  );
};

export default MashAbout;
