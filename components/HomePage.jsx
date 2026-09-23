"use client";
import SmoothScroll from "./SmoothScroll";
import Nav from "./Nav";
import Cursor from "./Cursor";
import GridOverlay from "./GridOverlay";
import Hero from "./sections/Hero";
import Problem from "./sections/Problem";
import Moments from "./sections/Moments";
import Approach from "./sections/Approach";
import Projects from "./sections/Projects";
import Capabilities from "./sections/Capabilities";
import Experience from "./sections/Experience";
import Content from "./sections/Content";
import Process from "./sections/Process";
import Services from "./sections/Services";
import About from "./sections/About";
import FAQ from "./sections/FAQ";
import FinalCTA from "./sections/FinalCTA";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function HomePage() {
  return (
    <SmoothScroll>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Moments />
        <Approach />
        <Projects />
        <Capabilities />
        <Experience />
        <Content />
        <Process />
        <Services />
        <About />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
      <Cursor />
      <GridOverlay />
    </SmoothScroll>
  );
}
