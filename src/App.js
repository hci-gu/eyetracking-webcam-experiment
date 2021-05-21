import { useEffect, useState } from 'react'
import Calibration, { isCalibrated } from './components/Calibration'
import Tracker from './components/Tracker'
import useEyeTracking from './hooks/useEyeTracking'

function App() {
  const [pageState, setPageState] = useState('loading')
  useEyeTracking()

  useEffect(() => {
    setPageState(isCalibrated() ? 'done' : 'calibrate')
  }, [setPageState])

  if (pageState === 'loading') {
    return <div>loading...</div>
  }

  if (pageState === 'calibrate') {
    return <Calibration onDone={() => setPageState('done')} />
  }

  return <Tracker />
}

export default App
