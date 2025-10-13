import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DashboardCardProps {
  title: string
  description?: string
  className?: string
  children: React.ReactNode
  footer?: React.ReactNode
  isLoading?: boolean
}

export function DashboardCard({
  title,
  description,
  className,
  children,
  footer,
  isLoading = false,
}: DashboardCardProps) {
  return (
    <Card className={cn("overflow-hidden transition-all", className)}>
      <CardHeader className="bg-background border-b">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={cn("p-6", isLoading && "flex items-center justify-center min-h-[200px]")}>
        {children}
      </CardContent>
      {footer && <div className="bg-muted/50 px-6 py-3 border-t">{footer}</div>}
    </Card>
  )
}
