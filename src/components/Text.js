import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import sampleText from '../data/test'
import { ReactCensored } from 'react-censored'
import { useRecoilValue } from 'recoil'
import { eyePositionAtom } from '../state'

const Container = styled.div`
  margin: 100px auto;
  width: 700px;
  > p {
    width: 100%;
    text-align: justify;
  }
`

const START_BLUR = 10
const DECREASE_AMOUNT = 0.1

const Text = ({ shouldBlur = true }) => {
  const eyePosition = useRecoilValue(eyePositionAtom)
  const [blurState, setBlurState] = useState({
    title: shouldBlur ? START_BLUR : 0,
    text: sampleText.text.map(() => (shouldBlur ? START_BLUR : 0)),
  })

  useEffect(() => {
    const element = document.elementFromPoint(eyePosition.x, eyePosition.y)
    if (element && element.tagName === 'SPAN') {
      setBlurState((state) => ({
        ...state,
        text: state.text.map((value, i) => {
          if (i === parseInt(element.id)) {
            value -= DECREASE_AMOUNT
          }
          return value
        }),
      }))
    } else if (element && element.tagName === 'H1') {
      setBlurState((state) => ({
        ...state,
        title: state.title - DECREASE_AMOUNT,
      }))
    }
  }, [eyePosition])

  return (
    <Container>
      <ReactCensored blur={blurState.title}>
        <h1>{sampleText.title}</h1>
      </ReactCensored>
      <p>
        {sampleText.text.map((line, i) => (
          <>
            <ReactCensored blur={blurState.text[i]}>
              <span id={i}>{line}</span>
            </ReactCensored>
            <br></br>
          </>
        ))}
      </p>
    </Container>
  )
}

export default Text
