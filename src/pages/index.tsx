import { Transition } from '@headlessui/react'
import { ArrowSmUpIcon } from '@heroicons/react/solid'
import { graphql, PageProps } from 'gatsby'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import React, { lazy, Suspense, useMemo, useRef } from 'react'

import Layout from '../common/components/Layout'
import { Navbar } from '../common/components/Navbar'
import { areasAtom, projectsAtom } from '../common/contexts/atoms'
import { assertAndExtractNodes } from '../common/utility/assert-and-extract-nodes'
import { ProjectsNavContent } from '../features/projects/NavContent'

const ProjectsList = lazy(() => import('../features/projects/ProjectsList'))
const ProjectsMap = lazy(() => import('../features/projects/ProjectsMap'))

export type ProductsAndCategories = {
  projects: Queries.ProductBaseFragment[]
  areas: Queries.CategoryBaseFragment[]
}

const ProjectsPage = ({ data: { allStrapiCategory, allStrapiProduct } }: PageProps<Queries.ProductsPageDataQuery>) => {
  const areas = useMemo(() => assertAndExtractNodes(allStrapiCategory), [allStrapiCategory])
  const projects = useMemo(() => assertAndExtractNodes(allStrapiProduct), [allStrapiProduct])

  const breakpoint = useBreakpoint()

  const main = useRef<HTMLDivElement>(null)

  return (
    <Layout
      ref={main}
      navbar={
        <Navbar>
          <ProjectsNavContent areas={areas} />
        </Navbar>
      }
      providerData={[
        [areasAtom, areas],
        [projectsAtom, projects]
      ]}
    >
      <Suspense
        fallback={
          <div className="flex items-center justify-center text-2xl font-light tracking-wide h-4/5 text-secondary">
            <div>Loading ...</div>
          </div>
        }
      >
        <Transition
          appear={!!breakpoint}
          show={true}
          enter="transition-opacity duration-600"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-600"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {breakpoint.md ? (
            <ProjectsMap projects={projects} areas={areas} />
          ) : (
            <>
              <ProjectsList projects={projects} areas={areas} />
              <div className="flex justify-center mb-2">
                <button className="p-2 rounded-full" onClick={() => main.current?.scrollTo(0, 0)}>
                  <div className="flex items-center gap-2">
                    <div>Back to top</div>
                    <ArrowSmUpIcon className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </>
          )}
        </Transition>
      </Suspense>
    </Layout>
  )
}

export const query = graphql`
  query ProductsPageData {
    allStrapiProduct(sort: { fields: [price], order: DESC }) {
      totalCount
      edges {
        node {
          ...ProductBase
        }
      }
    }
    allStrapiCategory {
      edges {
        node {
          ...CategoryBase
        }
      }
    }
  }
`

export default ProjectsPage
