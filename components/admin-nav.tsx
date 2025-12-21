"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  Briefcase,
  User,
  Settings,
  Home,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Wrench,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"

const API_URL = ""

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Inbox",
    href: "/admin/inbox",
    icon: Inbox,
    showBadge: true,
  },
  {
    title: "About",
    href: "/admin/about",
    icon: User,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    title: "Skills",
    href: "/admin/skills",
    icon: Code2,
  },
  {
    title: "Services",
    href: "/admin/services",
    icon: Wrench,
  },
  {
    title: "Experience",
    href: "/admin/experience",
    icon: Briefcase,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await fetch(`${API_URL}/api/messages/unread-count`)
        if (res.ok) {
          const data = await res.json()
          setUnreadCount(data.count)
        }
      } catch (error) {
        console.error("Failed to fetch unread count")
      }
    }
    fetchUnread()
    const interval = setInterval(fetchUnread, 30000) // Poll every 30s
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={cn(
        "h-screen sticky top-0 border-r border-border bg-card transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          {!collapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="shrink-0">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  collapsed && "justify-center px-3",
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="font-medium">{item.title}</span>}
                {item.showBadge && unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-auto h-5 min-w-5 flex items-center justify-center text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-2">
          <Link
            href="/"
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
              collapsed && "justify-center px-3",
            )}
          >
            <Home className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="font-medium">View Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive w-full",
              collapsed && "justify-center px-3",
            )}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  )
}
