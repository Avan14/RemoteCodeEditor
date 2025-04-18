import { motion } from "framer-motion";
import { ArrowDown, Rocket, Users } from "lucide-react";
import { Button } from "../ui/button";

const Hero2 = () => {
  return (
    <div className="w-4/5 mx-auto mt-16 mb-24">
      <h2 className="text-6xl md:text-5xl font-bold text-white mb-20 text-center font-[Redwing-M]">
        Code , Anywhere. Anytime.
      </h2>
      <div className="flex flex-col md:flex-row items-center relative">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="md:w-1/2 md:pr-8 mt-8 md:mt-0"
        >
          <div className="rounded-xl overflow-hidden bg-black/20 border border-gray-800 backdrop-blur-md shadow-xl group">
            <div className="bg-black/40 py-2 px-4 border-b border-gray-800 flex items-center justify-between">
              <div className="text-sm text-white">RemoteCodeEditor Session</div>
              <div className="text-xs px-2 py-0.5 rounded-full bg-[#0050FF]/20 text-blue-400 border border-blue-500/30">
                Live
              </div>
            </div>

            <div className="p-4">
              <div className="bg-black/30 rounded-md p-3 border border-gray-800 font-mono text-sm overflow-auto text-white">
                <pre className="whitespace-pre-wrap">
                  <code>
                    <span className="text-purple-400">#include</span>{" "}
                    <span className="text-white">&lt;vector&gt;</span>
                    {"\n\n"}
                    <span className="text-emerald-400">int</span> binarySearch(
                    <span className="text-white">
                      std::vector&lt;int&gt;& arr, int target
                    </span>
                    ) {"{\n"}
                      <span className="text-emerald-400">int</span> left ={" "}
                    <span className="text-purple-400">0</span>;{"\n"}
                      <span className="text-emerald-400">int</span> right =
                    arr.size() - <span className="text-purple-400">1</span>;
                    {"\n\n"}
                      <span className="text-emerald-400">while</span> (left
                    &gt;= right) {"{\n"}
                        <span className="text-emerald-400">int</span> mid = left
                    + (right - left) /{" "}
                    <span className="text-purple-400">2</span>;{"\n\n"}
                        <span className="text-emerald-400">if</span> (arr[mid]
                    == target) {"{\n"}
                          <span className="text-emerald-400">return</span> mid;
                    {"\n"}
                        {"}"}
                    {"\n\n"}
                        <span className="text-emerald-400">if</span> (arr[mid]
                    &gt; target) {"{\n"}
                          left = mid +{" "}
                    <span className="text-purple-400">1</span>;{"\n"}
                        {"}"} <span className="text-emerald-400">else</span>{" "}
                    {"{\n"}
                          right = mid -{" "}
                    <span className="text-purple-400">1</span>;{"\n"}
                        {"}"}
                    {"\n"}
                      {"}"}
                    {"\n\n"}
                      <span className="text-emerald-400">return</span>{" "}
                    <span className="text-purple-400">-1</span>;{"\n"}
                    {"}"}
                  </code>
                </pre>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1"></div>
                  <div className="text-xs text-gray-400">Compiled in 8ms </div>
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
                <Rocket className="h-8 w-8 text-[#0050FF]" />
              </div>
            </motion.div>
            <h3 className="text-xl font-semibold mb-3 relative z-10 text-white">
              Blazing-Fast Code Execution
            </h3>
            <p className="text-gray-400 relative z-10">
              CodePulse is a cutting-edge remote code editor designed for modern
              developers who demand flexibility without compromising power.
              Execute algorithms like binary search instantly with our optimized
              runtime environment, ensuring your code runs smoothly across
              devices and collaborations.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="mt-16 bg-gradient-to-r from-gray-900 to-black p-8 rounded-2xl shadow-xl">
        <h2 className="text-6xl md:text-4xl font-bold text-white mb-4 justify-center mx-auto font-[Redwing-M]">
          Try Codepulse Now
        </h2>
        <p className="text-gray-200 text-lg mb-6 max-w-2xl mx-auto">
          Start building your dream projects with our collaborative cloud editor
          that brings your code to life. Experience the power of real-time
          collaboration and intelligent code assistance.
        </p>
        <Button
          variant="default"
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-md"
        >
          Start Building
        </Button>
      </div>
    </div>
  );
};

export default Hero2;
