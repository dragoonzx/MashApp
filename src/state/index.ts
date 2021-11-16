import { proxy, useSnapshot, subscribe } from 'valtio'

const state = proxy({})

export { state, useSnapshot, subscribe }