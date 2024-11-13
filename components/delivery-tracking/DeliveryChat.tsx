"use client";

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Shield } from 'lucide-react';
import { socket } from '@/lib/socket';
import { useAuth } from '@/store/auth';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'customer' | 'driver';
  text: string;
  timestamp: string;
  isSystem?: boolean;
}

interface DeliveryChatProps {
  orderId: string;
}

const PREDEFINED_MESSAGES = [
  "Var ska jag lämna leveransen?",
  "Jag är framme nu",
  "Jag är lite försenad",
  "Kan du möta mig utanför?"
];

export function DeliveryChat({ orderId }: DeliveryChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.connect();
    socket.emit('join_chat', orderId);

    socket.on('message', (message: Message) => {
      setMessages(prev => [...prev, message]);
      scrollToBottom();
    });

    socket.on('typing_start', () => setIsTyping(true));
    socket.on('typing_end', () => setIsTyping(false));

    return () => {
      socket.off('message');
      socket.off('typing_start');
      socket.off('typing_end');
      socket.emit('leave_chat', orderId);
    };
  }, [orderId]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: user?.role === 'driver' ? 'driver' : 'customer',
      text: newMessage,
      timestamp: new Date().toISOString()
    };

    socket.emit('send_message', { orderId, message });
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    scrollToBottom();
  };

  const handleQuickReply = (text: string) => {
    setNewMessage(text);
  };

  return (
    <Card className="flex flex-col h-[500px]">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-semibold">Chatt med {user?.role === 'driver' ? 'kund' : 'bud'}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>Säker chatt</span>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${
                message.sender === (user?.role === 'driver' ? 'driver' : 'customer')
                  ? 'justify-end'
                  : 'justify-start'
              } mb-4`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === (user?.role === 'driver' ? 'driver' : 'customer')
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="animate-pulse">...</div>
            <span>skriver ett meddelande</span>
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t space-y-4">
        <ScrollArea className="whitespace-nowrap pb-2">
          <div className="flex gap-2">
            {PREDEFINED_MESSAGES.map((msg, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex-none"
                onClick={() => handleQuickReply(msg)}
              >
                {msg}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            placeholder="Skriv ett meddelande..."
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              socket.emit('typing_start', orderId);
              setTimeout(() => socket.emit('typing_end', orderId), 1000);
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}