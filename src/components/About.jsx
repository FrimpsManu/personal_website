import React from 'react';
import { Code2, Coffee, Gamepad2, Calculator } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const About = () => {
  const interests = [
    { icon: Code2, label: 'Clean Code', description: 'Writing maintainable, scalable solutions' },
    { icon: Coffee, label: 'Coffee Chat', description: 'Fueled by great coffee chat and creativity' },
    { icon: Calculator, label: 'Mathematics', description: 'Applying mathematical concepts to solve complex problems' },
    { icon: Gamepad2, label: 'Gaming', description: 'Exploring virtual worlds and game design' }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/30 dark:from-neutral-800 dark:via-neutral-800 dark:to-neutral-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4 transition-colors duration-300">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 via-tertiary-500 to-secondary-500 mx-auto animate-gradient-x"></div>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection animation="fadeInLeft">
            {/* Profile Image */}
            <div className="mb-8 lg:mb-0 flex justify-center lg:justify-start">
              <div className="relative">
                <div className="w-94 h-[40rem] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-500/20 via-tertiary-500/20 to-secondary-500/20 p-2 animate-gradient-xy">
                  <img 
                    src="/images/Augustine-ManuFrimpong.jpg" 
                    alt="Augustine Manu-Frimpong working on a project"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary-500/30 rounded-full blur-xl animate-float"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-secondary-500/30 rounded-full blur-xl animate-float delay-1000"></div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fadeInRight">
            <div className="space-y-6">
              <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed transition-colors duration-300">
                Hey! I am Augustine Manu-Frimpong — a Computer Science, Math & Business student with a love for turning big ideas into real-world impact. Whether it is building an offline AI tutor (in progress) for underserved communities or engineering real-time market data systems, I'm all about using tech to solve meaningful problems.
              </p>
              
              <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed transition-colors duration-300">
                I have had the chance to grow through experiences with teams at eBay, Notion, Louisiana Tech (NSF REU), and BLK Capital, combining my interests in AI, data, finance, and education to build scalable, human-centered solutions.
              </p>

              <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed transition-colors duration-300">
                Beyond the code, I love to play soccer, community advocate, and lifelong learner who believes that tech should empower everyone — not just a few.
              </p>

              <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed transition-colors duration-300">
                Let's connect — whether you are building something ambitious, looking to collaborate, or just want to swap ideas about AI, equity, or good jollof.
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                {['AI/ML', 'Quantitative trade/ research', 'Full-Stack Development', 'Data Science/ Analytics', 'Community Building', 'Education Technology'].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 gap-6">
              {interests.map((interest, index) => (
                <div
                  key={interest.label}
                  className="group p-6 bg-white/80 dark:bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 hover:transform hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4">
                    <interest.icon className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:text-secondary-500 dark:group-hover:text-secondary-400 transition-colors duration-300" />
                  </div>
                  <h3 className="text-neutral-900 dark:text-white font-semibold mb-2 transition-colors duration-300">{interest.label}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed transition-colors duration-300">{interest.description}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;