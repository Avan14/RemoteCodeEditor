import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Play, Settings, Code2, BotMessageSquare } from "lucide-react";
import { useState } from "react";
import { HeaderProps } from "./page";
import { ExecuteCode } from "./api";
import { LANGUAGE_VERSIONS } from "./constants";
import Link from "next/link";
import { Chatbot } from "./chatbot";

export const languageOptions = Object.keys(LANGUAGE_VERSIONS).map((key) => ({
  value: key,
  label: `${key.charAt(0).toUpperCase() + key.slice(1)} (${
    LANGUAGE_VERSIONS[key as keyof typeof LANGUAGE_VERSIONS]
  })`,
}));

export const Header = ({
  code,
  setLanguage,
  Language,
  setoutput,
  seterror,
}: HeaderProps) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [AIhelp, setAIhelp] = useState(false);

  const toggleAIHelp = () => {
    setAIhelp(!AIhelp);
  };
  const handleRun = async () => {
    if (!Language || !code) {
      seterror(true);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      setoutput("Please select a language and write some code");
      return;
    }
    setLoading(true);
    try {
      // @ts-ignore
      const Sourcecode = await ExecuteCode(Language, code, seterror);
      setoutput(Sourcecode);
      seterror(false);
    } catch (error) {
      setoutput("Error: " + error);
      seterror(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="relative bg-gradient-to-br from-[#000000] via-[#0A0A0A] to-[#000000] overflow-hidden transition-all duration-300 hover:border-blue-950 p-4 shadow-lg">
      {/* Metallic overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#0050FF]/10 to-transparent pointer-events-none" />
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-[#0050FF]/10 to-transparent -translate-x-full group-hover:translate-x-full transform transition-transform duration-1000" />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-4">
          <Code2 className="h-6 w-6 text-blue-400" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/DashBoard">
                <h1 className="text-4xl font-bold tracking-wider font-[RedWing-M] cursor-pointer">
                  EDITOR
                </h1>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Back to Dashboard</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={Language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px] bg-[#0A0A0A] border-blue-900 hover:border-blue-950 transition-all duration-200">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-[#0A0A0A] border-blue-900 h-60">
              {languageOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-white "
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            className="p-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md hover:bg-blue-500/20 transition-all duration-300 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_15px_rgba(0,80,255,0.15)] flex items-center gap-1"
            onClick={toggleAIHelp}
          >
            <BotMessageSquare />
            CHAT WITH CODE
          </button>
          <button
            onClick={handleRun}
            disabled={loading}
            className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition-all duration-300 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_0_15px_rgba(0,80,255,0.15)] rounded-md flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin h-4 w-4 border-2 border-gray-200 border-t-transparent rounded-full"></div>
            ) : (
              <Play className="h-4 w-4" />
            )}
            <span>Run</span>
          </button>
          <button className="p-2 hover:bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md transition-all duration-300">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
      {AIhelp && <Chatbot code={code} toggleAIHelp={toggleAIHelp} />}
    </header>
  );
};
