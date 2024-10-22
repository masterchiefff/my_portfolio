'use client'

import Link from "next/link"
import { Github, Linkedin, ArrowLeft } from "lucide-react"

export default function Navbar() {

  return (
    <div className="bg-[#2d2d2d] text-white p-2 flex justify-between items-center text-sm z-10 fixed bottom-0 w-full">
    <div className="flex space-x-4 text-green-500">
      <span>^G</span>
      <span>^O</span>
      <span>^R</span>
      <span>^W</span>
      <span>^K</span>
      <span>^C</span>
    </div>
    <div className="flex space-x-4 text-green-500">
      <Link href="/" className="hover:underline">.Home()</Link>
      <Link href="/work" className="hover:underline">.Work()</Link>
      <Link href="/contact" className="hover:underline">.contact()</Link>
      <Link href="https://www.linkedin.com/in/anwar-magara-b8806a105/" className="hover:underline">
        <Linkedin size={16} />
      </Link>
      <Link href="https://github.com/masterchiefff" className="hover:underline">
        <Github size={16} />
      </Link>
    </div>
  </div>
  )
}