import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, UtensilsCrossed, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  category: string;
}

const defaultMeals: Meal[] = [
  { id: "1", name: "Oatmeal with Berries", calories: 340, protein: 12, carbs: 52, fat: 8, time: "7:30 AM", category: "Breakfast" },
  { id: "2", name: "Grilled Chicken Wrap", calories: 520, protein: 38, carbs: 42, fat: 18, time: "12:30 PM", category: "Lunch" },
  { id: "3", name: "Trail Mix", calories: 180, protein: 5, carbs: 18, fat: 12, time: "3:00 PM", category: "Snack" },
];

const quickAdd = [
  { name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0 },
  { name: "Chicken Breast (100g)", calories: 165, protein: 31, carbs: 0, fat: 4 },
  { name: "Brown Rice (1 cup)", calories: 216, protein: 5, carbs: 45, fat: 2 },
  { name: "Greek Yogurt", calories: 100, protein: 17, carbs: 6, fat: 1 },
  { name: "Avocado (half)", calories: 120, protein: 1, carbs: 6, fat: 11 },
  { name: "Hard Boiled Egg", calories: 78, protein: 6, carbs: 1, fat: 5 },
];

const MealLogger = () => {
  const [meals, setMeals] = useState<Meal[]>(defaultMeals);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const addMeal = (item: typeof quickAdd[0]) => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const newMeal: Meal = {
      id: Date.now().toString(),
      ...item,
      time,
      category: "Snack",
    };
    setMeals((prev) => [...prev, newMeal]);
    setShowQuickAdd(false);
  };

  const removeMeal = (id: string) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  };

  const totalCals = meals.reduce((s, m) => s + m.calories, 0);
  const totalProtein = meals.reduce((s, m) => s + m.protein, 0);
  const totalCarbs = meals.reduce((s, m) => s + m.carbs, 0);
  const totalFat = meals.reduce((s, m) => s + m.fat, 0);

  return (
    <div className="container py-8 pb-24 md:pb-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-foreground">Meal Log</h2>
          <p className="text-sm text-muted-foreground">Track what you eat today</p>
        </div>
        <Button onClick={() => setShowQuickAdd(!showQuickAdd)} className="rounded-xl gap-2">
          <Plus className="h-4 w-4" />
          Add Food
        </Button>
      </div>

      {/* Quick Add Panel */}
      <AnimatePresence>
        {showQuickAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border bg-card p-4">
              <p className="text-sm font-medium text-foreground mb-3">Quick Add</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {quickAdd.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => addMeal(item)}
                    className="text-left rounded-lg border bg-background p-3 hover:bg-secondary transition-colors"
                  >
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.calories} kcal · {item.protein}g protein</p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily Summary */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Calories", value: totalCals, unit: "kcal" },
          { label: "Protein", value: totalProtein, unit: "g" },
          { label: "Carbs", value: totalCarbs, unit: "g" },
          { label: "Fat", value: totalFat, unit: "g" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-card border p-4 text-center">
            <p className="font-display text-xl text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Meal List */}
      <div className="space-y-3">
        <AnimatePresence>
          {meals.map((meal) => (
            <motion.div
              key={meal.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              className="flex items-center justify-between rounded-xl border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <UtensilsCrossed className="h-4 w-4 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{meal.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {meal.time}
                    <span>·</span>
                    <span>{meal.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{meal.calories} kcal</p>
                  <p className="text-xs text-muted-foreground">P:{meal.protein}g C:{meal.carbs}g F:{meal.fat}g</p>
                </div>
                <button
                  onClick={() => removeMeal(meal.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MealLogger;
