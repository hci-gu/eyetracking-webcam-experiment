import Peer from 'peerjs'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
`

const Dot = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: orange;
`

function Client() {
  const { id } = useParams()
  const [position, setPosition] = useState(null)

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
    </Container>
  )
}

export default Client
