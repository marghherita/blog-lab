import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth?.isSignedIn) {
      throw redirect({ to: '/sign-in', search: { redirect: location.href } })
    }
  },
  component: () => <Outlet />,
})
