import React from 'react'
import { Link, Outlet } from '@tanstack/react-router'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'


import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Flower } from 'lucide-react'

// Link di navigazione (aggiorna i path reali)
const navigationLinks = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
]

const baseLinkClass = 'py-1.5 font-medium'
const inactiveClass = 'text-muted-foreground hover:text-primary'
const activeClass = 'text-primary'

const RootLayout: React.FC = () => {
  return (
    <div>
      <header className="border-b px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* LEFT: solo Logo */}
          <Link to="/" className="text-primary hover:text-primary/90">
            <Flower className="size-4" />
          </Link>

          {/* RIGHT: nav + actions (pagine a sinistra dei bottoni) */}
          <div className="flex items-center gap-3">
            {/* Desktop nav (accanto ai bottoni) */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link) => (
                  <NavigationMenuItem key={link.to}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={link.to}
                        className={baseLinkClass}
                        activeProps={{ className: `${activeClass} ${baseLinkClass}` }}
                        inactiveProps={{ className: `${inactiveClass} ${baseLinkClass}` }}
                      >
                        {link.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Azioni */}
            <SignedOut>
              <Button asChild variant="default" size="sm" className="text-sm max-md:hidden">
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button asChild variant="outline" size="sm" className="text-sm max-md:hidden">
                <Link to="/dashboard">Dashboard</Link>
              </Button>

              <UserButton />
            </SignedIn>

            {/* Mobile: hamburger a destra che apre nav + azioni */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 md:hidden"
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>

              <PopoverContent align="end" className="w-44 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0">
                    {navigationLinks.map((link) => (
                      <NavigationMenuItem key={link.to} className="w-full">
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.to}
                            className={`${baseLinkClass} block w-full`}
                            activeProps={{
                              className: `${activeClass} ${baseLinkClass} block w-full`,
                            }}
                            inactiveProps={{
                              className: `${inactiveClass} ${baseLinkClass} block w-full`,
                            }}
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                    <SignedOut>
                      <NavigationMenuItem className="w-full">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/sign-in"
                            className={`${baseLinkClass} block w-full`}
                            activeProps={{
                              className: `${activeClass} ${baseLinkClass} block w-full`,
                            }}
                            inactiveProps={{
                              className: `${inactiveClass} ${baseLinkClass} block w/full`,
                            }}
                          >
                            Sign In
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem className="w-full">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/dashboard"
                            className={`${baseLinkClass} block w-full`}
                            activeProps={{
                              className: `${activeClass} ${baseLinkClass} block w/full`,
                            }}
                            inactiveProps={{
                              className: `${inactiveClass} ${baseLinkClass} block w/full`,
                            }}
                          >
                            Get Started
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    </SignedOut>
                    <SignedIn>
                      <NavigationMenuItem className="w-full">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/dashboard"
                            className={`${baseLinkClass} block w-full`}
                            activeProps={{
                              className: `${activeClass} ${baseLinkClass} block w/full`,
                            }}
                            inactiveProps={{
                              className: `${inactiveClass} ${baseLinkClass} block w/full`,
                            }}
                          >
                            Dashboard
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    </SignedIn>
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
