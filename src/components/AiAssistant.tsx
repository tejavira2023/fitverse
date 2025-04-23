
import React, { useState, useRef, useEffect } from "react";
import { useAiAssistant } from "@/contexts/AiAssistantContext";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export const AiAssistant = () => {
  const { 
    messages, 
    isProcessing, 
    sendMessage, 
    isOpen,
    toggleAssistant
  } = useAiAssistant();
  
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);
  
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };
  
  if (!isOpen) {
    return (
      <Button 
        onClick={toggleAssistant}
        className="fixed bottom-24 right-4 md:right-8 size-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50 animate-bounce"
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="size-6" />
      </Button>
    );
  }
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-md rounded-xl shadow-xl border overflow-hidden animate-slide-in-bottom">
        <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
          <h2 className="text-lg font-bold">FitVerse Assistant</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleAssistant}
            className="text-primary-foreground hover:bg-primary/90"
          >
            <X className="size-5" />
          </Button>
        </div>
        
        <ScrollArea className="h-[60vh] p-4">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "assistant" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 ${
                    message.role === "assistant"
                      ? "bg-secondary/20 text-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-lg p-3 bg-secondary/20">
                  <div className="flex gap-1">
                    <span className="size-2 bg-foreground/60 rounded-full animate-pulse"></span>
                    <span className="size-2 bg-foreground/60 rounded-full animate-pulse delay-150"></span>
                    <span className="size-2 bg-foreground/60 rounded-full animate-pulse delay-300"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about diet, exercises, or fitness advice..."
            className="flex-1"
            disabled={isProcessing}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={isProcessing || !input.trim()}
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
