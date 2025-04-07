import { motion } from "framer-motion";
import { ArrowDown, Rocket, Users } from "lucide-react";

export const Hero2 = () => {
  return (
    <div className="w-4/5 mx-auto mt-16 mb-24">
      {/* Scroll Down Indicator */}
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
          Experience the future of digital innovation with our cutting-edge solutions
        </p>
      </div>
    </div>
      <div className="flex flex-col md:flex-row items-center relative">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="md:w-1/2 md:pr-8 mt-8 md:mt-0"
        >
          {/* Real-time Collaboration Demo */}
          <div className="rounded-xl overflow-hidden bg-black/20 border border-gray-800 backdrop-blur-md shadow-xl group">
            <div className="bg-black/40 py-2 px-4 border-b border-gray-800 flex items-center justify-between">
              <div className="text-sm text-white">RemoteCodeEditor Session</div>
              <div className="text-xs px-2 py-0.5 rounded-full bg-[#0050FF]/20 text-blue-400 border border-blue-500/30">Live</div>
            </div>
            
            <div className="p-4">
              <div className="bg-black/30 rounded-md p-3 border border-gray-800 font-mono text-sm overflow-hidden">
                {/* Code content remains the same */}
                {/* ... existing code content ... */}
              </div>
              
              {/* User activity section with updated styling */}
              <div className="mt-4 bg-black/30 backdrop-blur-sm rounded-md p-2 border border-gray-800">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#0050FF] flex items-center justify-center text-[10px] font-bold mt-0.5">J</div>
                  <div>
                    <div className="text-xs font-medium text-white"> useEffect hook</div>
                    <div className="text-xs text-gray-400 mt-0.5">5 seconds ago</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 rounded-full bg-[#0050FF]/20 border border-[#0050FF]/30 flex items-center justify-center text-[10px] z-20">J</div>
                    <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-[10px] z-10">T</div>
                  </div>
                  <div className="text-xs text-gray-400">Edit now</div>
                </div>
                
                <motion.div
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 4, duration: 0.5 }}
                  className="text-xs px-2 py-0.5 rounded-full bg-[#0050FF]/20 text-blue-400 border border-blue-500/30"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0050FF] animate-pulse"></div>
                    <span>Changes saved</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline Node */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-10 h-10 rounded-full bg-black/30 border border-[#0050FF]/50 flex items-center justify-center z-10"
          >
            <Users className="h-5 w-5 text-[#0050FF]" />
          </motion.div>
        </div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="md:w-1/2 md:pl-8 mt-8 md:mt-0"
        >
          <div className="p-6 rounded-xl backdrop-blur-md bg-black/20 border border-gray-800 overflow-hidden group hover:shadow-lg hover:shadow-[#0050FF]/5 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0050FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <div className="relative z-10 h-16 w-16 rounded-2xl bg-[#0050FF]/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-[#0050FF]" />
              </div>
            </motion.div>
            <h3 className="text-xl font-semibold mb-3 relative z-10 text-white">
              Real-time PrevieW
            </h3>
            <p className="text-gray-400 relative z-10">
            CodePulse is a cutting-edge remote code editor designed for modern developers who demand flexibility without compromising power. Built for seamless collaboration across time zones and devices, CodePulse eliminates the barriers between your ideas and their implementation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}