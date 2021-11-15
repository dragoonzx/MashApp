import { useState, useEffect, useCallback } from 'react'

const AUDIUS_API_VERSION = '/v1'
const AUDIUS_API_ENDPOINTS = {
  GET_TRENDING_TRACKS: '/tracks/trending',
}

const APP_NAME_QUERY = '?app_name=MASHAPP'

const sample = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]

const getAudiusHost = async () => {
  const host = await fetch('https://api.audius.co')
    .then(r => r.json())
    .then(j => j.data)
    .then(d => sample(d))

  return host
}

export const useAudius = () => {
  const [audius, setAudius] = useState<any>(null)
  const [host, setHost] = useState('')

  useEffect(() => {
    async function initHook() {
      const host = await getAudiusHost()
      setHost(host)
    }

    initHook()
  }, [])
  
  const getTrendingTracks = useCallback((): Promise<any> => {
    return fetch(`${host}${AUDIUS_API_VERSION}${AUDIUS_API_ENDPOINTS.GET_TRENDING_TRACKS}${APP_NAME_QUERY}`).then(res => res.json())
  }, [host]);

  const getTrackSrc = useCallback((trackId: string): string => {
    return `${host}${AUDIUS_API_VERSION}/tracks/${trackId}/stream${APP_NAME_QUERY}`
  }, [host])

  return { host, getTrendingTracks, getTrackSrc }
}