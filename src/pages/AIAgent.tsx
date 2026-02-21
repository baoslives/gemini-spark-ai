import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Plus, Mic, Settings, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  onDelta: (t: string) => void;
  onDone: () => void;
  onError: (e: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });

  if (!resp.ok || !resp.body) {
    if (resp.status === 429) { onError("Rate limit exceeded. Please wait a moment."); return; }
    if (resp.status === 402) { onError("Credits exhausted. Please top up your workspace."); return; }
    onError("Failed to connect to AI. Please try again.");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, idx);
      buf = buf.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") { onDone(); return; }
      try {
        const parsed = JSON.parse(json);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch { buf = line + "\n" + buf; break; }
    }
  }
  onDone();
}

export const AIAgent = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const hasStarted = messages.length > 0;

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + "px";
    }
  }, [input]);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    setError(null);
    const userMsg: Msg = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    await streamChat({
      messages: newMessages,
      onDelta: upsert,
      onDone: () => setIsLoading(false),
      onError: (e) => { setError(e); setIsLoading(false); },
    });
  }, [messages, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  const newConversation = () => { setMessages([]); setError(null); };

  const InputArea = () => (
    <div className="space-y-3 w-full">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-full hover:bg-muted transition-colors">
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
          <span className="text-xs text-orange-500 border border-orange-300 rounded-full px-3 py-1">
            No models configured. Click Settings to configure.
          </span>
        </div>
        <button onClick={newConversation} className="text-sm text-foreground hover:underline">
          New Conversation
        </button>
      </div>

      {/* Textarea */}
      <div className="border rounded-2xl bg-card shadow-sm overflow-hidden">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... or drop files here"
          className="w-full px-4 py-3 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground resize-none min-h-[100px]"
          rows={4}
          disabled={isLoading}
        />
        <div className="flex items-center justify-between px-3 py-2 border-t">
          <div className="flex items-center gap-1">
            <button type="button" className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
              <Plus className="w-5 h-5" />
            </button>
            <button type="button" className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
              <Mic className="w-5 h-5" />
            </button>
          </div>
          <Button
            size="icon"
            className="rounded-full w-9 h-9"
            disabled={!input.trim() || isLoading}
            onClick={() => send(input)}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        AI generated content may be inaccurate. Verify important information.
      </p>
    </div>
  );

  // Welcome state
  if (!hasStarted) {
    return (
      <div className="flex flex-col h-screen">
        {/* Header */}
        <div className="px-8 py-4 border-b">
          <h2 className="font-mono text-sm tracking-wider">New Conversation</h2>
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <h1 className="text-4xl font-light text-muted-foreground mb-2">How can I help you today?</h1>
          <p className="text-muted-foreground text-sm mb-12">
            Your instant assistant for drafting, analyzing, and solving complex tasks in seconds.
          </p>
        </div>

        {/* Bottom input */}
        <div className="px-6 pb-6 max-w-3xl mx-auto w-full">
          <InputArea />
        </div>
      </div>
    );
  }

  // Conversation state
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="px-8 py-4 border-b flex items-center justify-between">
        <h2 className="font-mono text-sm tracking-wider">New Conversation</h2>
        <button onClick={newConversation} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <RotateCcw className="w-3.5 h-3.5" />
          New
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-8 py-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] rounded-2xl px-5 py-3 text-sm ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground"
            }`}>
              {msg.role === "assistant" ? (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : msg.content}
            </div>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl px-5 py-3 text-sm text-muted-foreground animate-pulse">
              Thinking...
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-center">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-6 pb-6 max-w-3xl mx-auto w-full">
        <InputArea />
      </div>
    </div>
  );
};
