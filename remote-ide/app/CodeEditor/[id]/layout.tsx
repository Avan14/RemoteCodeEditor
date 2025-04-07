"use client"; 

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2}}
    >
      <TooltipProvider>

      {children}
      </TooltipProvider>
    </motion.div>
  );
}
