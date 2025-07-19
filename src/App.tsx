import React, { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Hackathons from './components/Hackathons';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import TechStack from './components/TechStack';
import InteractiveTimeline from './components/InteractiveTimeline';
import ParticleBackground from './components/ParticleBackground';
import ScrollProgress from './components/ScrollProgress';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import LiveChat from './components/LiveChat';
import analytics from './services/analyticsService';

function App() {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          analytics.trackClick('navigation_link', target.hash.substring(1));
        }
      }
    };

    // Add event listeners for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    // Track initial page load
    analytics.trackPageView();

    // Cleanup event listeners
    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="App bg-white dark:bg-gray-900 transition-colors duration-300">
        <ParticleBackground />
        <ScrollProgress />
        <PWAInstallPrompt />
        <Navigation />
        <main className="relative z-10">
          <Hero />
          <About />
          <TechStack />
          <Skills />
          <InteractiveTimeline />
          <Projects />
          <Hackathons />
          <Contact />
        </main>
        <Footer />
        <LiveChat />
      </div>
    </ThemeProvider>
  );
}

export default App;