import { graphql } from 'gatsby'

export const query = graphql`
  fragment ImageBase on STRAPI__MEDIA {
    id
    alternativeText
    caption
  }

  fragment CategoryBase on STRAPI_CATEGORY {
    id
    name
    slug
    color
  }

  fragment ProductBase on STRAPI_PRODUCT {
    id
    name
    description
    price
    slug
    categories {
      ...CategoryBase
    }
    images {
      ...ImageBase
      localFile {
        childImageSharp {
          gatsbyImageData(width: 500)
        }
      }
    }
  }
`
