import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const options = [
  { name: "Online shop", icon: "🛍️" },
  { name: "Personal blog", icon: "📝" },
  { name: "Waitlist site", icon: "📋" },
  { name: "Workout tracker", icon: "🏋️" },
  { name: "AI debate app", icon: "🤖" },
];

export default function IdeaToApp() {
  return (
    <div className="relative flex flex-col items-center justify-center text-white p-10 py-20  bg-black">
      <h1 className="text-9xl font-bold text-center font-[Redwing-M]">
        Idea to Code, <span className="text-[#2e53e6]">fast.</span>
      </h1>
      <p className="text-gray-300 mt-4 text-center max-w-lg ">
        Create beautiful, modern web applications at the speed of thought.
        Describe what you need and let AI build it for you.
      </p>
      <motion.div
        className="top-20 absolute inset-0 bg-[#1e44ff] opacity-30 blur-3xl w-[60%]  m-auto"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />

      <Card className="mt-8 bg-gray-900 p-6 rounded-xl shadow-lg relative z-10 w-full max-w-3xl">
        <CardContent className="flex flex-col gap-4">
          <div>
            <p className="text-gray-400 mb-4">
              What would you like to build? Start typing or choose an example...
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pb-8">
              {options.map((opt) => (
                <Button
                  key={opt.name}
                  variant="outline"
                  className="flex items-center gap-2 w-32 "
                >
                  {opt.icon} {opt.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t-2 border-gray-700 pt-5">
            <Button
              variant="ghost"
              className="bg-gray-700 text-white  hover:bg-gray-600"
            >
              {" "}
              📎Attach
            </Button>
            <Link href="/CodeEditor">
              <Button className="bg-[#1d4ed8] text-xl font-bold hover:bg-[#1d6ed8] text-white">
                🚀 Start building
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
