import styled from 'styled-components'
import {
  usePeerAndSendEyePosition,
  usePeerAndSendMousePosition,
} from '../hooks/usePeerAndSendEyePosition'
import Text from './Text'

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
`

const InfoPanel = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
`

const Tracker = () => {
  const [peerId, peerConnection] = usePeerAndSendEyePosition()

  return (
    <Container>
      <InfoPanel>
        {peerId && !peerConnection && (
          <span>
            Send this link to a client:{' '}
            <a href={`/#/client/${peerId}`}>/client/{peerId}</a>
          </span>
        )}
        {peerId && peerConnection && (
          <span>connected to: {peerConnection.peer}</span>
        )}
      </InfoPanel>
      <Text shouldBlur={false} />
    </Container>
  )
}

export default Tracker
