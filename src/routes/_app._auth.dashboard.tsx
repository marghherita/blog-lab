/* eslint-disable react-hooks/exhaustive-deps */
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_auth/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { options } = useRouter()
  const getToken = options.context?.auth.getToken
  const [items, setItems] = useState<unknown[]>([])

  useEffect(() => {
    ;(async () => {
      const token = await getToken?.()
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/posts`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      if (res.ok) setItems(await res.json())
    })()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <pre className="mt-4 text-sm opacity-80">{JSON.stringify(items, null, 2)}</pre>
    </div>
  )
}
