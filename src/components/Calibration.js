import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import webgazer from 'webgazer'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { calibrationAtom, calibrationDoneSelector } from '../state'

export const setHasCalibrated = () => {
  localStorage.setItem('calibrated', true)
}
export const isCalibrated = () => localStorage.getItem('calibrated') === 'true'

const Container = styled.div`
  width: 100%;
  height: 100%;
  > h2 {
    width: 100%;
    text-align: center;
  }
`

const PointsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  margin: 15vh 15vw;
  width: 95vw;
  height: 95vh;
`

const Point = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;

  background-color: ${({ value, max }) => `${value >= max ? 'green' : 'red'}`};
  opacity: ${({ value, max }) => `${0.2 + value / max}`};
`

const CalibrationPoints = () => {
  const [calibrationPoints, setCalibrationPoints] =
    useRecoilState(calibrationAtom)

  const onClick = (id) => {
    setCalibrationPoints(
      calibrationPoints.map((p) => {
        return {
          ...p,
          value: p.id === id ? p.value + 1 : p.value,
        }
      })
    )
  }

  return (
    <PointsContainer>
      {calibrationPoints.map((p) => (
        <Point {...p} key={p.id} onClick={() => onClick(p.id)} />
      ))}
    </PointsContainer>
  )
}

const Calibration = ({ onDone }) => {
  const [showCalibrationPoints, setShowCalibrationPoints] = useState(false)
  const [calibrationPrecision, setCalibrationPrecision] = useState(null)
  const calibrationDone = useRecoilValue(calibrationDoneSelector)

  useEffect(() => {
    Swal.fire({
      title: 'Calibration',
      text: 'Please click on each of the 9 points on the screen. You must click on each point 5 times till it goes green. This will calibrate your eye movements.',
      buttons: {
        cancel: false,
        confirm: true,
      },
    }).then((isConfirm) => {
      webgazer.clearData()
      setShowCalibrationPoints(true)
    })
  }, [setShowCalibrationPoints])

  useEffect(() => {
    if (calibrationDone) {
      Swal.fire({
        title: 'Calibration done!',
        text: 'You can now start reading the texts on the page',
        closeOnEsc: false,
        allowOutsideClick: false,
        closeModal: true,
      }).then(() => {
        onDone()
      })
    }
  }, [calibrationDone, setCalibrationPrecision])

  return (
    <Container>
      <h2>
        {calibrationDone
          ? `calibration done - ${calibrationPrecision}`
          : 'calibrating...'}
      </h2>
      {showCalibrationPoints && <CalibrationPoints />}
    </Container>
  )
}

export default Calibration
