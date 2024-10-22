'use client';

import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Navbar from "./components/navigation";
import TopBar from "./components/topbar";
import CommandInput from "./components/commandInput";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [descriptionText, setDescriptionText] = useState('');
  const [showHelp, setShowHelp] = useState(false); // You can remove this if not used

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
`;

  const description = `I'm passionate about creating beautiful, intuitive, and performant user interfaces. With a strong foundation in React and modern web technologies, I strive to deliver exceptional user experiences.`;
  const commandHelp = `Type &apos;work&apos; to see my projects or &apos;help&apos; for more commands.`;

  const typeText = useCallback((text: string, setText: (text: string) => void, delay: number = 20) => {
    let i = 0;
    return new Promise<void>((resolve) => {
      const intervalId = setInterval(() => {
        setText(text.slice(0, i));
        i++;
        if (i > text.length) {
          clearInterval(intervalId);
          resolve();
        }
      }, delay);
    });
  }, []);

  useEffect(() => {
    const animateText = async () => {
      await typeText('loading...', setDescriptionText);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading
      setIsLoading(false);

      await typeText(description, setDescriptionText, 30);
    };
    animateText();
  }, [typeText, description]);

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
              <p className="text-green-500 mb-4">{commandHelp}</p>
              <div className="flex flex-col space-y-2">
                <CommandInput onMessageSend={function (): void {
                  throw new Error("Function not implemented.");
                }} isContactPage={false} />
              </div>
            </div>
          )}
        </main>

        {showHelp && (
          <div className="bg-[#2d2d2d] text-white p-4 flex justify-between items-center text-sm z-10">
            <div className="text-green-500">
              <p>Available commands:</p>
              <ul>
                <li>&apos;work&apos; - View projects</li>
                <li>&apos;contact&apos; - Contact me</li>
                <li>&apos;help&apos; - Show available commands</li>
              </ul>
            </div>
          </div>
        )}

        <Navbar />
      </div>
    </>
  );
}
