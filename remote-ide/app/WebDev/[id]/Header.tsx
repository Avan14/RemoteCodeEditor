import { Settings, Code2, BotMessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Chatbot } from "./chatbot"; 

export const Header = ({ code }: any) => {
  const [AIhelp, setAIhelp] = useState(false);

  const toggleAIHelp = () => {
    setAIhelp(!AIhelp);
  };

  return (
    <header
      className="relative bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000] border-b border-blue-900 shadow-md"
      style={{
        boxShadow:
          "0 4px 20px rgba(0, 80, 255, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Metallic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#0050FF]/10 to-transparent pointer-events-none" />
      {/* Shine Effect */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-[#0050FF]/10 to-transparent -translate-x-full hover:translate-x-full transform transition-transform duration-1000" />

      <div className="relative flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Code2 className="h-8 w-8 text-blue-400" />
          <Link href="/DashBoard">
            <h1 className="text-4xl font-bold tracking-wider bg-clip-text font-[RedWing-M]">
              EDITOR
            </h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="p-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md hover:bg-blue-500/20 transition-all duration-300 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_15px_rgba(0,80,255,0.15)] flex items-center gap-1"
            onClick={toggleAIHelp}
          >
            <BotMessageSquare></BotMessageSquare>
            CHAT WITH CODE
          </button>
          <button className="p-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md hover:bg-blue-500/20 transition-all duration-300 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_15px_rgba(0,80,255,0.15)]">
            <Settings className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Render Chatbot component conditionally */}
      {AIhelp && <Chatbot code={code} toggleAIHelp={toggleAIHelp} />}
    </header>
  );
};
