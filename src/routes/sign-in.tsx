/* eslint-disable react-hooks/exhaustive-deps */
// sign-in.tsx
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { SignIn, useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'

export const Route = createFileRoute('/sign-in')({
  component: SignInPage,
})

function SignInPage() {
  const { isSignedIn } = useAuth()
  const navigate = useNavigate()
  const { redirect: back } = useSearch({ from: '/sign-in' }) as { redirect?: string }
  useEffect(() => {
    if (isSignedIn) navigate({ to: back || '/', replace: true })
  }, [isSignedIn])
  return (
    <div className="min-h-screen grid place-items-center p-6">
      <SignIn routing="hash" />
    </div>
  )
}
