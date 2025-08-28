// wip.tsx  -> niente navbar
import { createFileRoute } from '@tanstack/react-router'
import { WipPage } from '@/pages/wip/wip'

export const Route = createFileRoute('/wip')({
  component: WipPage,
})
