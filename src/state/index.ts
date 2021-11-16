import { proxy, useSnapshot, subscribe } from 'valtio'

const state = proxy({
  count: 0
})

export { state, useSnapshot, subscribe }