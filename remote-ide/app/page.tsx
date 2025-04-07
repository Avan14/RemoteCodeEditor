"use client"

import Footer from "@/components/elements/Footer";
import Hero from "@/components/elements/Hero";
import { Hero2 } from "@/components/elements/Hero2";
import Hero3 from "@/components/elements/Hero3";
import Hero4 from "@/components/elements/Hero4";
import Hero5 from "@/components/elements/Hero5";
import IdeaToApp from "@/components/elements/IdeaToCode";
import Navbar from "@/components/elements/Navbar";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar></Navbar>
      <IdeaToApp></IdeaToApp>
      <Hero></Hero>
      <Hero2></Hero2>
      <Hero3></Hero3>
      <Hero5></Hero5>
      <Hero4></Hero4>
      <Footer></Footer>
    </div>
  );
}
