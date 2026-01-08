import { useState, useRef, useEffect } from "react";
import { Send, Plus, Mic, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  onFileUpload?: () => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, onFileUpload, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + "px";
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="space-y-3">
      {/* Model selector and settings */}
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 text-sm border rounded-full hover:bg-muted transition-colors">
          Gemini-3
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-full hover:bg-muted transition-colors">
          <Settings className="w-3.5 h-3.5" />
          <span>Setting</span>
        </button>
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="border rounded-2xl bg-card shadow-sm overflow-hidden">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message"
            className="w-full px-4 py-3 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground resize-none min-h-[80px]"
            disabled={disabled}
            rows={3}
          />
          
          {/* Bottom toolbar */}
          <div className="flex items-center justify-between px-3 py-2 border-t">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onFileUpload}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
              >
                <Plus className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
            
            <Button 
              type="submit" 
              size="icon" 
              className="rounded-full w-9 h-9"
              disabled={!message.trim() || disabled}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};