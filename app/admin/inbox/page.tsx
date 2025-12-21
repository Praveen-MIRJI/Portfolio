"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Mail, MailOpen, Trash2, Clock, User, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const API_URL = ""

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  created_at: string
}

export default function InboxPage() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_URL}/api/messages`)
      if (!response.ok) throw new Error("Failed to fetch")
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const markAsRead = async (id: string) => {
    try {
      await fetch(`${API_URL}/api/messages/${id}/read`, { method: "PATCH" })
      setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m))
    } catch (error) {
      console.error("Failed to mark as read")
    }
  }

  const deleteMessage = async (id: string) => {
    try {
      await fetch(`${API_URL}/api/messages/${id}`, { method: "DELETE" })
      setMessages(messages.filter(m => m.id !== id))
      setSelectedMessage(null)
      toast({ title: "Message deleted" })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      })
    }
  }

  const openMessage = (message: Message) => {
    setSelectedMessage(message)
    if (!message.read) {
      markAsRead(message.id)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const unreadCount = messages.filter(m => !m.read).length

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Inbox</h1>
          <p className="text-muted-foreground mt-2">
            Messages from your contact form
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : messages.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Mail className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No messages yet</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                !message.read ? "border-primary/50 bg-primary/5" : ""
              }`}
              onClick={() => openMessage(message)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 ${!message.read ? "text-primary" : "text-muted-foreground"}`}>
                    {message.read ? (
                      <MailOpen className="w-5 h-5" />
                    ) : (
                      <Mail className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-medium ${!message.read ? "text-foreground" : "text-muted-foreground"}`}>
                        {message.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        &lt;{message.email}&gt;
                      </span>
                    </div>
                    <p className={`text-sm truncate ${!message.read ? "font-medium" : ""}`}>
                      {message.subject}
                    </p>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {message.message}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(message.created_at)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMessage.subject}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{selectedMessage.name}</span>
                  </div>
                  <span className="text-muted-foreground">{selectedMessage.email}</span>
                  <span className="text-muted-foreground ml-auto">
                    {formatDate(selectedMessage.created_at)}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" asChild>
                    <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                      Reply via Email
                    </a>
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteMessage(selectedMessage.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
