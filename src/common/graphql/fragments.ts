import { graphql } from 'gatsby'

export const query = graphql`
  # fragment ExternalLink on STRAPI__COMPONENT_SHARED_LINKS {
  #   id
  #   link
  #   label
  # }
  fragment ImageBase on STRAPI__MEDIA {
    id
    alternativeText
    caption
  }

  fragment ProductBase on STRAPI_PRODUCT {
    id
    name
    description
  }

  fragment TagBase on STRAPI_TAG {
    id
    name
  }
`
