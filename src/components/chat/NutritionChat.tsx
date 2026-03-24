import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "What are the best foods for muscle recovery?",
  "How much protein do I need daily?",
  "Suggest a low-carb dinner recipe",
  "What vitamins help with energy?",
];

// Simple local AI responses for demo
const getAIResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("protein")) {
    return "**Great question about protein!** 💪\n\nThe recommended daily protein intake varies:\n\n- **Sedentary adults**: 0.8g per kg of body weight\n- **Active individuals**: 1.2–1.6g per kg\n- **Athletes/muscle building**: 1.6–2.2g per kg\n\n**Top protein sources:**\n- Chicken breast (31g per 100g)\n- Greek yogurt (10g per 100g)\n- Lentils (9g per 100g)\n- Eggs (6g per egg)\n\nWould you like me to calculate your specific daily protein needs?";
  }
  if (lower.includes("vitamin") || lower.includes("energy")) {
    return "**Vitamins for Energy** ⚡\n\nKey vitamins that support energy levels:\n\n1. **Vitamin B12** — Essential for red blood cell formation\n2. **Iron** — Carries oxygen to muscles and brain\n3. **Vitamin D** — Supports immune function and mood\n4. **Magnesium** — Involved in 300+ enzymatic reactions\n\n**Food sources:** Leafy greens, nuts, seeds, whole grains, citrus fruits, and fatty fish.";
  }
  if (lower.includes("recipe") || lower.includes("dinner") || lower.includes("meal")) {
    return "**Low-Carb Grilled Salmon Bowl** 🐟\n\n**Ingredients:**\n- 150g salmon fillet\n- 1 cup cauliflower rice\n- 1/2 avocado, sliced\n- Handful of spinach\n- Cherry tomatoes\n- Lemon & olive oil dressing\n\n**Macros per serving:**\n- Calories: 420 kcal\n- Protein: 35g\n- Carbs: 12g\n- Fat: 28g\n\nSimple, nutritious, and ready in 20 minutes!";
  }
  if (lower.includes("muscle") || lower.includes("recovery")) {
    return "**Best Foods for Muscle Recovery** 🏋️\n\n1. **Tart cherry juice** — Reduces inflammation\n2. **Salmon** — Omega-3 fatty acids for repair\n3. **Sweet potatoes** — Glycogen replenishment\n4. **Eggs** — Complete amino acid profile\n5. **Cottage cheese** — Casein protein for sustained recovery\n\n**Timing matters:** Aim for a protein-rich meal within 2 hours post-workout.";
  }
  return "**Thanks for your question!** 🌿\n\nI'm your AI nutrition assistant. I can help you with:\n\n- **Macro tracking** — Understanding your protein, carb, and fat needs\n- **Meal suggestions** — Healthy recipes tailored to your goals\n- **Nutrient analysis** — Breaking down the nutrition of any food\n- **Diet guidance** — Evidence-based nutrition advice\n\nWhat would you like to know more about?";
};

const NutritionChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! 🌿 I'm your AI nutrition assistant. Ask me anything about nutrition, meal planning, or food analysis. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));

    const response = getAIResponse(text);
    setMessages((prev) => [
      ...prev,
      { id: (Date.now() + 1).toString(), role: "assistant", content: response },
    ]);
    setIsTyping(false);
  };

  return (
    <div className="container py-6 pb-24 md:pb-6">
      <div className="mx-auto max-w-2xl flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-display text-xl text-foreground">Nutrition AI</h2>
            <p className="text-sm text-muted-foreground">Powered by machine learning</p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                    <Bot className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border text-card-foreground"
                  }`}
                >
                  {msg.content.split("\n").map((line, i) => {
                    const bold = line.replace(/\*\*(.*?)\*\*/g, "");
                    const hasBold = line.includes("**");
                    return (
                      <p key={i} className={`${i > 0 ? "mt-1" : ""} ${hasBold && line.startsWith("**") ? "font-semibold" : ""}`}>
                        {line.split(/\*\*(.*?)\*\*/).map((part, j) =>
                          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                        )}
                      </p>
                    );
                  })}
                </div>
                {msg.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                <Bot className="h-4 w-4 text-secondary-foreground" />
              </div>
              <div className="bg-card border rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-soft" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-soft [animation-delay:0.2s]" />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-soft [animation-delay:0.4s]" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left text-sm rounded-xl border bg-card p-3 text-card-foreground hover:bg-secondary transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
            placeholder="Ask about nutrition..."
            className="flex-1 rounded-xl border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button
            onClick={() => send(input)}
            disabled={!input.trim() || isTyping}
            size="icon"
            className="h-12 w-12 rounded-xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NutritionChat;
