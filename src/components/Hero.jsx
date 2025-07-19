import React from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import TypingAnimation from './TypingAnimation';
import AnimatedSection from './AnimatedSection';
import ResumeDownload from './ResumeDownload';

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const typingTexts = [
    'Full-Stack Developer',
    'Quant Trading/Research Enthusiast',
    'AI/ML Enthusiast',
    'Problem Solver',
    'Code/Solution Architect',
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-primary-950 relative overflow-hidden transition-colors duration-300 pt-16"
    >
      {/* Background animation elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-primary-500/20 to-cool-500/20 dark:from-primary-500/30 dark:to-cool-500/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-secondary-500/20 to-warm-500/20 dark:from-secondary-500/30 dark:to-warm-500/30 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-conic from-tertiary-500/10 via-primary-500/10 to-secondary-500/10 dark:from-tertiary-500/20 dark:via-primary-500/20 dark:to-secondary-500/20 rounded-full blur-3xl animate-gradient-xy"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-8">
        <AnimatedSection animation="fadeInUp">
          {/* Profile Picture */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white dark:border-neutral-700 shadow-xl bg-gradient-to-br from-primary-500 via-tertiary-500 to-secondary-500 p-1 mt-4 animate-gradient-xy">
                <img
                  src="/images/Augustine-ManuFrimpong.jpg"
                  alt="Augustine Manu-Frimpong - Full Stack Developer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* Online status indicator */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-secondary-500 rounded-full border-2 border-white dark:border-neutral-800 flex items-center justify-center animate-glow">
                <div className="w-3 h-3 bg-secondary-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-primary-600 via-tertiary-600 to-secondary-600 bg-clip-text text-transparent animate-gradient-x bg-[length:400%_400%] inline-block transform hover:scale-105 transition-all duration-500 animate-bounce-gentle cursor-default">
              Augustine Manu-Frimpong
            </span>
          </h1>

          <div className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-8 h-8 transition-colors duration-300">
            <TypingAnimation texts={typingTexts} className="font-semibold" />
          </div>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            Passionate about creating exceptional digital experiences with modern technologies and clean, efficient code.
          </p>

          <div className="flex justify-center space-x-6 mb-12">
            <a
              href="https://github.com/FrimpsManu"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-primary-100 dark:hover:bg-primary-900/50 text-neutral-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/25 animate-glow"
              aria-label="Visit GitHub profile"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/augustinefrimp"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-cool-100 dark:hover:bg-cool-900/50 text-neutral-700 dark:text-white hover:text-cool-600 dark:hover:text-cool-400 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cool-500/25 animate-glow"
              aria-label="Visit LinkedIn profile"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:augustine@example.com"
              className="p-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-warm-100 dark:hover:bg-warm-900/50 text-neutral-700 dark:text-white hover:text-warm-600 dark:hover:text-warm-400 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-warm-500/25 animate-glow"
              aria-label="Send email"
            >
              <Mail size={24} />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={scrollToAbout}
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-1 animate-glow"
            >
              Learn More About Me
            </button>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-secondary-600 text-secondary-600 hover:bg-secondary-600 hover:text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-secondary-500/25 hover:-translate-y-1 animate-glow"
            >
              Get In Touch
            </a>
            <ResumeDownload />
          </div>
        </AnimatedSection>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-neutral-400 dark:text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 animate-bounce z-30"
        aria-label="Scroll to about section"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;
