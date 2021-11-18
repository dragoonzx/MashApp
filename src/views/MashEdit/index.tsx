import { useEffect } from 'react'
import { useMoralisFile, useNewMoralisObject } from 'react-moralis';
import { Link, useNavigate } from "react-router-dom";
import MashDropzone from '../../components/MashDropzone'
import MashFilters from '../../components/MashFilters'
import SignInWithCeramic from '../../components/SignInWithCeramic'
import { state, useSnapshot } from '../../state'
import { notifyError, notifySuccess } from '../../utils/toaster';

function MashEdit() {
  const snap = useSnapshot(state)
  const navigate = useNavigate()

  useEffect(() => {
    if (!snap.currentTrack) {
      navigate('/explore')
    }

    return () => {
      state.currentTrack = null
      state.mashupMode = false
    }
  }, [])

  const {
    isUploading,
    moralisFile,
    saveFile,
  } = useMoralisFile();
  const { isSaving, save } = useNewMoralisObject('Mashups');

  const acceptedFilesChanged = async (acceptedFiles: any) => {
    if (!(acceptedFiles.length && snap.currentUser)) {
      return
    }

    try {
      const file = acceptedFiles[0]
      console.log(file)
      const ipfsFileInfo = await saveFile(file.name, file, { saveIPFS: true })
      await save({
        user: {
          id: snap.currentUser.id,
          name: snap.currentUser.name
        },
        mashup: {
          title: file.name,
          // @ts-expect-error: hash typing
          mashupHash: ipfsFileInfo._hash
        }
      })
      notifySuccess('File uploaded!')
    } catch {
      notifyError('Error :(')
    }
  }


  return (
    <div className="bg-indigo-800 min-h-screen text-white">
      <div className="absolute bg-pattern top-0 min-h-screen min-w-full bg-black bg-opacity-25"></div>
      {/* Left: mashups list */}
      <div className="absolute top-6 left-8 flex">
        <img src={snap.currentTrack?.artwork} className="w-32 h-32 rounded" alt="" />
        <div className="flex flex-col ml-4">
          <p>{snap.currentTrack?.title}</p>
          <p>{snap.currentTrack?.genre}</p>
        </div>
      </div>
      {/* Center: Filters & Upload new */}
      <div className="pt-48 pr-8 pl-8">
        <MashFilters />
        <MashDropzone acceptedFilesChanged={acceptedFilesChanged} />
      </div>
      {/* Right: profile connect & track edit mode */}
      <div className="absolute flex items-center right-8 top-8 left-auto">
          <Link to="/explore" className="
                inline-flex
                mr-4
                items-center
                justify-center
                px-4
                py-3
                text-base
                font-medium
                leading-6
                text-white
                transition
                duration-150
                ease-in-out
                bg-indigo-600
                border border-transparent
                rounded-md
                hover:bg-indigo-500
                focus:outline-none
              ">
            Explore
          </Link>
          <div className="flex items-center">
            <SignInWithCeramic />
          </div>
        </div>
    </div>
  )
}

export default MashEdit
