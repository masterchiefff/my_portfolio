'use client'

import Image from "next/image"
import { useState, useEffect, useCallback } from "react"
import { useRouter } from 'next/router'
import Navbar from "../components/navigation"
import TopBar from "../components/topbar"

export default function WorkPage() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [userInput, setUserInput] = useState('')
  const [showCursor, setShowCursor] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const router = useRouter()

  const projects = [
    {
      name: "Project 1",
      description: "A React-based web application for task management.",
      tech: "React, TypeScript, Tailwind CSS",
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      name: "Project 2",
      description: "An e-commerce platform built with Next.js and Stripe integration.",
      tech: "Next.js, Stripe API, MongoDB",
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      name: "Project 3",
      description: "A real-time chat application using WebSockets.",
      tech: "Node.js, Socket.io, Vue.js",
      image: "/placeholder.svg?height=200&width=300"
    },
    {
      name: "Project 4",
      description: "A mobile app for tracking fitness goals and progress.",
      tech: "React Native, Expo, Firebase",
      image: "/placeholder.svg?height=200&width=300"
    }
  ]

  const fullText = `My Projects:`

  // Function to animate text typing
  const typeText = useCallback((text: string, setText: (text: string) => void, delay: number = 20) => {
    let i = 0
    return new Promise<void>((resolve) => {
      const intervalId = setInterval(() => {
        setText(text.slice(0, i))
        i++
        if (i > text.length) {
          clearInterval(intervalId)
          resolve()
        }
      }, delay)
    })
  }, [])

  // Simulate loading screen with text typing
  useEffect(() => {
    const animateText = async () => {
      await typeText('loading...', setText)
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate loading delay
      setIsLoading(false)

      await typeText(fullText, setText, 30)
      setShowCursor(true)
    }
    animateText()
  }, [typeText, fullText])

  // Handle user command input and navigation
  const handleNavigation = useCallback(() => {
    const inputLowerCase = userInput.toLowerCase()
    if (inputLowerCase === 'home') {
      router.push('/')
    } else if (inputLowerCase === 'help') {
      setShowHelp(true)
    }
    setUserInput('')
  }, [userInput, router])

  // Listen for keyboard events and handle input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleNavigation()
      } else if (event.key === 'Backspace') {
        setUserInput(prev => prev.slice(0, -1))
      } else if (event.key.length === 1) {
        setUserInput(prev => prev + event.key)
      }

      // Handle shortcuts (Ctrl + Shift + W)
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'w') {
        router.push('/work')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [userInput, handleNavigation, router])

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-green-500 font-mono flex flex-col">
      {/* Loading screen */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <pre className="text-green-500 text-2xl">loading...</pre>
        </div>
      )}

      <TopBar />

      <main className="flex-1 p-8 overflow-auto flex flex-col">
        <div className="mb-8">
          <pre className="whitespace-pre-wrap text-2xl mb-6">{text}</pre>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="border border-green-500 p-4 rounded bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-colors duration-300">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover mb-4 rounded"
                />
                <h2 className="text-xl font-bold mb-2">{project.name}</h2>
                <p className="mb-2">{project.description}</p>
                <p className="text-green-300">Technologies: {project.tech}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <p className="mb-2">Type &apos;home&apos; to return to the main page or &apos;help&apos; for more commands.</p>
          <div className="flex items-center">
            <span>{'>'}</span>
            <span className="ml-2">{userInput}</span>
            {showCursor && <span className="w-2 h-5 bg-green-500 inline-block ml-1 animate-blink"></span>}
          </div>
        </div>
      </main>

      {/* Help section (appears when 'help' is typed) */}
      {showHelp && (
        <div className="bg-[#2d2d2d] text-white p-4 flex justify-between items-center text-sm z-10">
          <div className="text-green-500">
            <p>Available commands:</p>
            <ul>
              <li>&apos;home&apos; - Go to homepage</li>
              <li>&apos;help&apos; - Show available commands</li>
            </ul>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  )
}
