
import { Play, Settings, Code2 } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Code2 className="h-6 w-6 text-blue-400" />
          <Link href="/DashBoard">
            <h1 className="text-xl font-bold">EDITOR</h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">

          <button className="p-2 hover:bg-gray-700 rounded-md">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
