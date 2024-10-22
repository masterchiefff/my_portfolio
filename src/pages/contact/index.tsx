// pages/contact.tsx

import { useState, useEffect, useCallback } from "react";
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Head from "next/head"

import CommandInput from "../components/commandInput";
import TopBar from "../components/topbar";
import Navbar from "../components/navigation";

const ContactsPage: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showMessageInput, setShowMessageInput] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const contactInfo = [
    { icon: <Mail size={16} />, text: "anwarmagara@gmail.com" },
    { icon: <Phone size={16} />, text: "+254 710 865696" },
    { icon: <MapPin size={16} />, text: "Nairobi, Kenya" },
  ];

  const socialLinks = [
    { icon: <Github size={16} />, text: "GitHub", url: "https://github.com/masterchiefff" },
    { icon: <Linkedin size={16} />, text: "LinkedIn", url: "https://www.linkedin.com/in/anwar-magara-b8806a105/" },
  ];

  const fullText = `Contact Information:`;

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
    const animate = async () => {
      await typeText(fullText, setText);
      setIsLoading(false);
    };
    animate();
  }, [typeText, fullText]);

  const handleMessageSend = () => {
    setShowMessageInput(true);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    // Send message logic here
    console.log(`Email: ${email}, Message: ${message}`);
    // Reset state
    setEmail('');
    setMessage('');
    setShowMessageInput(false);
    alert('Message sent!');
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-green-500 font-mono flex flex-col">
      <Head>
        <title>Contact Me</title>
      </Head>
      
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
          <pre className="text-green-500 text-2xl">Loading...</pre>
        </div>
      )}

      <TopBar />
      <main className="flex-1 p-8 overflow-auto flex flex-col">
        <div className="mb-8">
          <pre className="whitespace-pre-wrap text-2xl mb-6">{isLoading ? 'Loading...' : text}</pre>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-green-500 p-4 rounded bg-[#2d2d2d]">
              <h2 className="text-xl font-bold mb-4">Contact Details</h2>
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  {item.icon}
                  <span className="ml-2">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="border border-green-500 p-4 rounded bg-[#2d2d2d]">
              <h2 className="text-xl font-bold mb-4">Connect with Me</h2>
              {socialLinks.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-green-500 hover:underline">
                    {item.icon}
                    <span className="ml-2">{item.text}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {showMessageInput ? (
          <div className="flex flex-col mt-auto mb-6">
            <label className="text-green-500">Email:</label>
            <input 
              type="text" 
              value={email} 
              onChange={handleEmailChange} 
              className="bg-[#2d2d2d] text-white border border-green-500 p-2 mb-2"
            />
            <label className="text-green-500">Message:</label>
            <textarea 
              value={message} 
              onChange={handleMessageChange} 
              className="bg-[#2d2d2d] text-white border border-green-500 p-2 mb-2"
            />
            <button onClick={handleSendMessage} className="bg-green-500 text-white p-2 rounded">
              Send
            </button>
          </div>
        ) : (
          <CommandInput onMessageSend={handleMessageSend} isContactPage={true} />
        )}
      </main>
      <Navbar />
    </div>
  );
}

export default ContactsPage;
