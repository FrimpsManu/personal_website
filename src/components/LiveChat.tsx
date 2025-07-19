import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Minimize2, Maximize2, Volume2, VolumeX, Settings, Trash2, Copy, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  typing?: boolean;
  reactions?: ('like' | 'dislike')[];
}

interface ChatSettings {
  soundEnabled: boolean;
  autoScroll: boolean;
  showTimestamps: boolean;
}

const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    soundEnabled: true,
    autoScroll: true,
    showTimestamps: false
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const initialMessages: Message[] = [
    {
      id: 1,
      text: "👋 Hi! I'm Augustine's AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: 2,
      text: "You can ask me about Augustine's experience, projects, skills, or how to get in touch! I'm here 24/7 to help.",
      sender: 'bot',
      timestamp: new Date()
    }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages(initialMessages);
    }
  }, [isOpen]);

  useEffect(() => {
    if (settings.autoScroll) {
      scrollToBottom();
    }
  }, [messages, settings.autoScroll]);

  useEffect(() => {
    if (!isOpen && messages.length > initialMessages.length) {
      setUnreadCount(prev => prev + 1);
    }
  }, [messages.length, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const playNotificationSound = () => {
    if (settings.soundEnabled) {
      // Create a simple notification sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    const responses = {
      greeting: [
        "Hey there! 👋 Great to meet you! I'm here to help you learn more about Augustine and his amazing work.",
        "Hello! 🌟 Welcome! I'm Augustine's AI assistant. What would you like to know about his journey?",
        "Hi! 😊 Thanks for stopping by! I'm excited to tell you about Augustine's projects and experience."
      ],
      experience: [
        "Augustine is currently a Software Engineering Fellow at eBay's Pathways Program! He's also worked as an REU ML & Applied Math Intern at Louisiana Tech, IT Support at Grambling State, and Equity Research Fellow at BLK Capital. He combines expertise in AI, data, finance, and education beautifully!",
        "What an impressive journey! Augustine has experience across tech giants like eBay, research institutions like Louisiana Tech (NSF REU), and finance with BLK Capital Management. He's passionate about using technology to solve meaningful problems!"
      ],
      finance: [
        "Augustine has impressive finance experience! He worked as an Equity Research Fellow at BLK Capital Management, where he assessed 10+ public companies through comprehensive equity research and built sector-specific DCF valuation models. He also developed Macro-Arb, a statistical arbitrage engine that achieved +9.2% higher CAGR vs. buy-and-hold using cointegration analysis on global ETFs!",
        "His finance background is solid! At BLK Capital, Augustine conducted in-depth equity research and financial modeling, while his Macro-Arb project showcases his quantitative trading skills with sophisticated backtesting and risk management. He combines mathematical rigor with practical market analysis!"
      ],
      projects: [
        "Augustine's projects are incredible! He built LokalLearn (an offline AI tutor for underserved communities), Macro-Arb (a statistical arbitrage engine), real-time market data microservices, and Zamani (a food reservation platform). Each project shows his commitment to impactful technology!",
        "His project portfolio is amazing! From AI tutoring systems to quantitative trading engines, Augustine builds solutions that matter. Check out the Projects section for detailed case studies and live demos!"
      ],
      skills: [
        "Augustine is a true polymath! He specializes in AI/ML (TensorFlow, PyTorch), quantitative finance, full-stack development (React, Python, FastAPI), and data science. His mathematical background gives him a unique edge in problem-solving!",
        "His technical skills are impressive! Python, JavaScript, AI/ML frameworks, cloud technologies, financial modeling - Augustine combines deep technical knowledge with mathematical rigor to build scalable solutions."
      ],
      contact: [
        "Ready to connect? You can reach Augustine at augustinemanu2023@gmail.com or use the contact form on this website. He's always excited to discuss new opportunities and meaningful projects!",
        "Let's make it happen! 🤝 Augustine is passionate about collaboration and using tech for good. Reach out via email or the contact form - he'd love to hear from you!"
      ],
      about: [
        "Augustine is a Computer Science, Math & Business student who believes technology should empower everyone! 🌍 Beyond coding, he loves soccer, community advocacy, and lifelong learning. He's all about turning big ideas into real-world impact!",
        "What a fascinating person! Augustine combines technical excellence with social consciousness. He's not just building code - he's building a better future through technology, education, and community engagement."
      ],
      unique: [
        "What makes Augustine truly unique? He's a rare combination of technical excellence and social consciousness! He builds AI tutors for underserved communities, develops quantitative trading systems, AND leads community hackathons. His mathematical background gives him an analytical edge, while his passion for equity drives meaningful impact. Plus, he's fluent in both code and jollof recipes! 😄",
        "Augustine stands out because he doesn't just code - he codes with purpose! From offline AI tutors for low-connectivity regions to statistical arbitrage engines, every project tackles real problems. His unique blend of CS, Math, and Business studies, combined with experience across eBay, research labs, and finance, creates a perspective that's both technically rigorous and socially aware. He's building the future, one meaningful solution at a time!"
      ],
      education: [
        "Augustine is pursuing a Bachelor of Science in Computer Science with a Mathematics minor at Grambling State University! 🎓 He's maintaining a stellar 3.96/4.0 GPA and has made the President's List 4 times. His academic excellence reflects his dedication to mastering both theoretical foundations and practical applications!",
        "His educational journey is impressive! At Grambling State, Augustine combines Computer Science with Mathematics and Business Management, creating a unique interdisciplinary foundation. His academic achievements (Magna Cum Laude, 4x President's List) demonstrate his commitment to excellence in learning!"
      ],
      hackathons: [
        "Augustine is a hackathon champion! He won first place at the Grambling State University Hackathon for building a real-time language translation app with 98% accuracy. But he's not just a participant - he also co-organized the Notion x Grambling Hackathon with 60+ participants, securing $3,000+ in sponsorship and mentoring teams to launch 5 MVPs!",
        "His hackathon experience is outstanding! From winning competitions to organizing major events, Augustine excels at rapid innovation and community building. His leadership in organizing hackathons shows his commitment to fostering the next generation of developers!"
      ],
      ai: [
        "Augustine's AI expertise is remarkable! He built LokalLearn, an offline AI tutor using Whisper STT, local LLMs, and TTS for underserved communities. He's proficient in TensorFlow, PyTorch, deep learning, neural networks, and has hands-on experience with OpenAI APIs. His AI work focuses on solving real-world problems with accessible technology!",
        "His AI/ML skills are cutting-edge! From building offline AI tutors to implementing transformer models and computer vision systems, Augustine combines theoretical knowledge with practical applications. He's particularly passionate about making AI accessible and beneficial for underserved communities!"
      ],
      leadership: [
        "Augustine is a natural leader! He co-organized the Notion x Grambling Hackathon, leading a 10+ member team and mentoring 60+ participants. His leadership style combines technical expertise with genuine care for community development and empowering others to succeed!",
        "His leadership experience is inspiring! From organizing major hackathons to mentoring fellow students, Augustine leads by example. He believes in lifting others up and creating opportunities for the next generation of technologists!"
      ]
    };

    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    }
    if (message.includes('unique') || message.includes('special') || message.includes('different') || message.includes('stand out')) {
      return responses.unique[Math.floor(Math.random() * responses.unique.length)];
    }
    if (message.includes('finance') || message.includes('trading') || message.includes('equity') || message.includes('investment') || message.includes('capital')) {
      return responses.finance[Math.floor(Math.random() * responses.finance.length)];
    }
    if (message.includes('experience') || message.includes('work') || message.includes('job')) {
      return responses.experience[Math.floor(Math.random() * responses.experience.length)];
    }
    if (message.includes('project') || message.includes('portfolio') || message.includes('build')) {
      return responses.projects[Math.floor(Math.random() * responses.projects.length)];
    }
    if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
      return responses.skills[Math.floor(Math.random() * responses.skills.length)];
    }
    if (message.includes('education') || message.includes('school') || message.includes('university') || message.includes('degree') || message.includes('gpa')) {
      return responses.education[Math.floor(Math.random() * responses.education.length)];
    }
    if (message.includes('hackathon') || message.includes('competition') || message.includes('contest')) {
      return responses.hackathons[Math.floor(Math.random() * responses.hackathons.length)];
    }
    if (message.includes('ai') || message.includes('artificial intelligence') || message.includes('machine learning') || message.includes('ml') || message.includes('deep learning')) {
      return responses.ai[Math.floor(Math.random() * responses.ai.length)];
    }
    if (message.includes('leadership') || message.includes('leader') || message.includes('organize') || message.includes('mentor')) {
      return responses.leadership[Math.floor(Math.random() * responses.leadership.length)];
    }
    if (message.includes('contact') || message.includes('hire') || message.includes('email')) {
      return responses.contact[Math.floor(Math.random() * responses.contact.length)];
    }
    if (message.includes('about') || message.includes('background') || message.includes('story')) {
      return responses.about[Math.floor(Math.random() * responses.about.length)];
    }

    const defaultResponses = [
      "That's a fantastic question! For detailed information, I'd recommend checking out the relevant sections of the portfolio or reaching out to Augustine directly at augustinemanu2023@gmail.com.",
      "Great question! Augustine would love to discuss this with you personally. Feel free to contact him directly or explore the portfolio sections for more details!",
      "Interesting! Augustine is always excited to dive deep into technical discussions. Why not reach out to him directly? He'd love to chat about this topic!"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay with more realistic timing
    const typingDelay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      playNotificationSound();
    }, typingDelay);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickReplies = [
    "Tell me about Augustine's background ",
    "What AI/ML projects has he built? ",
    "What's his experience in finance? ",
    "How can I contact him? ",
    "Show me his technical skills ",
    "What makes him unique? "
  ];

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const clearChat = () => {
    setMessages(initialMessages);
  };

  const toggleSetting = (key: keyof ChatSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary-600 via-tertiary-600 to-secondary-600 hover:from-primary-700 hover:via-tertiary-700 hover:to-secondary-700 text-white rounded-full shadow-2xl hover:shadow-primary-500/25 transition-all duration-300 flex items-center justify-center z-50 hover:scale-110 animate-gradient-x bg-[length:200%_200%] group"
        aria-label="Open chat"
      >
        <MessageCircle size={28} className="group-hover:scale-110 transition-transform duration-300" />
        {unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-warm-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/20 via-tertiary-500/20 to-secondary-500/20 animate-ping"></div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-96 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 z-50 transition-all duration-500 overflow-hidden ${
      isMinimized ? 'h-16' : 'max-h-[90vh]'
    }`}>
      {/* Enhanced Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-600 via-tertiary-600 to-secondary-600 text-white rounded-t-2xl animate-gradient-x bg-[length:200%_200%]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <h3 className="font-bold text-sm">Augustine's AI Assistant</h3>
            <p className="text-xs text-white/90 flex items-center gap-1">
              <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
              Online • Usually replies instantly
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 text-white"
            title="Settings"
          >
            <Settings size={16} />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 text-white"
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition-all duration-200 hover:scale-110 text-white border border-red-400"
            title="Close"
          >
            <X size={20} className="font-bold" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && !isMinimized && (
        <div className="p-4 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Sound notifications</span>
              <button
                onClick={() => toggleSetting('soundEnabled')}
                className={`p-1 rounded transition-colors duration-200 ${
                  settings.soundEnabled ? 'text-primary-600' : 'text-neutral-400'
                }`}
              >
                {settings.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Show timestamps</span>
              <input
                type="checkbox"
                checked={settings.showTimestamps}
                onChange={() => toggleSetting('showTimestamps')}
                className="rounded"
              />
            </div>
            <button
              onClick={clearChat}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors duration-200"
            >
              <Trash2 size={14} />
              Clear conversation
            </button>
          </div>
        </div>
      )}

      {!isMinimized && (
        <>
          {/* Enhanced Messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 p-4 h-80 overflow-y-auto space-y-4 bg-gradient-to-b from-neutral-50/50 to-white dark:from-neutral-800/50 dark:to-neutral-900"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex group ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-[85%] ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' 
                      : 'bg-gradient-to-r from-tertiary-500 to-warm-500 text-white'
                  }`}>
                    {message.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  
                  <div className={`relative ${
                    message.sender === 'user' ? 'items-end' : 'items-start'
                  }`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-br-md shadow-lg'
                        : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 rounded-bl-md shadow-md'
                    }`}>
                      {message.text}
                      
                      {/* Message actions */}
                      <div className={`absolute top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 ${
                        message.sender === 'user' ? '-left-16' : '-right-16'
                      }`}>
                        <button
                          onClick={() => copyMessage(message.text)}
                          className="p-1 bg-neutral-700 text-white rounded hover:bg-neutral-600 transition-colors duration-200"
                          title="Copy message"
                        >
                          <Copy size={12} />
                        </button>
                      </div>
                    </div>
                    
                    {settings.showTimestamps && (
                      <div className={`text-xs text-neutral-500 mt-1 ${
                        message.sender === 'user' ? 'text-right' : 'text-left'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-tertiary-500 to-warm-500 text-white rounded-full flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white dark:bg-neutral-800 px-4 py-3 rounded-2xl rounded-bl-md border border-neutral-200 dark:border-neutral-700 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-tertiary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-secondary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Quick Replies */}
          {messages.length <= 2 && (
            <div className="px-4 pb-3">
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Quick questions:</div>
              <div className="flex flex-wrap gap-2">
                {quickReplies.slice(0, 3).map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-2 bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 hover:from-primary-50 hover:to-secondary-50 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20 text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg text-xs transition-all duration-200 hover:scale-105"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Input */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
            <div className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Augustine..."
                className="flex-1 px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-xl text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 disabled:from-neutral-400 disabled:to-neutral-500 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-primary-500/25"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LiveChat;