import { graphql, useStaticQuery } from 'gatsby'

export type Seo = {
  title?: string
  description?: string
  siteUrl?: string
  image?: string
}

export const useSiteMetadata = (): Seo => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          # twitterUsername
          # image
          siteUrl
        }
      }
    }
  `)
  return data.site.siteMetadata
}
