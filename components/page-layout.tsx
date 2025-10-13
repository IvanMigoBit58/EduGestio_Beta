import type React from "react"

interface PageLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export function PageLayout({ title, description, children, actions }: PageLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  )
}
