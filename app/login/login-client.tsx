"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n-context"

export function LoginClient() {
  const { t } = useI18n()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { login, isAuthenticated } = useAuth()

  // Si ya está autenticado, redirigir al dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await login(username, password)
      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.error || t("auth.loginError"))
      }
    } catch (error) {
      setError(t("auth.loginError"))
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestUserLogin = (username: string) => {
    setUsername(username)
    setPassword("password") // Establecer la contraseña predeterminada
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="absolute top-4 right-4 flex gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{t("auth.login")}</CardTitle>
          <CardDescription>{t("auth.loginDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">{t("auth.username")}</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? t("common.loading") : t("auth.loginButton")}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground w-full">
            <p>{t("auth.testUsers")}:</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => handleTestUserLogin("admin")}>
                {t("auth.admin")}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleTestUserLogin("profesor")}>
                {t("auth.teacher")}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleTestUserLogin("tutor")}>
                {t("auth.tutor")}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleTestUserLogin("alumno")}>
                {t("auth.student")}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
