"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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

  useEffect(() => {
    fetch("/api/links")
      .then(res => res.json())
      .then(setLinks)
  }, [])

  const createLink = async () => {
    if (!url) return
    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: url }),
    })
    const data = await res.json()
    setLinks([...links, data])
    setUrl("")
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter Long URL"
          className="flex-1"
        />
        <Button onClick={createLink} variant="default" size="lg">
          Create Short URL
        </Button>
      </div>

      {/* List of links */}
      <ul className="flex flex-col gap-3">
        {links.map(link => (
          <Card key={link.id} className="hover:shadow-md transition">
            <CardContent className="p-4">
              <a
                href={`/${link.shortCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary hover:underline break-all"
              >
                {link.shortCode}
              </a>
            </CardContent>
          </Card>
        ))}
      </ul>
    </div>
  )
}
