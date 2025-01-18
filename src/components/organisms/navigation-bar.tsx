"use client"
import { ActionButton } from "../atoms/button"
import { FaMoon, FaSun } from "react-icons/fa"

// Hooks
// Client Hooks
import { useChangeTheme } from '@/hooks/useChangeTheme'
import { cn } from "@/lib/cn"

interface NavigationbarProps {
  session: {
    name?: string,
    email?: string,
    image?: string,
  }
  className?: string
}
export const NavigationBar = ({ session, className }: NavigationbarProps) => {
  const { isDark, toggleTheme } = useChangeTheme()

  return (
    <nav className={cn("px-6 flex justify-between items-center border-b-2 border-neutral-700 sticky top-0 w-full z-40 backdrop-blur", className)}>
      <div>
        <ActionButton to="/">
          <h1 className="text-2xl font-bold">VinBlogs</h1>
        </ActionButton>
      </div>
      <ul className="flex gap-6">
        <li>
          <ActionButton to="/blogs" className="rounded  hover:text-cyan-400 transition duration-200">
            Blogs
          </ActionButton>
        </li>
        <li>
          <ActionButton to="/projects" className="rounded  hover:text-cyan-400 transition duration-200">
            Projects
          </ActionButton>
        </li>
      </ul>
      <div className="flex items-center">
        {!session ? (
          <ActionButton
            to="/auth/signin"
            className="roundedhover:text-cyan-400 transition duration-200"
          >
            Sign in
          </ActionButton>
        ) : (
          <ActionButton
            to="/"
            className="roundedhover:text-cyan-400 transition duration-200"
          >
            Home
          </ActionButton>
        )}
        <ActionButton onClick={toggleTheme} className="cursor-pointer rounded-md p-3 navigation-button">
          {isDark ? <FaSun /> : <FaMoon />}
        </ActionButton>
      </div>
    </nav>
  )
}
