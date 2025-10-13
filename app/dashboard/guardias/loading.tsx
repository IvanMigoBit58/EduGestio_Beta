import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GuardiasLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-[250px]" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-[100px]" />
            <Skeleton className="h-9 w-[100px]" />
          </div>
        </div>

        <Tabs defaultValue="registro" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="registro" disabled>
              Registro de Ausencias
            </TabsTrigger>
            <TabsTrigger value="asignacion" disabled>
              Asignación de Guardias
            </TabsTrigger>
            <TabsTrigger value="historial" disabled>
              Historial
            </TabsTrigger>
          </TabsList>

          <TabsContent value="registro" className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-7 w-[200px]" />
              <Skeleton className="h-9 w-[150px]" />
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-full max-w-[100px]" />
                    <Skeleton className="h-5 w-full max-w-[100px]" />
                    <Skeleton className="h-5 w-full max-w-[100px]" />
                    <Skeleton className="h-5 w-full max-w-[100px]" />
                    <Skeleton className="h-5 w-full max-w-[100px]" />
                  </div>
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between">
                      <Skeleton className="h-5 w-full max-w-[100px]" />
                      <Skeleton className="h-5 w-full max-w-[100px]" />
                      <Skeleton className="h-5 w-full max-w-[100px]" />
                      <Skeleton className="h-5 w-full max-w-[100px]" />
                      <Skeleton className="h-5 w-full max-w-[100px]" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="flex justify-between">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-4 w-[50px]" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
