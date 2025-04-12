import React from 'react';

const Footer = () => {
  return (
    <footer className="relative mt-32 bg-gradient-to-b from-transparent via-black/20 to-black/80 backdrop-blur-xl border-t border-white/10 p-10 text-white overflow-hidden">
      <div className="absolute -top-20 -left-10 w-[800px] h-[600px] bg-gradient-to-tr from-purple-600 via-blue-600 to-pink-500 rounded-full opacity-30 blur-3xl animate-pulse" />
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 z-10 relative">
        {/* Logo + Intro */}
        <div className="space-y-4">
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400 font-[RedWing-M]">CODEPULSE</h2>
          <p className="text-sm text-gray-300">Code. Compile. Deploy. 🚀</p>
          <p className="text-sm text-gray-400">support@compiler.io</p>
          <p className="text-sm text-gray-400">123 Code Street, Dev City</p>
        </div>

        {/* Features */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white/90">Features</h3>
          {['Multi-Language Support', 'Real-time Execution', 'Cloud Compilation', 'Error Debugging', 'Version Control'].map((item, i) => (
            <p key={i} className="text-sm text-gray-400 hover:text-blue-400 transition duration-200 cursor-pointer">{item}</p>
          ))}
        </div>

        {/* Resources */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white/90">Resources</h3>
          {['Documentation', 'API Reference', 'Code Snippets', 'Developer Blog', 'Community Forum'].map((item, i) => (
            <p key={i} className="text-sm text-gray-400 hover:text-blue-400 transition duration-200 cursor-pointer">{item}</p>
          ))}
        </div>

        {/* Support */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white/90">Support</h3>
          {['Help Center', 'Report a Bug', 'FAQs', 'Live Chat', 'Feature Requests'].map((item, i) => (
            <p key={i} className="text-sm text-gray-400 hover:text-blue-400 transition duration-200 cursor-pointer">{item}</p>
          ))}
        </div>

        {/* About */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white/90">About Us</h3>
          {['Our Story', 'Careers', 'Press & Media', 'Privacy Policy', 'Terms of Service'].map((item, i) => (
            <p key={i} className="text-sm text-gray-400 hover:text-blue-400 transition duration-200 cursor-pointer">{item}</p>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-14 text-center relative z-10">
        <p className="text-sm text-gray-400">
          © 2025 CODE_PULSE — Powered by <span className="text-blue-400 hover:underline cursor-pointer">DevHub</span>
        </p>
        <div className="mt-6 flex justify-center items-center gap-6">
          {[
            { icon: 'fab fa-facebook-f', color: 'text-blue-500' },
            { icon: 'fab fa-twitter', color: 'text-sky-400' },
            { icon: 'fab fa-instagram', color: 'text-pink-500' },
            { icon: 'fab fa-linkedin-in', color: 'text-blue-700' }
          ].map((item, i) => (
            <a key={i} href="#" className={`${item.color} hover:text-white text-xl transition-all duration-300`}>
              <i className={item.icon}></i>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
