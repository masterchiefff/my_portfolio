import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface CommandInputProps {
  onMessageSend: () => void;
  isContactPage: boolean;
}

const CommandInput: React.FC<CommandInputProps> = ({ onMessageSend, isContactPage }) => {
  const [userInput, setUserInput] = useState<string>('');
  const router = useRouter();

  const handleCommand = (command: string) => {
    switch (command) {
      case 'home':
        router.push('/');
        break;
      case 'work':
        router.push('/work');
        break;
      case 'contact':
        router.push('/contact');
        break;
      case 'message':
        if (isContactPage) {
          onMessageSend();
        }
        break;
      case 'help':
        alert('Available commands: home, work, contact, message');
        break;
      default:
        alert(`Unknown command: ${command}`);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleCommand(userInput.toLowerCase());
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
          className="absolute opacity-0"
          autoFocus
        />
      </div>
    </div>
  );
};

export default CommandInput;
