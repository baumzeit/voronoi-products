import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import React from 'react'

import { NavFilterAreas, NavFilterAreasSelect } from './NavFilterAreas'

type ProjectsNavContentProps = { areas: Queries.AreaBaseFragment[] }

export const ProjectsNavContent = ({ areas }: ProjectsNavContentProps) => {
  const breakpoints = useBreakpoint()

  return breakpoints.lg ? (
    <NavFilterAreas areas={areas} />
  ) : (
    <div className="self-start block mt-3.5 min-w-[180px] lg:hidden">
      <NavFilterAreasSelect areas={areas} />
    </div>
  )
}

// (
//       <button
//         onClick={(e) => {
//           close()
//         }}
//         className={`animate-fadeIn p-3 hover:text-brand tracking-wide`}
//       >
//         Close
//       </button>
//     )
