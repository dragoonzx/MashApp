import { proxy, useSnapshot, subscribe } from 'valtio'
import { ITrack, IUser } from '../types'

interface IState {
  currentTrack: ITrack | null;
  mashupMode: boolean;
  currentUser: IUser | null;
}

const state: IState = proxy({
  currentTrack: null,
  mashupMode: false,
  currentUser: null,
})

export { state, useSnapshot, subscribe }