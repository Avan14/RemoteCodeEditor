import { motion } from "framer-motion";
import { ArrowDown, Rocket } from "lucide-react";

export default function HeroHeader1(){
    return (
        <div>
           <div className="flex justify-center mb-8">
                   <motion.div
                     animate={{ y: [0, 10, 0] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="flex flex-col items-center gap-2 text-blue-500"
                   >
                     <span className="text-sm font-semibold">Discover Features</span>
                     <ArrowDown className="h-5 w-5" />
                   </motion.div>
                 </div>
                 <div className="container mx-auto px-4 py-16">
                   <div className="flex flex-col items-center text-center text-white">
                     <Rocket className="w-16 h-16 mb-6" />
                     <h1 className="text-5xl font-bold mb-4">Welcome to Our Platform</h1>
                     <p className="text-xl text-gray-300 max-w-2xl">
                       Experience the future of digital innovation with our cutting-edge
                       solutions
                     </p>
                   </div>
                 </div>

        </div>
    )
}