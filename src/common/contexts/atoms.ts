import { atom } from 'jotai'

export const areasAtom = atom<Queries.AreaBaseFragment[]>([])
export const projectsAtom = atom<Queries.ProjectDetailFragment[]>([])
