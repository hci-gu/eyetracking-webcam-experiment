import { atom, selector } from 'recoil'

export const calibrationAtom = atom({
  key: 'calibration',
  default: Array.from({ length: 9 }).map((_, i) => ({
    id: `Point_${i}`,
    value: 0,
    max: 5,
  })),
})

export const calibrationDoneSelector = selector({
  key: 'calibration-done',
  get: ({ get }) => {
    const calibrationPoints = get(calibrationAtom)

    return calibrationPoints.every((p) => p.value >= p.max)
  },
})

export const eyePositionAtom = atom({
  key: 'eye-position',
  default: {
    x: 0,
    y: 0,
  },
})
