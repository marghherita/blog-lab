// helpers nel tuo _app.tsx (o in un file /components)
import { Link } from '@tanstack/react-router'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'

const base = 'py-1.5 font-medium'
const inactive = 'text-muted-foreground hover:text-primary'
const active = 'text-primary'

export function NavLink({
  to,
  children,
  className,
}: {
  to: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <NavigationMenuLink asChild>
      <Link
        to={to}
        // 👇 evita match parziali / prefissi
        activeOptions={{ exact: true, includeHash: false, includeSearch: false }}
        className={`${base} ${className ?? ''}`}
        inactiveProps={{ className: `${inactive} ${base} ${className ?? ''}` }}
        activeProps={{ className: `${active} ${base} ${className ?? ''}` }}
      >
        {children}
      </Link>
    </NavigationMenuLink>
  )
}
