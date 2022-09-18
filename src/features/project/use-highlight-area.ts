import { atom, useAtom } from 'jotai'
import { atomWithHash, RESET } from 'jotai/utils'

import { areasAtom } from '../../common/contexts/atoms'

const highlightAreaSlugAtom = atomWithHash('category', '', { serialize: (val) => val, deserialize: (val) => val })

const highlightAreaAtom = atom(
  (get) => {
    const areas = get(areasAtom)
    const highlightArea = get(highlightAreaSlugAtom)
    return areas.find((d) => d.slug === highlightArea) ?? null
  },
  (_, set, slug: string | null) => set(highlightAreaSlugAtom, slug ?? RESET)
)

export const useHighlightArea = () => useAtom(highlightAreaAtom)
