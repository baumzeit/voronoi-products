import { PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import React from 'react'

import Layout from '../../common/components/Layout'
import { Navbar } from '../../common/components/Navbar'
import { PATH } from '../../common/constants/paths'
import { ProductDetail } from '../../features/project/Detail'
import { ProductDetailNavContent } from '../../features/project/NavContent'

export type ProjectsAndAreas = {
  projects: Queries.ProductDetailFragment[]
  areas: Queries.CategoryBaseFragment[]
}

const ProjectsDetailPage = ({ data: { product, allProducts } }: PageProps<Queries.ProductDetailPageQuery>) => {
  const activePojectIdx = allProducts.nodes.findIndex(({ slug }) => slug === product?.slug)
  const prevIdx = activePojectIdx > 0 ? activePojectIdx - 1 : allProducts.nodes.length - 1
  const nextIdx = (activePojectIdx + 1) % allProducts.nodes.length
  const [prevSlug, nextSlug] = [prevIdx, nextIdx].map((idx) => allProducts.nodes[idx].slug || '')

  if (!product) {
    return null
  }

  return (
    <Layout
      navbar={
        <Navbar className="dark:shadow-md">
          <ProductDetailNavContent closePath={PATH.HOME} />
        </Navbar>
      }
    >
      <ProductDetail project={product} nextSlug={nextSlug} prevSlug={prevSlug} />
    </Layout>
  )
}

export const query = graphql`
  query ProductDetailPage($slug: String!) {
    allProducts: allStrapiProduct(sort: { fields: [createdAt], order: DESC }) {
      nodes {
        slug
        createdAt
      }
    }
    product: strapiProduct(slug: { eq: $slug }) {
      ...ProductDetail
    }
  }
`

export default ProjectsDetailPage
