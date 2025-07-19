import React, { useState, useEffect } from 'react';
import { Menu, X, Home, User, Code, Briefcase, FolderOpen, Trophy, Mail, Layers } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import analytics from '../services/analyticsService';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'tech-stack', label: 'Tech Stack', icon: Layers },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'timeline', label: 'Timeline', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'hackathons', label: 'Hackathons', icon: Trophy },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      setScrolled(currentScrollY > 50);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = currentScrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      analytics.trackClick('navigation', sectionId);
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${scrolled ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50 shadow-lg shadow-neutral-900/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="relative cursor-pointer group" onClick={() => scrollToSection('home')}>
              <div className="text-xl font-bold bg-gradient-to-r from-primary-600 via-tertiary-600 to-secondary-600 bg-clip-text text-transparent transition-all duration-300 hover:scale-105 animate-gradient-x bg-[length:200%_200%]">
                Augustine Manu-Frimpong
              </div>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-300"></div>
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group hover:scale-105 ${activeSection === item.id ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
                    <span>{item.label}</span>
                  </div>
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full animate-pulse"></div>
                  )}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-secondary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
              <div className="ml-4 pl-4 border-l border-neutral-200 dark:border-neutral-700">
                <ThemeToggle />
              </div>
            </div>

            <div className="lg:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-2 rounded-lg transition-all duration-300 hover:scale-110 ${isOpen ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'}`}
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                <div className="relative w-6 h-6">
                  <Menu size={24} className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
                  <X size={24} className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-200/50 dark:border-neutral-800/50">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all duration-300 hover:scale-[1.02] ${activeSection === item.id ? 'text-primary-600 dark:text-primary-400 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 shadow-sm' : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gradient-to-r hover:from-neutral-50 hover:to-neutral-100 dark:hover:from-neutral-800/50 dark:hover:to-neutral-700/50'}`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.3s ease ${index * 50}ms`
                  }}
                >
                  <item.icon size={18} className="flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="fixed top-0 left-0 w-full h-1 bg-neutral-200 dark:bg-neutral-800 z-40">
        <div
          className="h-full bg-gradient-to-r from-primary-500 via-tertiary-500 to-secondary-500 transition-all duration-150 ease-out animate-gradient-x bg-[length:200%_200%]"
          style={{
            width: `${Math.min(100, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`
          }}
        />
      </div>

      <div className="hidden xl:flex fixed right-8 top-1/2 transform -translate-y-1/2 flex-col gap-3 z-40">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`group relative w-3 h-3 rounded-full transition-all duration-300 hover:scale-150 ${activeSection === item.id ? 'bg-primary-500 shadow-lg shadow-primary-500/50' : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-primary-400 dark:hover:bg-primary-500'}`}
            aria-label={`Navigate to ${item.label}`}
          >
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
              {item.label}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-neutral-900 dark:border-l-white"></div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default Navigation;
