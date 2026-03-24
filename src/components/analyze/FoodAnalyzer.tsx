import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Zap, Leaf, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NutritionResult {
  name: string;
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  vitamins: { name: string; amount: string; pct: number }[];
}

const foodDatabase: Record<string, NutritionResult> = {
  banana: {
    name: "Banana",
    serving: "1 medium (118g)",
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.4,
    fiber: 3.1,
    sugar: 14,
    vitamins: [
      { name: "Vitamin B6", amount: "0.4mg", pct: 25 },
      { name: "Vitamin C", amount: "10mg", pct: 11 },
      { name: "Potassium", amount: "422mg", pct: 12 },
      { name: "Manganese", amount: "0.3mg", pct: 14 },
    ],
  },
  avocado: {
    name: "Avocado",
    serving: "1/2 fruit (100g)",
    calories: 160,
    protein: 2,
    carbs: 9,
    fat: 15,
    fiber: 7,
    sugar: 0.7,
    vitamins: [
      { name: "Vitamin K", amount: "26µg", pct: 26 },
      { name: "Folate", amount: "81µg", pct: 20 },
      { name: "Vitamin C", amount: "10mg", pct: 11 },
      { name: "Potassium", amount: "485mg", pct: 14 },
    ],
  },
  salmon: {
    name: "Salmon",
    serving: "100g cooked",
    calories: 208,
    protein: 20,
    carbs: 0,
    fat: 13,
    fiber: 0,
    sugar: 0,
    vitamins: [
      { name: "Vitamin D", amount: "11µg", pct: 55 },
      { name: "Vitamin B12", amount: "2.8µg", pct: 117 },
      { name: "Omega-3", amount: "2.3g", pct: 0 },
      { name: "Selenium", amount: "40µg", pct: 57 },
    ],
  },
  egg: {
    name: "Egg",
    serving: "1 large (50g)",
    calories: 78,
    protein: 6,
    carbs: 0.6,
    fat: 5,
    fiber: 0,
    sugar: 0.6,
    vitamins: [
      { name: "Vitamin B12", amount: "0.6µg", pct: 25 },
      { name: "Vitamin D", amount: "1µg", pct: 5 },
      { name: "Choline", amount: "147mg", pct: 27 },
      { name: "Selenium", amount: "15µg", pct: 22 },
    ],
  },
};

const popularSearches = ["Banana", "Avocado", "Salmon", "Egg"];

const FoodAnalyzer = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<NutritionResult | null>(null);
  const [notFound, setNotFound] = useState(false);

  const analyze = (searchTerm: string) => {
    const key = searchTerm.toLowerCase().trim();
    const found = foodDatabase[key];
    if (found) {
      setResult(found);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  return (
    <div className="container py-8 pb-24 md:pb-8 space-y-6 max-w-2xl mx-auto">
      <div>
        <h2 className="font-display text-2xl text-foreground">Food Analyzer</h2>
        <p className="text-sm text-muted-foreground">Get detailed nutritional breakdown of any food</p>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyze(query)}
            placeholder="Search a food (banana, avocado, salmon, egg)..."
            className="w-full rounded-xl border bg-card pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button onClick={() => analyze(query)} className="rounded-xl px-6">
          Analyze
        </Button>
      </div>

      {/* Popular */}
      <div className="flex gap-2 flex-wrap">
        {popularSearches.map((s) => (
          <button
            key={s}
            onClick={() => { setQuery(s); analyze(s); }}
            className="rounded-full border bg-card px-4 py-1.5 text-sm text-foreground hover:bg-secondary transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      {notFound && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border bg-card p-6 text-center"
        >
          <p className="text-muted-foreground">Food not found. Try: banana, avocado, salmon, or egg.</p>
        </motion.div>
      )}

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="rounded-xl border bg-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl text-foreground">{result.name}</h3>
                <p className="text-sm text-muted-foreground">{result.serving}</p>
              </div>
            </div>

            {/* Macros */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                { label: "Calories", value: result.calories, unit: "kcal", pct: (result.calories / 2200) * 100 },
                { label: "Protein", value: result.protein, unit: "g", pct: (result.protein / 130) * 100 },
                { label: "Carbs", value: result.carbs, unit: "g", pct: (result.carbs / 275) * 100 },
                { label: "Fat", value: result.fat, unit: "g", pct: (result.fat / 78) * 100 },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <p className="font-display text-lg text-foreground">{m.value}<span className="text-xs font-body text-muted-foreground">{m.unit}</span></p>
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                  <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(m.pct, 100)}%` }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Additional */}
            <div className="flex gap-4 text-sm border-t pt-4">
              <div className="flex items-center gap-1">
                <Droplets className="h-4 w-4 text-info" />
                <span className="text-muted-foreground">Fiber: {result.fiber}g</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-warning" />
                <span className="text-muted-foreground">Sugar: {result.sugar}g</span>
              </div>
            </div>
          </div>

          {/* Vitamins */}
          <div className="rounded-xl border bg-card p-6">
            <h4 className="font-display text-lg text-foreground mb-4">Vitamins & Minerals</h4>
            <div className="space-y-3">
              {result.vitamins.map((v) => (
                <div key={v.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{v.name}</p>
                    <p className="text-xs text-muted-foreground">{v.amount}</p>
                  </div>
                  {v.pct > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(v.pct, 100)}%` }}
                          className="h-full rounded-full bg-accent"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">{v.pct}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FoodAnalyzer;
