'use client'

import Link from "next/link"
import { Github, Linkedin, ArrowLeft } from "lucide-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function TopBar() {
  const router = useRouter()
  const [backText, setBackText] = useState<string | null>(null)
  
  useEffect(() => {
    if (router.pathname !== '/') {
      if (router.pathname === '/work') {
        setBackText('Back to previous page')
      } else if (router.pathname === '/contact') {
        setBackText('Back to previous page')
      } else {
        setBackText('Back')
      }
    } else {
      setBackText(null)  // No back button on the home page
    }
  }, [router.pathname])

  return (
    <nav className="flex justify-between items-center p-4 z-10">
      <h1 className="text-xl font-bold text-green-500">
        <span className="text-green-500">anwar</span>
        <span className="text-green-500">.sh()</span>
      </h1>
      
      <div className="flex items-center space-x-4">
        {/* Conditional rendering: show "Back" button if not on home, else show social icons */}
        {backText ? (
          <button onClick={() => router.back()} className="flex items-center text-green-500 hover:text-white">
            <ArrowLeft size={16} className="mr-2" />
            {backText}
          </button>
        ) : (
          <>
            <Link href="https://linkedin.com" className="text-green-500 hover:text-white">
              <Linkedin size={20} className="text-green-500" />
            </Link>
            <Link href="https://github.com" className="text-green-500 hover:text-white">
              <Github size={20} className="text-green-500" />
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
