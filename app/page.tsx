import { redirect } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      {redirect("/login")}
    </div>
  )
}
