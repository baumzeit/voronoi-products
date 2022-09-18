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
    model
    description
    price
    slug
    categories {
      ...CategoryBase
    }
    imagesSmall: images {
      ...ImageBase
      localFile {
        childImageSharp {
          gatsbyImageData(width: 500)
        }
      }
    }
  }
  fragment ProductDetail on STRAPI_PRODUCT {
    ...ProductBase
    imagesLarge: images {
      ...ImageBase
      localFile {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  }
`
