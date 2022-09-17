import { atom, useAtom } from 'jotai'
import { atomWithHash, RESET } from 'jotai/utils'

const imageNoAtom = atomWithHash('image', 0)
const imageIdxAtom = atom(
  (get) => {
    const imageNo = get(imageNoAtom)
    return imageNo ? imageNo - 1 : null
  },
  (_, set, idx: number | null) => {
    set(imageNoAtom, typeof idx === 'number' ? idx + 1 : RESET)
  }
)

export const useImageHash = () => useAtom(imageIdxAtom)
