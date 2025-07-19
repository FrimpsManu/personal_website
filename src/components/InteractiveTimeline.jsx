import React, { useState } from 'react';
import { Calendar, MapPin, Award, Code, TrendingUp, Users, Trophy } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const InteractiveTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState('all');

  const timelineEvents = [
    {
      id: 1,
      year: 'May 2025 - Present',
      title: 'REU Machine Learning & Applied Math Intern',
      company: 'Louisiana Tech University',
      location: 'Ruston, LA',
      type: 'work',
      description: 'Developed an ℓ₁ trend filtering model in Python and PyTorch to extract structural signals from S&P 500 data, outperforming the HP filter by 35% in volatility shift detection accuracy.',
      highlights: [
        'Improved anomaly detection precision by 40% and reduced preprocessing time by 30%',
        'Built scalable optimization pipeline using Python, NumPy, PyTorch, and CVXPY'
      ],
      technologies: ['Python', 'PyTorch', 'CVXPY', 'Jupyter'],
      icon: Code,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      year: 'Nov 2024',
      title: 'Lead Organizer',
      company: 'Notion x Grambling Hackathon',
      location: 'Grambling, LA',
      type: 'achievement',
      description: 'Co-organized the Notion x Grambling hackathon with the Notion Campus Ambassador Leader (Andrew Emeghebo), bringing together 60+ students to innovate on real-world problems using Notions platform.',
      highlights: [
        'Led a 10+ member organizing team',
        'Secured $3,000+ in sponsorship',
        'Mentored 60+ participants',
        'Launched 5 MVPs',
        'Handled logistics, workshops, and judging'
      ],
      technologies: ['Event Management', 'Team Leadership', 'Sponsorship', 'Mentoring', 'Project Coordination'],
      icon: Trophy,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 3,
      year: 'Sept 2024',
      title: 'Hackathon Winner',
      company: 'Grambling State University Hackathon',
      location: 'Grambling, LA',
      type: 'achievement',
      description: 'First place for building a real-time language translation app "Edulingo" across 3 languages',
      highlights: [
        '98% translation accuracy using OpenAI API',
        'Built full-stack solution with Flask, JS, and TTS'
      ],
      technologies: ['Python(Flask)', 'JavaScript', 'Web Speech API', 'OpenAI API', 'HTML/CSS'],
      icon: Award,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 4,
      year: 'Jan 2024 - Present',
      title: 'IT Support Assistant',
      company: 'Grambling State University',
      location: 'Grambling, LA',
      type: 'work',
      description: 'Delivered technical support for 50+ campus devices, streamlining OS and software deployments to improve setup speed by 90% and reduce issue resolution time by 85%.',
      highlights: [
        'Provided tech support for 50+ devices',
        'Improved setup speed by 90%',
        'Reduced resolution time by 85%'
      ],
      technologies: ['Windows', 'macOS', 'Active Directory'],
      icon: Code,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 5,
      year: 'August 2023 - May 2027',
      title: 'Bachelor of Science in Computer Science, Business Management & Mathematics',
      company: 'Grambling State University',
      location: 'Grambling, LA',
      type: 'education',
      description: 'CS education focused on software engineering, algorithms, and DS.',
      highlights: [
        'Magna Cum Laude, 3.96/4.0 GPA',
        '4x President List',
        'Led campus event system project',
        'Capstone: "Coming Soon"'
      ],
      technologies: ['Python', 'SQL', 'JavaScript', 'Java', 'Git'],
      icon: Award,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 6,
      year: 'Feb 2025 – May 2025',
      title: 'Equity Research Fellow',
      company: 'BLK Capital Management',
      location: 'Remote',
      type: 'work',
      description: 'Conducted comprehensive equity research and financial analysis for public companies, building sophisticated valuation models and investment theses.',
      highlights: [
        'Analyzed 10+ companies',
        'Built DCF valuation models',
        'Created investment theses and stock pitches'
      ],
      technologies: ['Python', 'Excel', 'Financial Modeling', 'DCF Analysis', 'Equity Research'],
      icon: Code,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const filteredEvents = filter === 'all'
    ? timelineEvents
    : timelineEvents.filter(event => event.type === filter);

  return (
    <section id="timeline" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Professional Journey</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
              An interactive timeline showcasing my career progression, achievements, and continuous learning
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-1 flex gap-1">
              {['all', 'work', 'education', 'achievement'].map((key) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                    filter === key
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-green-500"></div>

          <div className="space-y-12">
            {filteredEvents.map((event, index) => {
              const Icon = event.icon;
              return (
                <AnimatedSection
                  key={event.id}
                  animation={index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight'}
                  delay={index * 100}
                >
                  <div className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 z-10">
                      <div className={`w-full h-full rounded-full bg-gradient-to-r ${event.color}`}></div>
                    </div>

                    <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div 
                        className="ml-16 md:ml-0 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${event.color} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                                {event.year}
                              </span>
                              <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400">
                                {event.type}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{event.title}</h3>
                            <h4 className="text-blue-600 dark:text-blue-400 font-semibold mb-2">{event.company}</h4>
                            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-3">
                              <MapPin size={14} />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>

                        <div className="space-y-2 mb-4">
                          {event.highlights.slice(0, 2).map((h, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <span className="text-green-500 mt-1 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                              {h}
                            </div>
                          ))}
                          {event.highlights.length > 2 && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(event);
                              }}
                              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
                            >
                              +{event.highlights.length - 2} more highlights
                            </button>
                          )}
                        </div>

                        {event.technologies && (
                          <div className="flex flex-wrap gap-2">
                            {event.technologies.slice(0, 4).map((tech) => (
                              <span key={tech} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                                {tech}
                              </span>
                            ))}
                            {event.technologies.length > 4 && (
                              <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                                +{event.technologies.length - 4} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="hidden md:block flex-1"></div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${selectedEvent.color} flex items-center justify-center`}>
                  <selectedEvent.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedEvent.title}</h3>
                  <h4 className="text-blue-600 dark:text-blue-400 font-semibold mb-2">{selectedEvent.company}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{selectedEvent.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  ×
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedEvent.description}</p>

              <div className="mb-6">
                <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Highlights:</h5>
                <div className="space-y-3">
                  {selectedEvent.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="text-green-500 mt-1 w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                      <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedEvent.technologies && (
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Technologies Used:</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default InteractiveTimeline;
