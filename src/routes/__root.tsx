import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export type RouterCtx = {
  auth: {
    isSignedIn: boolean
    getToken: () => Promise<string | null>
  }
}

export const Route = createRootRouteWithContext<RouterCtx>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools initialIsOpen={false} />
    </>
  ),
})
