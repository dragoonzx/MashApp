import useSound from 'use-sound';
// @ts-ignore
import clickSfx from '../assets/click.wav';


export const useAudioEffects = () => {
  const [playClick] = useSound(
    clickSfx,
    { volume: 0.5 }
  );
  
  return { playClick }
}
