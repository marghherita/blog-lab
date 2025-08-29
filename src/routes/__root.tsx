import { createRootRouteWithContext, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export type RouterCtx = {
  auth: {
    isSignedIn: boolean
    getToken: () => Promise<string | null>
    isLoaded?: boolean // 👈 passa isLoaded da Clerk se puoi
  }
  flags: { lockSite: boolean; allowSignedInBypass?: boolean }
  base?: string // 👈 se usi un base diverso da '/'
}

const PUBLIC_FILE_REGEX =
  /\.(css|js|mjs|map|ico|png|jpg|jpeg|svg|webp|gif|json|txt|xml|webmanifest)$/i

const PUBLIC_PREFIXES = [
  '/wip',
  '/sign-in',
  '/assets',
  '/vite.svg',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/rss.xml',
]

const normalizePath = (p: string, base?: string) => {
  let path = p || '/'
  if (base && base !== '/' && path.startsWith(base)) {
    path = path.slice(base.length - 1)
  }
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
  return path
}

const isAllowedPath = (path: string) => {
  if (PUBLIC_FILE_REGEX.test(path)) return true
  return PUBLIC_PREFIXES.some((pref) => path === pref || path.startsWith(pref + '/'))
}

export const Route = createRootRouteWithContext<RouterCtx>()({
  beforeLoad: ({ location, context }) => {
    const path = normalizePath(location.pathname, context.base)
    const locked = !!context.flags?.lockSite
    if (!locked) return

    // Evita redirect “falso” mentre Clerk carica
    const authLoaded = context.auth?.isLoaded ?? true
    if (!authLoaded) return

    const isLogged = !!context.auth?.isSignedIn
    const bypassForLogged = !!context.flags?.allowSignedInBypass

    if (isAllowedPath(path)) return
    if (bypassForLogged && isLogged) return

    throw redirect({ to: '/wip', search: { redirect: path } })
  },
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} />
    </>
  ),
})
