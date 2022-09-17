import notEmpty from './not-empty'

export const assertAndExtractNodes = <T extends { edges: readonly { node: T['edges'][number]['node'] }[] }>(data: T) =>
  data.edges.filter(notEmpty).map(({ node }) => node)
