import { Listbox } from '@headlessui/react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import useDarkMode from 'use-dark-mode'

export const NAVBAR_HEIGHT = 56

type NavbarProps = { className?: string; children: ReactNode }

export const Navbar = ({ children, className = '' }: NavbarProps) => {
  const { site } = useStaticQuery<Queries.NavDataQuery>(query)
  return (
    <nav
      style={{ height: NAVBAR_HEIGHT }}
      className={twMerge(
        'flex items-center justify-between shadow-sm px-4 sm:px-6 bg-primary z-30 relative',
        className
      )}
    >
      <div className="flex-1">
        <div className="flex items-center">
          <Link to="/" className="font-bold">
            <div className="flex items-center">
              <StaticImage
                src="../../images/logo.png"
                alt="Canopies Logo"
                imgClassName={`rounded-full`}
                loading="eager"
                height={25}
                className="flex-shrink-0"
              />
              <div className="hidden ml-4 md:block text-secondary">{site?.siteMetadata?.title || ''}</div>
            </div>
          </Link>
        </div>
      </div>
      {children}
      <div className="flex-1 self-start flex justify-end mt-3.5">
        <ThemeSelect />
      </div>
    </nav>
  )
}

const themes = ['dark', 'light'] as const
type Theme = typeof themes[number]

const ThemeSelect = () => {
  // const { theme, setTheme } = useContext(ThemeContext)
  const { value: isDark, enable, disable } = useDarkMode(false)

  const theme: Theme = isDark ? 'dark' : 'light'

  return (
    <div>
      <Listbox value={theme} onChange={(theme) => (theme === 'dark' ? enable() : disable())}>
        <Listbox.Button className={`px-1.5 py-0.5 rounded text-brand`}>{theme}</Listbox.Button>
        <Listbox.Options>
          {themes
            .filter((val) => val !== theme)
            .map((val, idx) => {
              const isActive = theme === val
              return (
                <Listbox.Option key={val} value={val} className="text-bg-secondary">
                  <div
                    className={`inline-block px-1.5 py-0.5 rounded mt-1.5 animate-fadeInFast animate-delay-${
                      50 * idx
                    } cursor-pointer bg-primary ${isActive ? 'text-brand' : 'text-primary'} cursor-pointer`}
                  >
                    {val}
                  </div>
                </Listbox.Option>
              )
            })}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}

const query = graphql`
  query NavData {
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
  }
`
