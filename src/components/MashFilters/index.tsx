import { SyntheticEvent, useEffect, useState } from 'react'
import { motion } from "framer-motion"
import * as Tone from 'tone'
import { state } from '../../state'

function MashFilters() {
  const [player, setPlayer] = useState<Tone.Player | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const player = new Tone.Player(state.currentTrack?.stream).toDestination();
    setPlayer(player)
    Tone.loaded().then(() => {
      setLoading(false)
    });
  }, [])

  const [distortion, setDistortion] = useState(0);
  const [chorus, setChorus] = useState(false);
  
  const handleDistortionChange = (e: SyntheticEvent) => {
    setDistortion(+(e.target as HTMLInputElement).value)
  }
  
  const onChorusChange = (e: SyntheticEvent) => {
    setChorus((e.target as HTMLInputElement).checked)
  }

  const [filters, setFilters] = useState<any>({
    distortion
  })

  const play = () => {
    if (!player) {
      return
    }

    const distortionFilter = new Tone.Distortion(distortion).toDestination();
    let chorusFilter

    if (chorus) {
      chorusFilter = new Tone.Chorus(4, 2.5, 0.5).toDestination().start();
    }

    setFilters({
      distortion: distortionFilter,
      chorus: chorusFilter
    })

    player.connect(distortionFilter);
    if (chorusFilter) {
      player.connect(chorusFilter)
    }

    player.start()
  }

  const pause = () => {
    try {
      player?.disconnect(filters.distortion)
      if (filters.chorusFilter) {
        player?.disconnect(filters.chorusFilter)
      }
    } catch(err) {
      console.error(err)
    }
    player?.stop()
  }

  return (
    <div>
      <h1 className="text-white text-2xl">Mashup Workstation</h1>
      <div className="relative mt-12" style={{ height: '28rem'}}>
        <label className="table-caption">
          Distortion
          <input type="range" min="0" max="100" step="20" value={distortion} onChange={handleDistortionChange} />
        </label>
        <label className="table-caption">
          Chorus
          <input type="checkbox" checked={chorus} onChange={onChorusChange} />
        </label>
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
            className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </motion.svg>
        ) : (
          <div className="mt-8">
            <button onClick={play}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button onClick={pause}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MashFilters
