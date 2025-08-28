import { Link, Outlet } from '@tanstack/react-router'
import Logo from '@/lib/assets/thebloglab.svg?react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { NavLink } from '@/components/NavLink'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
]

const base = 'py-1.5 font-medium'
const inactive = 'text-muted-foreground hover:text-primary'
const active = 'text-primary'

export default function AppLayout() {
  return (
    <div>
      <header className="border-b px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* LEFT: Logo */}
          <Link to="/" className="text-primary hover:text-primary/90">
            <Logo className="w-[100px]" />
          </Link>

          {/* RIGHT: pagine + azioni (come aave.com/blog) */}
          <div className="flex items-center gap-3">
            {/* pagine (desktop) */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navLinks.map((l) => (
                  <NavigationMenuItem key={l.to}>
                    <NavLink to={l.to}>{l.label}</NavLink>
                  </NavigationMenuItem>
                ))}

                {/* Dashboard visibile solo se loggata */}
                <SignedIn>
                  <NavigationMenuItem>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </NavigationMenuItem>
                </SignedIn>
              </NavigationMenuList>
            </NavigationMenu>
            {/* azioni */}
            <SignedOut>
              <Button asChild variant="outline" size="sm" className="text-sm max-md:hidden">
                <Link to="/sign-in">Sign In</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* Mobile: hamburger */}
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
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
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
                    {navLinks.map((l) => (
                      <NavigationMenuItem key={l.to} className="w-full">
                        <NavigationMenuLink asChild>
                          <Link
                            to={l.to}
                            className={`${base} block w-full`}
                            activeProps={{ className: `${active} ${base} block w-full` }}
                            inactiveProps={{ className: `${inactive} ${base} block w/full` }}
                          >
                            {l.label}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                    <SignedIn>
                      <NavigationMenuItem className="w-full">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/dashboard"
                            className={`${base} block w-full`}
                            activeProps={{ className: `${active} ${base} block w/full` }}
                            inactiveProps={{ className: `${inactive} ${base} block w/full` }}
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
