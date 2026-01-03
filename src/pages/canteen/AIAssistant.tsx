import { useState, useRef, useEffect } from 'react';
import { CanteenLayout } from '@/components/canteen/CanteenLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Bot, Send, Sparkles, TrendingUp, Lightbulb, BarChart3, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  { icon: TrendingUp, text: "Analyze today's sales trends" },
  { icon: BarChart3, text: "What are my best selling items?" },
  { icon: Lightbulb, text: "Suggest menu improvements" },
  { icon: Sparkles, text: "Predict tomorrow's demand" },
];

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI assistant for CampusBite. I can help you analyze sales, manage your menu, predict demand, and provide business insights. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      const responses: Record<string, string> = {
        "Analyze today's sales trends": "📊 **Today's Sales Analysis**\n\nTotal Revenue: ₹12,580\nTotal Orders: 45\nPeak Hour: 12:00 PM - 1:00 PM\n\n**Key Insights:**\n• Lunch hours account for 65% of daily sales\n• Average order value increased by 8% compared to yesterday\n• Beverages are trending up with 23% more orders\n\n**Recommendation:** Consider adding a lunch combo offer to capitalize on peak hours.",
        "What are my best selling items?": "🏆 **Top Selling Items This Week**\n\n1. **Masala Dosa** - 156 orders\n2. **Chicken Biryani** - 134 orders\n3. **Paneer Butter Masala** - 98 orders\n4. **Cold Coffee** - 87 orders\n5. **Veg Thali** - 76 orders\n\n**Trend Alert:** Cold Coffee sales have increased by 45% - consider featuring it prominently!",
        "Suggest menu improvements": "💡 **Menu Improvement Suggestions**\n\n**Add:**\n• Healthy salad options (trending among students)\n• Quick grab-and-go snacks\n• Combo meals for better value\n\n**Optimize:**\n• Remove slow-moving items (Fruit Salad, Plain Dosa)\n• Increase portion sizes for top sellers\n• Add 'Chef's Special' rotating daily items\n\n**Pricing:**\n• Samosa is underpriced vs. competition\n• Consider tiered pricing for peak hours",
        "Predict tomorrow's demand": "🔮 **Tomorrow's Demand Forecast**\n\nExpected Orders: 48-52\nExpected Revenue: ₹13,200-14,500\n\n**Item Predictions:**\n• Masala Dosa: 35-40 orders\n• Biryani: 28-32 orders\n• Beverages: High demand expected (warm weather)\n\n**Preparation Tips:**\n• Pre-prepare dosa batter for 40 servings\n• Stock extra beverages\n• Schedule additional staff for 11 AM - 2 PM",
      };

      const response = responses[messageText] || 
        "I understand you're asking about: \"" + messageText + "\"\n\nI can help you with:\n• Sales analytics and trends\n• Menu optimization suggestions\n• Demand forecasting\n• Inventory management tips\n• Pricing recommendations\n\nPlease try one of the suggested prompts or ask a specific question about your canteen operations!";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <CanteenLayout>
      <div className="p-6 h-[calc(100vh-2rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">AI Assistant</h1>
              <p className="text-muted-foreground">Your intelligent canteen management partner</p>
            </div>
          </div>
          <Badge variant="secondary" className="gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Online
          </Badge>
        </div>

        {/* Chat Container */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardHeader className="border-b border-border py-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Chat with AI
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.role === 'user' && "flex-row-reverse"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                        message.role === 'assistant'
                          ? "bg-primary/10"
                          : "bg-secondary"
                      )}
                    >
                      {message.role === 'assistant' ? (
                        <Bot className="w-4 h-4 text-primary" />
                      ) : (
                        <User className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 max-w-[80%]",
                        message.role === 'assistant'
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-primary text-primary-foreground"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p
                        className={cn(
                          "text-xs mt-2 opacity-70",
                          message.role === 'assistant'
                            ? "text-muted-foreground"
                            : "text-primary-foreground/70"
                        )}
                      >
                        {message.timestamp.toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-secondary rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Suggested Prompts */}
            {messages.length <= 1 && (
              <div className="px-4 pb-4">
                <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleSend(prompt.text)}
                    >
                      <prompt.icon className="w-4 h-4" />
                      {prompt.text}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about sales, menu, inventory..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </CanteenLayout>
  );
};

export default AIAssistant;
