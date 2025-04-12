import { ArrowBigLeftIcon } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-10 bg-black">
      <Link
        href="/"
        className="absolute top-4 left-4 bg-gray-900 text-black px-2 py-2 rounded shadow hover:bg-gray-700 transition"
      >
        <span  className="text-xl font-bold text-[#1E90FF] font-[Redwing-M] px-3 flex gap-2 ">
          <ArrowBigLeftIcon></ArrowBigLeftIcon> Home</span>
      </Link>
      {children}
    </div>
  );
}
