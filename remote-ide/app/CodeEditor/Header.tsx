import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Settings, Code2 } from "lucide-react";
import { useState } from "react";
import { HeaderProps } from "./page";
import { ExecuteCode } from "./api";
import { useToast } from "@/hooks/use-toast";
import { LANGUAGE_VERSIONS } from "./constants";

const languageOptions = Object.keys(LANGUAGE_VERSIONS).map((key) => ({
  value: key,
  label: `${key.charAt(0).toUpperCase() + key.slice(1)} (${LANGUAGE_VERSIONS[key as keyof typeof LANGUAGE_VERSIONS]})`,
}));


export const Header = ({
  code,
  setLanguage,
  Language,
  setoutput,
  seterror
}: HeaderProps) => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const { toast } = useToast();

  const handleRun = async () => {
    if (!Language || !code) {
      seterror(true);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      setoutput( "Please select a language and write some code");
      return;
    }
    setLoading(true);
    try {
      // @ts-ignore
      const Sourcecode = await ExecuteCode(Language, code,seterror);
      setoutput(Sourcecode);
    } catch (error) {
      setoutput("Error: " + error);
      seterror(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Code2 className="h-6 w-6 text-blue-400" />
          <h1 className="text-xl font-bold">EDITOR</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={Language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            onClick={handleRun}
            disabled={loading}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md flex items-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin h-4 w-4 border-2 border-gray-200 border-t-transparent rounded-full"></div>
            ) : (
              <Play className="h-4 w-4" />
            )}
            <span>Run</span>
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-md">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
