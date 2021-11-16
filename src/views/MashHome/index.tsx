import React from 'react'
import { Link } from 'react-router-dom'
import { MashHomeMain } from '../../components/MashHomeMain';
import { useAudioEffects } from '../../hooks/useAudioEffects';

const MashHome = () => {
  const { playClick } = useAudioEffects()

  return (
    <div>
      <header className="flex justify-between items-center bg-white shadow">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <h1
            className="text-3xl font-bold leading-tight text-gray-900 flex items-center"
          >
            MashApp
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
          </h1>
        </div>
        <nav>
          <ul>
            <li className="flex items-center">
              <Link
                onClick={() => playClick()}
                to="/explore"
                className="text-indigo-600 mr-8 inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 transition duration-150 ease-in-out border-2 border-indigo-500 hover:border-black hover:text-black rounded focus:outline-none"
              >Explore Mashups</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <MashHomeMain />
      </main>
      <footer>
        <p className="flex justify-end pr-8 pb-8 text-indigo-600">#BUIDL on Web3jam</p>
      </footer>
    </div>
  )
}

export default MashHome