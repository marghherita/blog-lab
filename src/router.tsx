import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react'
import RootLayout from './layouts/RootLayout'

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div style={{ padding: 16 }}>Welcome</div>,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <div style={{ padding: 16 }}>
      <SignedIn>
        <h2>Dashboard</h2>
        <p>Area riservata.</p>
      </SignedIn>
      <SignedOut>
        <SignIn routing="path" path="/sign-in" />
      </SignedOut>
    </div>
  ),
})

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-in',
  component: () => (
    <div style={{ padding: 16 }}>
      <SignIn routing="path" path="/sign-in" fallbackRedirectUrl="/dashboard" />
    </div>
  ),
})

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sign-up',
  component: () => (
    <div style={{ padding: 16 }}>
      <SignUp routing="path" path="/sign-up" />
    </div>
  ),
})

const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute, signInRoute, signUpRoute])

export const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


