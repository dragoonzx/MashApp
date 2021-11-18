import { useCeramic } from "use-ceramic";
import { useEffect, useState } from "react";
import MashProfileMenu from "../MashProfileMenu";
import { useAudioEffects } from "../../hooks/useAudioEffects";
import { state, useSnapshot } from '../../state'
import { IUser } from "../../types";
import { getIPFSUrl } from "../../utils/getIPFS";

// function UsernameIDX() {
//   const ceramic = useCeramic();
//   const [name, setName] = useState("");

//   useEffect(() => {
//     if (ceramic.isAuthenticated && !name) {
//       ceramic.idx
//         .get<{ name: string | undefined }>("basicProfile")
//         .then((profile) => {
//           if (profile && profile.name) {
//             setName(profile.name);
//           }
//         });
//     }
//   });

//   if (name) {
//     return (
//       <p>
//         Name from IDX: <code>{name}</code>
//       </p>
//     );
//   } else {
//     return <></>;
//   }
// }

function SignInWithCeramic() {
  const { playClick } = useAudioEffects()

  const ceramic = useCeramic();
  const [authenticated, setAuthenticated] = useState(ceramic.isAuthenticated);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    const subscription = ceramic.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        setAuthenticated(isAuthenticated);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  });

  const handleLogin = async () => {
    playClick()
    setProgress(true);
    try {
      await ceramic.authenticate();
      const profile: IUser | null = await ceramic.idx.get('basicProfile')

      let image = undefined
      if (profile?.image) {
        const ipfsHash = (profile.image.alternatives[0].src.split('ipfs://'))[1]
        image = {
          alternatives: [
            {
              src: getIPFSUrl(ipfsHash)
            }
          ]
        }
      }

      if (profile) {
        state.currentUser = {
          id: ceramic.did.id,
          name: profile.name,
          emoji: profile.emoji,
          description: profile.description,
          homeLocation: profile.homeLocation,
          image
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setProgress(false);
    }
  };

  const renderButton = () => {
    if (progress) {
      return (
        <>
          <button
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded hover:bg-indigo-500 focus:outline-none"
            disabled={true}
          >
            Connecting...
          </button>
        </>
      );
    } else {
      return (
        <>
          <button
            onClick={handleLogin}
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded hover:bg-indigo-500 focus:outline-none"
          >
            Sign In
          </button>
        </>
      );
    }
  };

  if (authenticated) {
    return (
      <>
        {/* <p>
          Your DID: <code>{ceramic.did.id}</code>
        </p> */}
        <MashProfileMenu />
        {/* <UsernameIDX /> */}
      </>
    );
  } else {
    return (
      <>
        {renderButton()}
      </>
    );
  }
}

export default SignInWithCeramic
