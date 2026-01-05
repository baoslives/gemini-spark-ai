import { useState } from "react";
import { Send, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  onFileUpload?: () => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, onFileUpload, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center gap-2 p-2 bg-card rounded-2xl border shadow-sm">
        <button
          type="button"
          onClick={onFileUpload}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
        >
          <Paperclip className="w-5 h-5" />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
          disabled={disabled}
        />
        
        <button
          type="button"
          className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
        >
          <Mic className="w-5 h-5" />
        </button>
        
        <Button 
          type="submit" 
          size="icon" 
          className="rounded-xl"
          disabled={!message.trim() || disabled}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};
