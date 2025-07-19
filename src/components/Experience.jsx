import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const Experience = () => {
  const experiences = [
    {
      title: 'Senior Full-Stack Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      description:
        'Leading development of scalable web applications serving 100K+ users. Architected microservices infrastructure and mentored junior developers.',
      achievements: [
        'Reduced application load time by 40% through optimization',
        'Led team of 5 developers on major product redesign',
        'Implemented CI/CD pipeline reducing deployment time by 60%',
      ],
      technologies: ['React', 'Node.js', 'AWS', 'TypeScript', 'PostgreSQL'],
    },
    {
      title: 'Full-Stack Developer',
      company: 'StartupXYZ',
      location: 'Austin, TX',
      period: '2020 - 2022',
      description:
        'Developed MVP from concept to production launch. Built responsive web applications and RESTful APIs for e-commerce platform.',
      achievements: [
        'Built complete e-commerce platform serving 10K+ customers',
        'Integrated payment systems and third-party APIs',
        'Achieved 99.9% uptime through robust error handling',
      ],
      technologies: ['Vue.js', 'Python', 'Django', 'MongoDB', 'Docker'],
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency Pro',
      location: 'Remote',
      period: '2019 - 2020',
      description:
        'Created responsive websites and web applications for diverse clients. Collaborated with designers to implement pixel-perfect UI/UX.',
      achievements: [
        'Delivered 25+ client projects on time and budget',
        'Improved client satisfaction scores by 30%',
        'Established responsive design standards',
      ],
      technologies: ['JavaScript', 'React', 'SASS', 'Webpack', 'Git'],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Experience
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto transition-colors duration-300">
              My professional journey in software development and the impact I've made
            </p>
          </div>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-green-500"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <AnimatedSection
                key={index}
                animation={index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'}
                delay={index * 200}
              >
                <div
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-800 z-10 transition-colors duration-300"></div>

                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="ml-16 md:ml-0 bg-gray-50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:scale-[1.02]">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                            {exp.title}
                          </h3>
                          <h4 className="text-blue-600 dark:text-blue-400 font-semibold mb-2 transition-colors duration-300">
                            {exp.company}
                          </h4>
                        </div>
                        <div className="flex flex-col sm:items-end text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                          <div className="flex items-center gap-1 mb-1">
                            <Calendar size={14} />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
                        {exp.description}
                      </p>

                      <div className="mb-6">
                        <h5 className="text-gray-900 dark:text-white font-semibold mb-3 transition-colors duration-300">
                          Key Achievements:
                        </h5>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className="text-gray-600 dark:text-gray-300 flex items-start gap-2 transition-colors duration-300"
                            >
                              <span className="text-green-500 mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block flex-1"></div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
