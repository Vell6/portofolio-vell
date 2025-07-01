
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Background from '../components/Background';
import Portfolio from '../components/Portfolio';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AudioPlayer from '../components/AudioPlayer';
import MusicNotification from '../components/MusicNotification';

const Index = () => {
  return (
    <div className="min-h-screen">
      <AudioPlayer />
      <MusicNotification />
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <About />
        <Background />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
