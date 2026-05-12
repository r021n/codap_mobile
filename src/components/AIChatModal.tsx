import React, { useState, useEffect, useRef } from 'react';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  storageKey: string;
}

const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose, messages, storageKey }) => {
  const [allMessages, setAllMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load from localStorage or use initial messages
  useEffect(() => {
    const savedChat = localStorage.getItem(storageKey);
    if (savedChat) {
      try {
        setAllMessages(JSON.parse(savedChat));
      } catch (e) {
        setAllMessages(messages);
      }
    } else {
      setAllMessages(messages);
    }
  }, [storageKey, messages]);

  // Save to localStorage whenever messages change
  useEffect(() => {
    if (allMessages.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(allMessages));
    }
  }, [allMessages, storageKey]);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [allMessages, isTyping]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim(),
    };

    const newMessages = [...allMessages, userMessage];
    setAllMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "Terima kasih atas pertanyaannya! Saya sedang menganalisis data Anda. Ini adalah respon otomatis sementara untuk membantu Anda memahami langkah selanjutnya.",
      };
      setAllMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-end justify-end pointer-events-none">
      {/* Overlay to close */}
      <div
        className="absolute inset-0 bg-[#0A110B]/20 backdrop-blur-[2px] pointer-events-auto"
        onClick={onClose}
      ></div>

      <div className="w-[320px] h-full bg-white shadow-[-10px_0_40px_rgba(0,0,0,0.15)] border-l border-[#C6E67D]/30 flex flex-col overflow-hidden animate-slide-right pointer-events-auto relative z-10">
        {/* Header */}
        <div className="px-6 py-6 flex justify-between items-center shrink-0 border-b border-gray-100 bg-[#FDFCF8]/30">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-11 h-11 bg-gradient-to-br from-[#528C46] to-[#C6E67D] rounded-2xl flex items-center justify-center shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
                <span className="material-symbols-outlined text-2xl text-white">
                  smart_toy
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h3 className="font-black text-[15px] text-[#0A110B] tracking-tight">
                Asisten AI
              </h3>
              <p className="text-[10px] font-bold text-[#528C46] uppercase tracking-widest mt-0.5">
                Cerdas & Responsif
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all duration-300 group"
          >
            <span className="material-symbols-outlined text-2xl text-[#6B7280] group-hover:rotate-90 transition-transform">
              close
            </span>
          </button>
        </div>

        {/* Chat Body */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#FDFCF8]/50 scroll-smooth"
        >
          <div className="flex flex-col items-center justify-center py-4 opacity-50">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#528C46]">
              Hari Ini
            </span>
          </div>

          {allMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-auto ${
                  msg.sender === 'user' ? 'bg-[#0A110B]' : 'bg-[#528C46]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px] text-white">
                  {msg.sender === 'user' ? 'person' : 'smart_toy'}
                </span>
              </div>
              <div
                className={`p-3 rounded-2xl shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#528C46] text-white rounded-br-none'
                    : 'bg-white border border-[#C6E67D]/20 rounded-bl-none'
                }`}
              >
                <p
                  className={`text-xs leading-relaxed ${
                    msg.sender === 'user' ? 'font-medium' : 'text-[#0A110B]'
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2 max-w-[85%]">
              <div className="w-7 h-7 rounded-full bg-[#528C46] flex items-center justify-center shrink-0 mt-auto">
                <span className="material-symbols-outlined text-[16px] text-white animate-pulse">
                  smart_toy
                </span>
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-[#C6E67D]/20 flex items-center gap-1">
                <span className="w-1 h-1 bg-[#528C46] rounded-full animate-bounce"></span>
                <span className="w-1 h-1 bg-[#528C46] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1 h-1 bg-[#528C46] rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-[#C6E67D]/20 shrink-0">
          <div className="flex gap-2 items-center bg-[#FDFCF8] border border-[#C6E67D]/30 rounded-2xl p-2 pr-1">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isTyping ? "AI sedang mengetik..." : "Ketik pesan..."}
              className="flex-1 bg-transparent border-none outline-none text-xs px-2 text-[#0A110B] placeholder:text-gray-400"
              disabled={isTyping}
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-white transition-all duration-300 ${
                !inputValue.trim() || isTyping 
                ? 'bg-gray-300 opacity-50 cursor-not-allowed' 
                : 'bg-[#528C46] shadow-sm active:scale-90 hover:bg-[#3d6934]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                send
              </span>
            </button>
          </div>
          <p className="text-[9px] text-center text-gray-400 mt-2 italic">
            AI dapat memberikan jawaban yang tidak akurat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChatModal;
