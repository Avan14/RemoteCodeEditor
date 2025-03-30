import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  const clerk = useClerk();
  const { isLoaded, isSignedIn } = useUser();
  const [showRedirectPopup, setShowRedirectPopup] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  const handleStartBuilding = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isSignedIn) {
      e.preventDefault();
      setShowRedirectPopup(true);
      setTimeout(() => {
        setShowRedirectPopup(false);
        window.location.href = "/sign-up";
      }, 2000);
    }
  };
  const logouthandler = async () => {
    try {
      await clerk.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  useEffect(() => {
    if (
      isLoaded &&
      isSignedIn &&
      !sessionStorage.getItem("welcomePopupShown")
    ) {
      setShowWelcomePopup(true);
      sessionStorage.setItem("welcomePopupShown", "true");
      setTimeout(() => setShowWelcomePopup(false), 2000);
    }
  }, [isLoaded, isSignedIn]);

  return (
    <>
      <nav className="flex justify-between items-center bg-black px-6 py-4 text-white z-50 border-b-2 border-gray-800 sticky top-0">
        <div className="flex items-center space-x-2">
          <span className="text-5xl font-bolder text-[#1E90FF] font-[Redwing-M] px-3">
            EDITOR
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none hover:bg-slate-800 py-2 px-3 rounded-md">
              Features ▾
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-black">
              <DropdownMenuItem className="hover:bg-slate-300 border-b-2 border-gray-400 rounded-r-none">
                AI code
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-300 border-b-2 border-gray-400">
                BOOTSTRAP
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-slate-300">
                HELP
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="cursor-pointer hover:bg-slate-800 py-2 px-3 rounded-md">
            Teams
          </span>
          <span className="cursor-pointer hover:bg-slate-800 py-2 px-3 rounded-md">
            Pricing
          </span>
          <span className="cursor-pointer hover:bg-slate-800 py-2 px-3 rounded-md">
            Guides
          </span>
          <span className="cursor-pointer hover:bg-slate-800 py-2 px-3 rounded-md">
            Blog
          </span>
          <span className="cursor-pointer hover:bg-slate-800 py-2 px-3 rounded-md">
            Careers
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="cursor-pointer">Contact sales</span>
          {!isSignedIn ? (
            <Link href="/sign-up">
              <Button
                variant="secondary"
                className="text-[#1E90FF] font-bold bg-white w-28 text-base"
              >
                Log In
              </Button>
            </Link>
          ) : null}

          <Link href={isSignedIn ? "/CodeEditor/12" : "/sign-up"}>
            <Button
              onClick={handleStartBuilding}
              variant="secondary"
              className="bg-[#1E90FF] hover:bg-[#2563eb] text-white"
            >
              Start Building
            </Button>
          </Link>
          {isSignedIn ? (
              <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button className="bg-black w-6" >
                  <Avatar className="w-9 h-9 text-black text-xl">
                    <AvatarFallback>
                    A
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
        
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <a className="text-black">{"User"}</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/service" className="text-gray-700">
                    Services
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild onClick={logouthandler}>
                  <a className="text-gray-700">Logout</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </nav>

      {showRedirectPopup && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg">
          You are being redirected to the signup page...
        </div>
      )}

      {showWelcomePopup && (
        <div className="fixed bottom-16 right-4 bg-green-700 text-white px-4 py-2 rounded shadow-lg">
          Welcome! You have successfully signed in.
        </div>
      )}
    </>
  );
}
