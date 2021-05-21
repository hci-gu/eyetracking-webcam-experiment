import webgazer from 'webgazer'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { eyePositionAtom } from '../state'

const useEyeTracking = () => {
  const [position, setPosition] = useRecoilState(eyePositionAtom)

  useEffect(() => {
    const start = async () => {
      webgazer.params.showVideoPreview = false
      await webgazer
        .setRegression('ridge')
        .setGazeListener((pos) => {
          if (!pos) return
          setPosition({
            x: pos.x,
            y: pos.y,
          })
        })
        .begin()
      webgazer.showPredictionPoints(true)
    }
    start()
  }, [setPosition])

  return position
}

export default useEyeTracking
