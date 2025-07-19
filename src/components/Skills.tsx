import React from 'react';
import AnimatedSection from './AnimatedSection';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'HTML', level: 90 },
        { name: 'React/Next.js', level: 60 },
        { name: 'JavaScript', level: 60 },
        { name: 'Tailwind CSS', level: 80 },
        { name: 'Vue.js', level: 50 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'FastAPI', level: 80 },
        { name: 'Django', level: 65 },
        { name: 'PostgreSQL', level: 65 },
        { name: 'Node.js', level: 50 },
        { name: 'MongoDB', level: 50 },
      ],
    },
    {
      title: 'DevOps & Tools',
      skills: [
        { name: 'Docker', level: 85 },
        { name: 'AWS/Cloud', level: 80 },
        { name: 'Git', level: 90 },
        { name: 'CI/CD', level: 75 },
      ],
    },
    {
      title: 'AI/ML',
      skills: [
        { name: 'TensorFlow', level: 85 },
        { name: 'PyTorch', level: 75 },
        { name: 'SciPy', level: 75 },
        {name: 'Seaborn', level: 70},
        { name: 'Pandas', level: 80 },
        { name: 'NumPy', level: 80 },
        { name: 'Matplotlib', level: 80 },
        { name: 'Scikit-learn', level: 80 },
        { name: 'Keras', level: 75 },
        { name: 'OpenAI APIs', level: 90 },
      ],
    },
    {
      title: 'Deep Learning & Neural Networks',
      skills: [
        { name: 'Generative AI', level: 70 },
        { name: 'Natural Language Processing (NLP)', level: 75 },
        { name: 'Long Short-Term Memory (LSTM)', level: 75 },
        { name: 'Convolutional Neural Networks (CNNs)', level: 75 },
        { name: 'Recurrent Neural Networks (RNNs)', level: 70 },
        { name: 'Transformer Models', level: 65 },
        { name: 'Computer Vision', level: 70 }
      ],
    },
    {
      title: 'Quant Trade/Research',
      skills: [
        { name: 'Algorithmic Trading', level: 85 },
        { name: 'Financial Modeling', level: 70 },
        { name: 'Risk Management', level: 75 },
        { name: 'Market Analysis', level: 90 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">Skills & Expertise</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto transition-colors duration-300">
              A comprehensive overview of my technical skills and proficiency levels
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {skillCategories.map((category, index) => (
            <AnimatedSection key={category.title} animation="scaleIn" delay={index * 200}>
              <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:border-blue-500/30 transition-all duration-300 h-full">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center transition-colors duration-300">
                  {category.title}
                </h3>
                
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors duration-300">{skill.name}</span>
                        <span className="text-blue-600 dark:text-blue-400 text-sm transition-colors duration-300">{skill.level}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden transition-colors duration-300">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000 ease-out transform origin-left"
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${(index * 4 + skillIndex) * 200}ms`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Additional technical competencies */}
        <AnimatedSection delay={600}>
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 transition-colors duration-300">Other Technologies</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Celery', 'Redis', 'Kubernetes', 'JIRA', 'Cirq',
                'Figma', 'Adobe Creative Suite', 'Linux',
                'Bloomberg Terminal', 'QuantLib'
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200 dark:border-gray-600 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Skills;