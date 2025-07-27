import React, { useState, useMemo } from 'react';
import { Github, ExternalLink, X, Zap } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import ProjectFilter from './ProjectFilter';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const projects = [
    {
      id: 1,
      title: 'LokalLearn – Offline AI Tutor',
      description: 'Offline AI tutor for low-connectivity regions, integrating Whisper STT, local LLM, and TTS for accessible STEM education.',
      longDescription: 'Led the development of an offline AI tutor designed for low-connectivity regions by integrating Whisper STT, a local LLM, and TTS into a real-time voice interaction pipeline, enabling accessible STEM education without internet or cloud dependency. Optimized end-to-end AI reasoning on CPU-only devices by caching model weights and minimizing I/O latency using Python and Transformers, achieving sub-5s response time in constrained environments—ideal for edge deployment. Designed modular architecture with speech, language, and audio modules by orchestrating components in a CLI interface using PyTorch and Hugging Face, laying the foundation for future expansion into multilingual support and on-device learning.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Python', 'Whisper', 'Transformers', 'PyTorch', 'Hugging Face', 'pyttsx3'],
      githubUrl: 'https://github.com/FrimpsManu/lokallearn-offline-ai-tutor',
      demoUrl: 'https://github.com/FrimpsManu/lokallearn-offline-ai-tutor',
      featured: true,
      category: 'AI/ML'
    },
    {
      id: 2,
      title: 'Macro – Arb: Global Statistical Arbitrage Engine',
      description: 'Macro-driven trading strategy using 240+ monthly observations to generate mean-reversion signals across global ETFs.',
      longDescription: 'Built a macro-driven trading strategy using 240+ monthly observations to generate mean-reversion signals across global ETFs (e.g., EWG), applying cointegration (Engle-Granger) on FRED macro data and Yahoo Finance prices. Engineered a backtesting pipeline with z-score filtering, PCA signal refinement, and performance evaluation, achieving +9.2% higher CAGR vs. buy-and-hold while quantifying Sharpe, drawdowns, and statistical robustness.',
      image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Python', 'Statsmodels', 'Pandas', 'Matplotlib', 'NumPy', 'Scikit-learn'],
      githubUrl: 'https://github.com/FrimpsManu/macro-arb-engine',
      demoUrl: 'https://github.com/FrimpsManu/macro-arb-engine',
      featured: true,
      category: 'Quantitative Finance'
    },
    {
      id: 3,
      title: 'Market Data Microservice',
      description: 'Real-time microservice ingesting 1M+ financial market data points daily via Kafka with <10ms latency.',
      longDescription: 'Developed a real-time microservice that ingested and streamed over 1M+ financial market data points daily via Kafka, computing 5-point moving averages with <10ms latency...',
      image: 'https://images.pexels.com/photos/6802049/pexels-photo-6802049.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['FastAPI', 'Kafka', 'Celery', 'PostgreSQL', 'Redis', 'Docker', 'Python'],
      githubUrl: 'https://github.com/FrimpsManu/market-data-service',
      demoUrl: 'https://github.com/FrimpsManu/market-data-service',
      featured: true,
      category: 'Backend'
    },
    {
      id: 4,
      title: 'Zamani - Food Reservation & Accessibility Platform',
      description: 'Modern, inclusive food reservation web application designed to reduce food waste and improve access to fresh meals.',
      longDescription: 'Zamani is a comprehensive food reservation platform built with React and Supabase that connects food providers with users in need...',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      Team: 3,
      technologies: ['React', 'Supabase', 'Tailwind CSS', 'OpenAI API', 'PostgreSQL', 'Realtime'],
      githubUrl: 'https://github.com/FrimpsManu/Amazon-x-CodePath-Challenge',
      demoUrl: 'https://zamanifoodsafety.netlify.app/',
      featured: false,
      category: 'Full-Stack'
    },
    {
      id: 5,
      title: 'EchoMind AI',
      description: 'Modern, feature-rich AI chat assistant built with React, TypeScript, and Supabase...',
      longDescription: 'EchoMind AI is a sophisticated AI chat assistant that provides an intuitive interface for intelligent conversations...',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'TypeScript', 'Supabase', 'OpenAI API', 'pgvector', 'Tailwind CSS'],
      githubUrl: 'https://github.com/FrimpsManu/EchoMind-AI',
      demoUrl: 'https://echomindai.netlify.app/',
      featured: false,
      category: 'AI/ML'
    },
    {
      id: 6,
      title: 'Snake Game',
      description: 'Classic Snake game implemented in both React and Python...',
      longDescription: 'A modern implementation of the classic Snake game available in both web and desktop versions...',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Python', 'Pygame', 'Lucide React'],
      githubUrl: 'https://github.com/FrimpsManu/snake-game',
      demoUrl: 'https://celadon-twilight-2ad53e.netlify.app/',
      featured: false,
      category: 'Frontend'
    }
  ];

  const categories = ['AI/ML', 'Quantitative Finance', 'Backend', 'Full-Stack', 'Frontend'];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === '' || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  const ProjectCard = ({ project, featured = false }) => (
    <div
      className={`group relative bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer ${
        featured ? 'lg:col-span-2' : ''
      }`}
      onClick={() => setSelectedProject(project)}
    >
      {featured && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 bg-yellow-500/90 text-black text-sm font-semibold rounded-full">
          <Zap size={14} />
          Featured
        </div>
      )}

      <div className="aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed transition-colors duration-300">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium transition-colors duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors duration-300"
          >
            <Github size={16} />
            <span className="text-sm">Code</span>
          </a>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
          >
            <ExternalLink size={16} />
            <span className="text-sm">Demo</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto"></div>
            <p className="text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto">
              A showcase of my recent work and the technologies I'm passionate about
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <ProjectFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />
        </AnimatedSection>

        {featuredProjects.length > 0 && (
          <AnimatedSection delay={400}>
            <div className="grid lg:grid-cols-4 gap-8 mb-16">
              {featuredProjects.map((project, index) => (
                <div key={project.id} style={{ animationDelay: `${index * 100}ms` }}>
                  <ProjectCard project={project} featured />
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}

        {otherProjects.length > 0 && (
          <AnimatedSection delay={600}>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Other Projects</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherProjects.map((project, index) => (
                  <div key={project.id} style={{ animationDelay: `${index * 100}ms` }}>
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}

        {filteredProjects.length === 0 && (
          <AnimatedSection>
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No projects found matching your criteria. Try adjusting your search or filter.
              </p>
            </div>
          </AnimatedSection>
        )}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-white rounded-full"
              >
                <X size={20} />
              </button>
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-64 md:h-80 object-cover" />
            </div>
            <div className="p-8">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{selectedProject.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">{selectedProject.longDescription}</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {selectedProject.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-6">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg"
                >
                  <Github size={20} />
                  <span>View Code</span>
                </a>
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  <ExternalLink size={20} />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
