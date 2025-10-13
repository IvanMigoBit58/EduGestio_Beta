import { Skeleton } from "@/components/ui/skeleton"

export default function PerfilLoading() {
  return (
    <div className="container mx-auto py-6">
      <Skeleton className="h-10 w-1/3 mb-6" />

      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4 mb-2" />

        <div className="grid gap-4">
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    </div>
  )
}
