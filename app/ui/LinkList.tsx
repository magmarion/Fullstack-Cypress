"use client"
import { useState, useEffect } from "react"

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
      {/* Input och knapp */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter Long URL"
          className="flex-1 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          onClick={createLink}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition font-semibold cursor-pointer"
        >
          Create Short URL
        </button>
      </div>

      {/* Lista med korta länkar */}
      <ul className="flex flex-col gap-3">
        {links.map(link => (
          <li key={link.id} className="p-4 bg-white shadow rounded hover:shadow-md transition">
            <a
              href={`/${link.shortCode}`}
              target="_blank"
              className="font-bold text-blue-600 hover:underline break-all"
            >
              {link.shortCode}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
