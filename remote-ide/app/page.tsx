"use client"

import Footer from "@/components/elements/Footer";
import Hero from "@/components/elements/Hero";
import IdeaToApp from "@/components/elements/IdeaToCode";
import Navbar from "@/components/elements/Navbar";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar></Navbar>
      <IdeaToApp></IdeaToApp>
      <Hero></Hero>
      <Footer></Footer>
    </div>
  );
}
