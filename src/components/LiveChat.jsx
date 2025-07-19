import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Minimize2, Maximize2, Volume2, VolumeX, Settings, Trash2, Copy } from 'lucide-react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    soundEnabled: true,
    autoScroll: true,
    showTimestamps: false
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  const initialMessages = [
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
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
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

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const clearChat = () => {
    setMessages(initialMessages);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    const typingDelay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const botResponse = {
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

  const handleKeyPress = (e) => {
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

  const handleQuickReply = (reply) => {
    setInputValue(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  const getBotResponse = (message) => {
    const responses = {
      greeting: "Hey there! 👋 Great to meet you! I'm here to help you learn more about Augustine and his amazing work.",
      finance: "Augustine has impressive finance experience! He worked as an Equity Research Fellow at BLK Capital Management, where he assessed 10+ public companies through comprehensive equity research and built sector-specific DCF valuation models. He also developed Macro-Arb, a statistical arbitrage engine that achieved +9.2% higher CAGR vs. buy-and-hold using cointegration analysis on global ETFs! His finance background is solid! At BLK Capital, Augustine conducted in-depth equity research and financial modeling, while his Macro-Arb project showcases his quantitative trading skills with sophisticated backtesting and risk management. He combines mathematical rigor with practical market analysis!",
      experience: "Augustine is currently a Software Engineering Fellow at eBay's Pathways Program! He's also worked as an REU ML & Applied Math Intern at Louisiana Tech, IT Support at Grambling State, and Equity Research Fellow at BLK Capital. He combines expertise in AI, data, finance, and education beautifully!",
      journey: "What an impressive journey! Augustine has experience across tech giants like eBay, research institutions like Louisiana Tech (NSF REU), and finance with BLK Capital Management. He's passionate about using technology to solve meaningful problems!",
      projects: "His projects include LokalLearn (an offline tutor system - in progress), Macro-Arb, and a market data microservice.",
      unique:"What makes Augustine truly unique? He's a rare combination of technical excellence and social consciousness! He builds AI tutors for underserved communities, develops quantitative trading systems, AND leads community hackathons. His mathematical background gives him an analytical edge, while his passion for equity drives meaningful impact. Plus, he's fluent in both code and jollof recipes! 😄",
      skills: "He works with Python, JavaScript, PyTorch, and more.",
      contact: "You can reach Augustine at augustinemanu2023@gmail.com.",
      about: "Augustine is a CS student focused on SWE, AI/ML, education, and impact.",
      default: "Please rephrase or ask something else about Augustine."
    };
    message = message.toLowerCase();
    if (message.includes("hello") || message.includes("hi")) return responses.greeting;
    if (message.includes("finance")) return responses.finance;
    if (message.includes("experience")) return responses.experience;
    if (message.includes("project")) return responses.projects;
    if (message.includes("skill")) return responses.skills;
    if (message.includes("contact")) return responses.contact;
    if (message.includes("about")) return responses.about;
    return responses.default;
  };

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    !isOpen ? (
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
  ) : (
    <div className={`fixed bottom-6 right-6 w-96 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 z-50 transition-all duration-500 overflow-hidden ${isMinimized ? 'h-16' : 'max-h-[90vh]'}`}>
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
            <div className="text-xs text-white/90 flex items-center gap-1">
              <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
              Online • Usually replies instantly
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setShowSettings(!showSettings)} className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 text-white" title="Settings">
            <Settings size={16} />
          </button>
          <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200 text-white" title={isMinimized ? "Maximize" : "Minimize"}>
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition-all duration-200 hover:scale-110 text-white border border-red-400" title="Close">
            <X size={20} className="font-bold" />
          </button>
        </div>
      </div>

      {showSettings && !isMinimized && (
        <div className="p-4 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Sound notifications</span>
              <button onClick={() => toggleSetting('soundEnabled')} className={`p-1 rounded transition-colors duration-200 ${settings.soundEnabled ? 'text-primary-600' : 'text-neutral-400'}`}>
                {settings.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Show timestamps</span>
              <input type="checkbox" checked={settings.showTimestamps} onChange={() => toggleSetting('showTimestamps')} className="rounded" />
            </div>
            <button onClick={clearChat} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors duration-200">
              <Trash2 size={14} />
              Clear conversation
            </button>
          </div>
        </div>
      )}

      {!isMinimized && (
        <>
          <div ref={chatContainerRef} className="flex-1 p-4 h-80 overflow-y-auto space-y-4 bg-gradient-to-b from-neutral-50/50 to-white dark:from-neutral-800/50 dark:to-neutral-900">
            {messages.map((message) => (
              <div key={message.id} className={`flex group ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user' ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' : 'bg-gradient-to-r from-tertiary-500 to-warm-500 text-white'}`}>
                    {message.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>

                  <div className={`relative ${message.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${message.sender === 'user' ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-br-md shadow-lg' : 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700 rounded-bl-md shadow-md'}`}>
                      {message.text}
                      <div className={`absolute top-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 ${message.sender === 'user' ? '-left-16' : '-right-16'}`}>
                        <button onClick={() => copyMessage(message.text)} className="p-1 bg-neutral-700 text-white rounded hover:bg-neutral-600 transition-colors duration-200" title="Copy message">
                          <Copy size={12} />
                        </button>
                      </div>
                    </div>
                    {settings.showTimestamps && (
                      <div className={`text-xs text-neutral-500 mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
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
  ));
}

export default LiveChat;