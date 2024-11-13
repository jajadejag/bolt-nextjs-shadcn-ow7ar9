"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Shield, AlertTriangle, Phone } from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  sender: "driver" | "customer";
  text: string;
  time: string;
  isSecure?: boolean;
  isSystem?: boolean;
}

const PREDEFINED_MESSAGES = [
  "Jag är framme nu",
  "Jag är på väg",
  "Jag är lite försenad",
  "Var ska jag lämna leveransen?",
];

export function DeliveryChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "system",
      text: "Chatten är krypterad. Dela aldrig personliga uppgifter.",
      time: "14:30",
      isSystem: true
    },
    {
      id: 2,
      sender: "customer",
      text: "Hej! Kan du ringa när du är framme?",
      time: "14:31"
    },
    {
      id: 3,
      sender: "driver",
      text: "Absolut! Jag är ca 10 minuter bort.",
      time: "14:32",
      isSecure: true
    }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      sender: "driver",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSecure: true
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <Card className="flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Chatt med kund</h3>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Shield className="h-3 w-3 mr-1" />
            Säker chatt
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Order #123</p>
          <Button variant="ghost" size="sm" className="text-sm">
            <Phone className="h-4 w-4 mr-2" />
            Ring kund
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isSystem 
                  ? "justify-center" 
                  : message.sender === "driver" 
                  ? "justify-end" 
                  : "justify-start"
              }`}
            >
              {message.isSystem ? (
                <div className="bg-muted/50 rounded-lg p-2 flex items-center text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4 mr-2 text-primary" />
                  {message.text}
                </div>
              ) : (
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "driver"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">
                      {message.time}
                    </span>
                    {message.isSecure && (
                      <Shield className="h-3 w-3 text-primary/60" />
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Quick Replies */}
      <div className="p-2 border-t">
        <ScrollArea className="whitespace-nowrap">
          <div className="flex gap-2">
            {PREDEFINED_MESSAGES.map((msg, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex-none"
                onClick={() => setNewMessage(msg)}
              >
                {msg}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input 
            placeholder="Skriv ett meddelande..." 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1" 
          />
          <Button 
            size="icon" 
            className="bg-primary hover:bg-primary/90"
            onClick={handleSend}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}