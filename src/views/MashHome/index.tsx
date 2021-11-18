import React from 'react'
import { Link } from 'react-router-dom'
import { MashHomeMain } from '../../components/MashHomeMain';
import { useAudioEffects } from '../../hooks/useAudioEffects';
import logo from '../../../src/assets/logo1.png'

const MashHome = () => {
  const { playClick } = useAudioEffects()

  return (
    <div>
      <header className="flex justify-between items-center bg-white shadow">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <h1
            className="text-3xl font-bold leading-tight text-gray-900 flex items-center"
          >
            <img src={logo} height="128" width="128"></img>
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