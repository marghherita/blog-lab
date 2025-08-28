// _app.about.tsx -> "/about"
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/_app/about')({
  component: () => <div className="p-6">About</div>,
})
