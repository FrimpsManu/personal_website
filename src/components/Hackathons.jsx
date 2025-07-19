import React from 'react';
import { Clock, Wrench } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Hackathons = () => {
  return (
    <section id="hackathons" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Hackathon Achievements</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-6"></div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mb-8">
              <Clock className="w-12 h-12 text-white" />
            </div>

            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Coming Soon
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-lg text-center max-w-2xl mb-8">
              Exciting hackathon achievements and competitive programming experiences will be showcased here soon. 
              Stay tuned for updates on my latest competitions and wins!
            </p>

            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Wrench className="w-5 h-5" />
              <span className="text-sm font-medium">Under Development</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hackathons;
