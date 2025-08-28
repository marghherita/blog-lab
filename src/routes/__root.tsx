import { createRootRouteWithContext, Outlet, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export type RouterCtx = {
  auth: {
    isSignedIn: boolean
    getToken: () => Promise<string | null>
  }
  flags: { lockSite: boolean; allowSignedInBypass?: boolean }
}

export const Route = createRootRouteWithContext<RouterCtx>()({
  beforeLoad: ({ location, context }) => {
    const locked = !!context.flags?.lockSite
    const isLogged = !!context.auth?.isSignedIn
    const bypassForLogged = !!context.flags?.allowSignedInBypass

    const path = location.pathname
    const isAllowedPath =
      path === '/wip' ||
      path === '/sign-in' ||
      path.startsWith('/assets') || // statici
      path === '/favicon.ico'

    if (locked && !isAllowedPath && !(bypassForLogged && isLogged)) {
      throw redirect({
        to: '/wip',
        // opzionale: tieni memoria da dove arrivava
        search: { from: path + location.search },
      })
    }
  },
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} />
    </>
  ),
})
