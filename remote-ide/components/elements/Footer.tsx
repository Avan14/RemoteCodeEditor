import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-10 border-t border-gray-700 mt-20">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Contact Section */}
        <div className="contact space-y-4">
          <h2 className="text-3xl font-bold mb-4 text-blue-700">ONLINE COMPILER</h2>
          <p className="text-lg">Code. Compile. Deploy. 🚀</p>
          <p className="text-lg">support@compiler.io</p>
          <p className="text-lg">123 Code Street, Dev City</p>
        </div>

        {/* Features Section */}
        <div className="features space-y-4">
          <h3 className="text-2xl font-semibold mb-4 text-white">FEATURES</h3>
          <ul className="space-y-2">
            <li className="hover:text-blue-400 cursor-pointer">Multi-Language Support</li>
            <li className="hover:text-blue-400 cursor-pointer">Real-time Execution</li>
            <li className="hover:text-blue-400 cursor-pointer">Cloud Compilation</li>
            <li className="hover:text-blue-400 cursor-pointer">Error Debugging</li>
            <li className="hover:text-blue-400 cursor-pointer">Version Control</li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="resources space-y-4">
          <h3 className="text-2xl font-semibold mb-4 text-white">RESOURCES</h3>
          <ul className="space-y-2">
            <li className="hover:text-blue-400 cursor-pointer">Documentation</li>
            <li className="hover:text-blue-400 cursor-pointer">API Reference</li>
            <li className="hover:text-blue-400 cursor-pointer">Code Snippets</li>
            <li className="hover:text-blue-400 cursor-pointer">Developer Blog</li>
            <li className="hover:text-blue-400 cursor-pointer">Community Forum</li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="support space-y-4">
          <h3 className="text-2xl font-semibold mb-4 text-white">SUPPORT</h3>
          <ul className="space-y-2">
            <li className="hover:text-blue-400 cursor-pointer">Help Center</li>
            <li className="hover:text-blue-400 cursor-pointer">Report a Bug</li>
            <li className="hover:text-blue-400 cursor-pointer">FAQs</li>
            <li className="hover:text-blue-400 cursor-pointer">Live Chat</li>
            <li className="hover:text-blue-400 cursor-pointer">Feature Requests</li>
          </ul>
        </div>

        {/* About Section */}
        <div className="about space-y-4">
          <h3 className="text-2xl font-semibold mb-4 text-white">ABOUT US</h3>
          <ul className="space-y-2">
            <li className="hover:text-blue-400 cursor-pointer">Our Story</li>
            <li className="hover:text-blue-400 cursor-pointer">Careers</li>
            <li className="hover:text-blue-400 cursor-pointer">Press & Media</li>
            <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-blue-400 cursor-pointer">Terms of Service</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom mt-8 text-center text-white">
        <p className="text-lg">
          © 2025 OnlineCompiler. All Rights Reserved by 
          <a href="#" className="text-blue-400 underline hover:text-blue-500"> DevHub</a>
        </p>
        <div className="social-icons flex justify-center space-x-6 mt-6">
          <a href="#" className="text-blue-500 hover:text-white text-2xl transition-colors duration-300"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-blue-400 hover:text-white text-2xl transition-colors duration-300"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-pink-500 hover:text-white text-2xl transition-colors duration-300"><i className="fab fa-instagram"></i></a>
          <a href="#" className="text-blue-700 hover:text-white text-2xl transition-colors duration-300"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
