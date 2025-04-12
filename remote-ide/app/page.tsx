"use client";

import Footer from "@/components/elements/Footer";
import Hero from "@/components/elements/Hero";
import Hero_4  from "@/components/elements/Hero2";
import Hero_3 from "@/components/elements/Hero4";
import Hero_1 from "@/components/elements/Hero5";
import Hero_2 from "@/components/elements/Hero7";
import IdeaToApp from "@/components/elements/IdeaToCode";
import Navbar from "@/components/elements/Navbar";
import HeroHeader1 from "@/components/elements/HeroHeader1";

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar></Navbar>
      <IdeaToApp></IdeaToApp>
      <HeroHeader1></HeroHeader1>
      <Hero></Hero>
      <Hero_1></Hero_1>
      <Hero_2></Hero_2>
      <Hero_3></Hero_3>
      <Hero_4></Hero_4>
      <Footer></Footer>
    </div>
  );
}
