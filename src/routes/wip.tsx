// wip.tsx  -> niente navbar
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/wip')({
  component: () => <div className="p-6">WIP (pagina fuori layout)</div>,
})
