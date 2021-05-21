import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { eyePositionAtom } from '../state'
import Peer from 'peerjs'

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
`

const Tracker = () => {
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

  return (
    <Container>
      {peerId && !peerConnection && (
        <span>
          Send this link to a client:{' '}
          <a href={`/#/client/${peerId}`}>/client/{peerId}</a>
        </span>
      )}
      {peerConnection && <span>connected to: {peerConnection.peer}</span>}
      <button
        onClick={() =>
          peerConnection.send(
            JSON.stringify({ x: Math.random() * 500, y: Math.random() * 500 })
          )
        }
      >
        send
      </button>
      <pre>{JSON.stringify(position, null, 2)}</pre>
    </Container>
  )
}

export default Tracker
