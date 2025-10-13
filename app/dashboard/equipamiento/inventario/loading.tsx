import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-6">
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <Skeleton className="h-10 w-full sm:w-[70%]" />
        <Skeleton className="h-10 w-full sm:w-[30%]" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-[250px] w-full rounded-lg" />
        ))}
      </div>
    </div>
  )
}
