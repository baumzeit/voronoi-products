/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})
const config = require('./tailwind.config')

const mediaQueries = Object.fromEntries(
  Object.entries(config.theme.screens).map(([bp, size]) => [bp, `(min-width: ${size})`])
)

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  // singleTypes: [
  //   {
  //     singularName: 'home',
  //     queryParams: {
  //       populate: { seo: '*', contact: { populate: '*' }, profile: { populate: '*' }, areas: '*' }
  //     }
  //   }
  // ],
  collectionTypes: ['tag', 'product']
}

module.exports = {
  siteMetadata: {
    title: 'Voronoi Shopping',
    description: `Voronoi Shopping`,
    // twitterUsername: `@gatsbyjs`,
    // image: `/gatsby-icon.png`,
    siteUrl: `https://shopping.colocate.dev`
  },
  graphqlTypegen: { typesOutputPath: 'gatsby-types.d.ts' },
  trailingSlash: 'never',
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-postcss',
    'gatsby-plugin-sass',
    'gatsby-plugin-use-dark-mode',
    {
      resolve: 'gatsby-plugin-breakpoints',
      options: {
        queries: mediaQueries
      }
    },

    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/'
      },
      __key: 'pages'
    },
    {
      resolve: 'gatsby-source-strapi',
      options: strapiConfig
    }
  ]
}
