import { atom } from 'jotai'

export const areasAtom = atom<Queries.CategoryBaseFragment[]>([])
export const projectsAtom = atom<Queries.ProductDetailFragment[]>([])
