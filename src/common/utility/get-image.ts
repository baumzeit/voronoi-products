import { IGatsbyImageData } from 'gatsby-plugin-image'

type DeepMaybe<T> = T extends object
  ? {
      [P in keyof T]?: P extends 'gatsbyImageData' ? IGatsbyImageData : DeepMaybe<T[P]> | null
    }
  : T

type StrapiMedia = DeepMaybe<Queries.STRAPI__MEDIA> | null

export const getStrapiImage = <T extends StrapiMedia = StrapiMedia>(queryImage: T) =>
  queryImage?.localFile?.childImageSharp?.gatsbyImageData
