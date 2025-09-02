"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Trash, Copy, Check } from "lucide-react"

type Link = {
  id: string
  userId: string
  originalUrl: string
  shortCode: string
  createdAt: string
}

export default function LinkList() {
  const [links, setLinks] = useState<Link[]>([])
  const [url, setUrl] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/links")
      .then(res => res.json())
      .then(setLinks)
  }, [])

  const createLink = async () => {
    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: url }),
    })
    if (!res.ok) return
    const data = await res.json()
    setLinks([...links, data])
    setUrl("")
  }

  const deleteLink = async (id: string) => {
    const res = await fetch(`/api/links/${id}`, { method: "DELETE" })
    if (!res.ok) return
    setLinks(links.filter(link => link.id !== id))
  }

  const copyLink = async (shortCode: string, id: string) => {
    const shortUrl = `${window.location.origin}/${shortCode}`
    await navigator.clipboard.writeText(shortUrl)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter Long URL"
          className="flex-1 border rounded px-3 py-2"
        />
        <Button onClick={createLink}>Create</Button>
      </div>

      <ul className="space-y-2">
        {links.map(link => (
          <li
            key={link.id}
            className="p-3 border rounded flex items-center justify-between"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`/${link.shortCode}`}
                    target="_blank"
                    className="font-bold text-blue-600 hover:underline"
                  >
                    {link.shortCode}
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.originalUrl}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyLink(link.shortCode, link.id)}
              >
                {copiedId === link.id ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteLink(link.id)}
              >
                <Trash className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
