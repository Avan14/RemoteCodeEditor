import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Navbar() {

  return (
    <nav className="flex justify-between items-center bg-black px-6 py-4 text-white z-50 border-b-2 border-gray-800 sticky top-0">
      <div className="flex items-center space-x-2">
        <span  className="text-5xl font-bolder text-[#1E90FF] font-[Redwing-M] px-3">EDITOR</span>

        <DropdownMenu >
          <DropdownMenuTrigger className="focus:outline-none hover:bg-slate-800 py-2 px-3 rounded-md">Features ▾</DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white text-black">
            <DropdownMenuItem className=" hover:bg-slate-300 border-b-2 border-gray-400 rounded-r-none">AI code</DropdownMenuItem>
            <DropdownMenuItem className=" hover:bg-slate-300 border-b-2 border-gray-400">BOOTSTRAP</DropdownMenuItem>
            <DropdownMenuItem className=" hover:bg-slate-300">HELP</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <span className="cursor-pointer hover:bg-slate-800 py-2 px-3 rounded-md">Teams</span>
        <span className="cursor-pointer hover:bg-slate-800 py-2 px-3 rounded-md">Pricing</span>
        <span className="cursor-pointer hover:bg-slate-800 py-2 px-3 rounded-md">Guides</span>
        <span className="cursor-pointer hover:bg-slate-800 py-2 px-3 rounded-md">Blog</span>
        <span className="cursor-pointer hover:bg-slate-800 py-2 px-3 rounded-md">Careers</span>
      </div>

      <div className="flex items-center space-x-4">
        <span className="cursor-pointer">Contact sales</span>
        <Link href="/Auth">
        <Button variant="secondary" className=" text-[#1E90FF] font-bold bg-white w-28 text-base" >Log  In</Button>
        </Link>
        <Link href="/CodeEditor">
        <Button variant="secondary" className=" text-white  text-lg bg-[#1E90FF] hover:bg-[#2563eb]" >Start Building</Button>
        </Link>
      </div>
    </nav>
  );
}
