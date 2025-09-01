"use client"
import { useState, useEffect } from "react"

type Link = {
  id: string
  userId: string
  originalUrl: string
  shortCode: string
  clicks: number
  createdAt: string // Prisma skickar Date som ISO-string i JSON
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
    <div>
      <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Long URL" />
      <button onClick={createLink}>Create Short URL</button>
      <ul>
        {links.map(link => (
          <li key={link.id}>
            <a href={`/${link.shortCode}`} target="_blank">{link.shortCode}</a> - {link.originalUrl} ({link.clicks} clicks)
          </li>
        ))}
      </ul>
    </div>
  )
}
