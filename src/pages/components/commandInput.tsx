// components/CommandInput.tsx

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface CommandInputProps {
  onMessageSend: () => void;
  isContactPage: boolean;
}

const CommandInput: React.FC<CommandInputProps> = ({ onMessageSend, isContactPage }) => {
  const [userInput, setUserInput] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const inputLower = userInput.toLowerCase();
        if (inputLower === 'home') {
          router.push('/');
        } else if (inputLower === 'work') {
          router.push('/work');
        } else if (inputLower === 'contact') {
          router.push('/contact'); // Navigate to contact page
        } else if (inputLower === 'message') {
          if (isContactPage) {
            onMessageSend();
          }
        } else if (inputLower === 'help') {
          alert('Available commands: home, work, contact, message');
        } else {
          alert(`Unknown command: ${userInput}`);
        }
        setUserInput('');
      } else if (event.key === 'Backspace') {
        setUserInput(prev => prev.slice(0, -1));
      } else if (event.key.length === 1) {
        setUserInput(prev => prev + event.key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [userInput, onMessageSend, router, isContactPage]);

  return (
    <div className="flex flex-col mt-auto mb-6">
      {isContactPage && (
        <p className="text-green-500 mb-2">
          Type 'message' to start sending a message to me, or 'help' for command options.
        </p>
      )}
      <div className="flex items-center">
        <span>{'>'}</span>
        <span className="ml-2">{userInput}</span>
        <span className="w-2 h-5 bg-green-500 inline-block ml-1 animate-blink"></span>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="absolute opacity-0" // Keep the input field present but invisible
          autoFocus
        />
      </div>
    </div>
  );
};

export default CommandInput;
