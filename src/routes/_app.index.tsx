// _app.index.tsx  -> "/"
import { BlogPage } from '@/pages/blog'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/_app/')({
  component: BlogPage,
})
