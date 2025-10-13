import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      <Skeleton className="h-10 w-1/4 mb-6" />
      <div className="grid gap-6">
        <Skeleton className="h-[400px] w-full" />
      </div>
    </div>
  )
}
