import Peer from 'peerjs'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import Text from './components/Text'
import { eyePositionAtom } from './state'

const Container = styled.div`
  position: relative;
`

const Dot = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
`

function Client() {
  const { id } = useParams()
  const [position, setPosition] = useRecoilState(eyePositionAtom)

  useEffect(() => {
    const peer = new Peer(null, {
      debug: 2,
    })
    setTimeout(() => {
      const connection = peer.connect(id, {
        reliable: true,
      })
      connection.on('open', () => {
        console.log('OPENED')
      })
      connection.on('data', (data) => {
        setPosition(JSON.parse(data))
      })
    }, 2000)
  }, [id, setPosition])

  return (
    <Container>
      {position && <Dot style={{ left: position.x, top: position.y }} />}
      <Text />
    </Container>
  )
}

export default Client
