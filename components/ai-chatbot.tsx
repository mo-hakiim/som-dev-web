'use client';

import { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Minimize2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickReplies = [
  'What services do you offer?',
  'How can I get a quote?',
  'Tell me about your process',
  'View recent projects',
];

const botResponses: Record<string, string> = {
  services:
    'We offer a comprehensive range of technology services including Web Development, AI/ML Integration, Cloud Solutions, Mobile App Development, Cybersecurity, and Digital Transformation consulting. Would you like to know more about any specific service?',
  quote:
    'Getting a quote is easy! You can fill out our contact form at /contact or email us directly at contact@somdevsolutions.com. We typically respond within 24 hours with a detailed proposal tailored to your needs.',
  process:
    'Our development process follows four key phases: 1) Discovery - Understanding your needs, 2) Strategy - Creating a roadmap, 3) Development - Building with agile methodology, 4) Launch - Deploy and support. We maintain transparent communication throughout.',
  projects:
    "We've completed 150+ projects across various industries including FinTech, Healthcare, E-commerce, and SaaS. Some highlights include a real-time trading dashboard, AI-powered healthcare platform, and enterprise e-commerce solutions. Visit our /projects page to see our portfolio!",
  default:
    "Thanks for your message! I'm here to help you learn about Somdev Solutions. You can ask me about our services, pricing, process, or recent projects. For specific inquiries, feel free to contact our team directly.",
};

function getResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
    return botResponses.services;
  }
  if (
    lowerMessage.includes('quote') ||
    lowerMessage.includes('price') ||
    lowerMessage.includes('cost')
  ) {
    return botResponses.quote;
  }
  if (
    lowerMessage.includes('process') ||
    lowerMessage.includes('work') ||
    lowerMessage.includes('how')
  ) {
    return botResponses.process;
  }
  if (
    lowerMessage.includes('project') ||
    lowerMessage.includes('portfolio') ||
    lowerMessage.includes('work')
  ) {
    return botResponses.projects;
  }
  return botResponses.default;
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hi there! 👋 I'm the Somdev Solutions assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1000)
    );

    // TODO: INTEGRATION POINT
    // Replace the local 'getResponse' logic below with your actual API call.
    // Example:
    // const response = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: messageText }) });
    // const data = await response.json();

    // For now, using the clean local logic:
    const response = getResponse(messageText);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center group',
          isOpen && !isMinimized && 'scale-0 opacity-0'
        )}
        aria-label='Open chat'
      >
        <MessageCircle className='w-6 h-6' />
        <span className='absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse' />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          'fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] transition-all duration-300 origin-bottom-right',
          isOpen
            ? 'scale-100 opacity-100'
            : 'scale-0 opacity-0 pointer-events-none',
          isMinimized && 'h-14'
        )}
      >
        <div className='glass-strong rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[600px] max-h-[calc(100vh-6rem)]'>
          {/* Header */}
          <div className='bg-primary/10 p-4 flex items-center justify-between border-b border-border'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center'>
                <Sparkles className='w-5 h-5 text-primary' />
              </div>
              <div>
                <h3 className='font-semibold text-foreground text-sm'>
                  Somdev Assistant
                </h3>
                <p className='text-xs text-muted-foreground'>
                  Online • Usually replies instantly
                </p>
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className='p-2 hover:bg-secondary/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground'
                aria-label='Minimize chat'
              >
                <Minimize2 className='w-4 h-4' />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className='p-2 hover:bg-secondary/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground'
                aria-label='Close chat'
              >
                <X className='w-4 h-4' />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex gap-3',
                      message.role === 'user' && 'flex-row-reverse'
                    )}
                  >
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                        message.role === 'assistant'
                          ? 'bg-primary/20'
                          : 'bg-secondary'
                      )}
                    >
                      {message.role === 'assistant' ? (
                        <Bot className='w-4 h-4 text-primary' />
                      ) : (
                        <User className='w-4 h-4 text-foreground' />
                      )}
                    </div>
                    <div
                      className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-3',
                        message.role === 'assistant'
                          ? 'bg-secondary/50 rounded-tl-none'
                          : 'bg-primary text-primary-foreground rounded-tr-none'
                      )}
                    >
                      <p className='text-sm leading-relaxed'>
                        {message.content}
                      </p>
                      <p
                        className={cn(
                          'text-xs mt-1',
                          message.role === 'assistant'
                            ? 'text-muted-foreground'
                            : 'text-primary-foreground/70'
                        )}
                        suppressHydrationWarning
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className='flex gap-3'>
                    <div className='w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center'>
                      <Bot className='w-4 h-4 text-primary' />
                    </div>
                    <div className='bg-secondary/50 rounded-2xl rounded-tl-none px-4 py-3'>
                      <div className='flex gap-1'>
                        <span
                          className='w-2 h-2 bg-muted-foreground rounded-full animate-bounce'
                          style={{ animationDelay: '0ms' }}
                        />
                        <span
                          className='w-2 h-2 bg-muted-foreground rounded-full animate-bounce'
                          style={{ animationDelay: '150ms' }}
                        />
                        <span
                          className='w-2 h-2 bg-muted-foreground rounded-full animate-bounce'
                          style={{ animationDelay: '300ms' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 2 && (
                <div className='px-4 pb-2'>
                  <p className='text-xs text-muted-foreground mb-2'>
                    Quick questions:
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {quickReplies.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => handleQuickReply(reply)}
                        className='text-xs px-3 py-1.5 rounded-full bg-secondary/50 text-foreground hover:bg-secondary transition-colors'
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className='p-4 border-t border-border'>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className='flex gap-2'
                >
                  <input
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Type your message...'
                    className='flex-1 px-4 py-2 rounded-full bg-secondary/50 border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary'
                  />
                  <Button
                    type='submit'
                    size='icon'
                    disabled={!input.trim() || isTyping}
                    className='rounded-full bg-primary text-primary-foreground hover:bg-primary/90'
                  >
                    <Send className='w-4 h-4' />
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
