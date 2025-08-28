import { useMemo } from 'react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'
import { useAuth } from '@clerk/clerk-react'

const router = createRouter({
  routeTree,
  context: { auth: { isSignedIn: false, getToken: () => Promise.resolve(null) } },
})
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function AppRouter() {
  const { isLoaded, isSignedIn, getToken } = useAuth()
  const context = useMemo(
    () => ({ auth: { isSignedIn: !!isSignedIn, getToken } }),
    [isSignedIn, getToken],
  )
  if (!isLoaded) return null // evita flicker
  return <RouterProvider router={router} context={context} />
}
