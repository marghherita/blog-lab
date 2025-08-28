import { createFileRoute } from '@tanstack/react-router'
import { SignUp } from '@clerk/clerk-react'

export const Route = createFileRoute('/sign-up')({
  component: () => (
    <div style={{ padding: 16 }}>
      <SignUp routing="path" path="/sign-up" />
    </div>
  ),
})
