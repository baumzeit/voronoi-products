import { sort } from 'd3-array'
import { Link } from 'gatsby'
import React, { useCallback, useMemo } from 'react'

import { ProductsAndCategories } from '../../pages'
import { ProjectBanner } from '../project/ProjectBanner'
import { useHighlightArea } from '../project/use-highlight-area'

export type DisplayProject = Queries.ProductBaseFragment & { highlightColor?: string | null }

const ProjectsList = ({ projects }: ProductsAndCategories) => {
  const [highlightArea] = useHighlightArea()
  const highlightAreaSlug = highlightArea?.slug

  const areaMatch = useCallback(
    (project: Queries.ProductBaseFragment) =>
      Boolean(!highlightAreaSlug || project.categories?.map((area) => area?.slug).includes(highlightAreaSlug)),
    [highlightAreaSlug]
  )

  const displayProjects: DisplayProject[] = useMemo(() => {
    const enrichedProjects = projects.map((project) => ({
      ...project,
      highlightColor: areaMatch(project) ? highlightArea?.color : null
    }))
    return enrichedProjects
      ? sort(enrichedProjects, ({ highlightColor: a }, { highlightColor: b }) =>
          Boolean(a) === Boolean(b) ? 0 : a ? -1 : 1
        )
      : enrichedProjects
  }, [areaMatch, highlightArea?.color, projects])

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 mx-3 mt-3 mb-2 sm:grid-cols-2">
        {displayProjects.map((project, idx) => {
          return (
            <li key={project.id} className="overflow-hidden rounded-sm">
              <Link to={project.slug || ''}>
                <ProjectBanner project={project} index={idx} />
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ProjectsList
