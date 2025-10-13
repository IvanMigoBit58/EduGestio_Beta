"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IntranetTab } from "@/components/intranet-tab"

interface PersonaDetailsProps {
  persona: {
    id: string
    nombre: string
    tipo: string
    email: string
    telefono: string
    direccion: string
    username: string
  }
}

export function PersonaDetails({ persona }: PersonaDetailsProps) {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="academico">Académico</TabsTrigger>
        <TabsTrigger value="intranet">Intranet</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Nombre</h3>
              <p>{persona.nombre}</p>
            </div>
            <div>
              <h3 className="font-medium">Tipo</h3>
              <p>{persona.tipo}</p>
            </div>
            <div>
              <h3 className="font-medium">Email</h3>
              <p>{persona.email}</p>
            </div>
            <div>
              <h3 className="font-medium">Teléfono</h3>
              <p>{persona.telefono}</p>
            </div>
            <div className="col-span-2">
              <h3 className="font-medium">Dirección</h3>
              <p>{persona.direccion}</p>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="academico">
        <div className="py-2">
          <p className="text-muted-foreground">Información académica no disponible.</p>
        </div>
      </TabsContent>
      <TabsContent value="intranet">
        <IntranetTab persona={persona} />
      </TabsContent>
    </Tabs>
  )
}
