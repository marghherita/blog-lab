import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { AppRouter } from './components/AppRouter'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string
if (!PUBLISHABLE_KEY) throw new Error('Add your Clerk Publishable Key to the .env file')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AppRouter />
    </ClerkProvider>
  </StrictMode>,
)
