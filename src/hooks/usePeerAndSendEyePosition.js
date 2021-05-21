import Peer from 'peerjs'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { eyePositionAtom } from '../state'

export const usePeerAndSendMousePosition = () => {
  const [peerId, setPeerId] = useState()
  const [peerConnection, setPeerConnection] = useState()
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const peer = new Peer(null, {
      debug: 2,
    })
    peer.on('open', (id) => setPeerId(id))
    peer.on('connection', (conn) => setPeerConnection(conn))
    peer.on('error', (err) => console.log(err))
  }, [setPeerId, setPeerConnection])

  useEffect(() => {
    if (peerConnection) {
      peerConnection.send(JSON.stringify({ x: position.x, y: position.y }))
    }
  }, [peerConnection, position])

  useEffect(() => {
    const listener = window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e
      setPosition({ x: clientX, y: clientY })
    })

    return () => window.removeEventListener('mousemove', listener)
  }, [setPosition])

  return [peerId, peerConnection]
}

export const usePeerAndSendEyePosition = () => {
  const [peerId, setPeerId] = useState()
  const [peerConnection, setPeerConnection] = useState()
  const position = useRecoilValue(eyePositionAtom)

  useEffect(() => {
    const peer = new Peer(null, {
      debug: 2,
    })
    peer.on('open', (id) => setPeerId(id))
    peer.on('connection', (conn) => setPeerConnection(conn))
    peer.on('error', (err) => console.log(err))
  }, [setPeerId, setPeerConnection])

  useEffect(() => {
    if (peerConnection) {
      peerConnection.send(JSON.stringify({ x: position.x, y: position.y }))
    }
  }, [peerConnection, position])

  return [peerId, peerConnection]
}
