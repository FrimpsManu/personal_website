import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/FrimpsManu',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/augustinefrimp',
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: 'mailto:augustinemanu2023@gmail.com',
      label: 'Email',
    },
  ];

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#timeline' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand and Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">Augustine Manu-Frimpong</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                Full-Stack Developer passionate about creating exceptional digital experiences 
                with modern technologies and clean, efficient code.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg transition-all duration-300 hover:scale-110"
                    aria-label={link.label}
                  >
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Get In Touch</h4>
              <div className="space-y-2 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                <p>Grambling, LA</p>
                <p>augustinemanu2023@gmail.com</p>
                <p>+1 (781) 947-7281</p>
              </div>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 cursor-pointer hover:underline"
              >
                Back to top ↑
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 transition-colors duration-300">
            <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
              © {currentYear} Augustine Manu-Frimpong. All rights reserved.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
};

export default Footer;
