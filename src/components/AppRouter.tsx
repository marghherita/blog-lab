import { useMemo } from 'react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'
import { useAuth } from '@clerk/clerk-react'

const router = createRouter({
  routeTree,
  context: { 
    auth: { isSignedIn: false, getToken: () => Promise.resolve(null) },
    flags: { lockSite: false, allowSignedInBypass: true }
  },
})
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export function AppRouter() {
  const { isLoaded, isSignedIn, getToken } = useAuth()
  const lockSite = import.meta.env.VITE_LOCK_SITE === '1'
  const context = useMemo(
    () => ({
      auth: { isSignedIn: !!isSignedIn, getToken },
      flags: { lockSite, allowSignedInBypass: true }, // se true, gli utenti loggati vedono il sito
    }),
    [isSignedIn, getToken, lockSite],
  )
  if (!isLoaded) return null
  return <RouterProvider router={router} context={context} />
}