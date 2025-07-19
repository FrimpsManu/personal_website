import React from 'react';
import { Code2, Database, Cloud, Brain, TrendingUp, Zap, Globe } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const TechStack: React.FC = () => {
  const techCategories = [
    {
      icon: Code2,
      title: 'Frontend Excellence',
      color: 'from-blue-500 to-cyan-500',
      technologies: [
        { name: 'React 18'},
        { name: 'Next.js 14'},
        { name: 'JavaScript' },
        { name: 'HTML'},
        { name: 'Tailwind CSS' },
        { name: 'Framer Motion'}
      ]
    },
    {
      icon: Database,
      title: 'Backend & Database',
      color: 'from-green-500 to-emerald-500',
      technologies: [
        { name: 'Node.js' },
        { name: 'Python'},
        { name: 'PostgreSQL'},
        { name: 'Redis' },
        { name: 'GraphQL'},
        { name: 'Prisma'}
      ]
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      color: 'from-purple-500 to-pink-500',
      technologies: [
        { name: 'AWS'},
        { name: 'Docker' },
        { name: 'Kubernetes' },
        { name: 'CI/CD'}
      ]
    },
    {
      icon: Brain,
      title: 'AI/ML & Data Science',
      color: 'from-orange-500 to-red-500',
      technologies: [
        { name: 'TensorFlow' },
        { name: 'PyTorch'},
        { name: 'OpenAI APIs'},
        { name: 'Pandas'},
        { name: 'Scikit-learn'},
        { name: 'Jupyter'}
      ]
    },
    {
      icon: TrendingUp,
      title: 'Quantitative Finance',
      color: 'from-yellow-500 to-orange-500',
      technologies: [
        { name: 'Algorithmic Trading'},
        { name: 'Risk Management' },
        { name: 'Financial Modeling'},
        { name: 'Bloomberg Terminal'},
        { name: 'R/MATLAB' }
      ]
    },
    {
      icon: Zap,
      title: 'Security & Performance',
      color: 'from-indigo-500 to-purple-500',
      technologies: [
        { name: 'OAuth/JWT' },
        { name: 'Web Security'},
        { name: 'Performance Optimization'},
        { name: 'Penetration Testing'},
        { name: 'GDPR Compliance'}
      ]
    }
  ];

  return (
    <section id="tech-stack" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Technical Expertise</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
              Deep technical knowledge across the full stack with specialized expertise in quantitative finance and AI/ML
            </p>
          </div>
        </AnimatedSection>

        {/* Tech Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {techCategories.map((category, index) => (
            <AnimatedSection key={category.title} delay={index * 100}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{category.title}</h3>
                
                <div className="space-y-3">
                  {category.technologies.map((tech) => (
                    <div key={tech.name} className="flex items-center justify-between">
                      <div>
                        <span className="text-gray-900 dark:text-white font-medium">{tech.name}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            tech.expertise === 'Expert' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            tech.expertise === 'Advanced' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {tech.expertise}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{tech.years}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechStack;