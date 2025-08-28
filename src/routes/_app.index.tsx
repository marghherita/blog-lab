// _app.index.tsx  -> "/"
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/_app/')({
  component: () => <div className="p-6">Home</div>,
})
