'use client'

import { Github, Linkedin } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useCallback } from "react"
import Head from "next/head"
import Navbar from "./components/navigation"
import TopBar from "./components/topbar"
import CommandInput from "./components/commandInput"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [descriptionText, setDescriptionText] = useState('')
  const [commandHelpText, setCommandHelpText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [showCursor, setShowCursor] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const nameAscii = `
  ${'.'.repeat(50)}
  █████  ███    ██ ██     ██  █████  ██████      
 ██   ██ ████   ██ ██     ██ ██   ██ ██   ██     
 ███████ ██ ██  ██ ██  █  ██ ███████ ██████      
 ██   ██ ██  ██ ██ ██ ███ ██ ██   ██ ██   ██     
 ██   ██ ██   ████  ███ ███  ██   ██ ██   ██     
                                                  
███    ███  █████   ██████   █████  ██████   █████  
████  ████ ██   ██ ██       ██   ██ ██   ██ ██   ██ 
██ ████ ██ ███████ ██   ███ ███████ ██████  ███████ 
██  ██  ██ ██   ██ ██    ██ ██   ██ ██   ██ ██   ██ 
██      ██ ██   ██  ██████  ██   ██ ██   ██ ██   ██ 
${'.'.repeat(50)}
`

  const description = `I'm passionate about creating beautiful, intuitive, and performant user interfaces. With a strong foundation in React and modern web technologies, I strive to deliver exceptional user experiences.`

  const commandHelp = `Type 'work' to see my projects or 'help' for more commands.`

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

  useEffect(() => {
    const animateText = async () => {
      await typeText('loading...', setDescriptionText)
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate loading
      setIsLoading(false)

      await typeText(description, setDescriptionText, 30)
      setShowCursor(true)
    }
    animateText()
  }, [typeText, description])

  const handleNavigation = useCallback(() => {
    const inputLowerCase = userInput.toLowerCase()
    if (inputLowerCase === 'work') {
      window.location.href = '/work'
    } else if (inputLowerCase === 'contact' || inputLowerCase === 'contact me' || inputLowerCase === 'contacts') {
      window.location.href = '/contact'
    } else if (inputLowerCase === 'help') {
      setShowHelp(true)
    }
  }, [userInput])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleNavigation()
        setUserInput('')
      } else if (event.key === 'Backspace') {
        setUserInput(prev => prev.slice(0, -1))
      } else if (event.key.length === 1) {
        setUserInput(prev => prev + event.key)
      }

      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'w') {
        window.location.href = '/work'
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [userInput, handleNavigation])

  return (
    <>
      <Head>
        <title>Anwar Magara | Terminal Portfolio</title>
      </Head>
      <div className="min-h-screen bg-[#1e1e1e] text-green-500 font-mono flex flex-col justify-between">
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
            <pre className="text-green-500 text-2xl">loading...</pre>
          </div>
        )}
        <TopBar />
        <main className="flex-1 p-8 overflow-auto z-10">
          {!isLoading && (
            <div className="flex flex-col">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <pre className="whitespace-pre-wrap text-green-500">{nameAscii}</pre>
                <div className="flex flex-col justify-center">
                  <p className="text-green-500 text-right">{descriptionText}</p>
                </div>
              </div>
              <p className="text-green-500 mb-4">{commandHelp}</p> {/* Display command help */}
              <div className="flex flex-col space-y-2">
                <CommandInput onMessageSend={function (): void {
                  throw new Error("Function not implemented.")
                } } isContactPage={false} />
              </div>
            </div>
          )}
        </main>

        {showHelp && (
          <div className="bg-[#2d2d2d] text-white p-4 flex justify-between items-center text-sm z-10">
            <div className="text-green-500">
              <p>Available commands:</p>
              <ul>
                <li>'work' - View projects</li>
                <li>'contact' - Contact me</li>
                <li>'help' - Show available commands</li>
              </ul>
            </div>
          </div>
        )}

      <Navbar />
      </div>
    </>
  );
}
