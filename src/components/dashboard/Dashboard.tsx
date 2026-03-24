import { motion } from "framer-motion";
import { Flame, Droplets, Wheat, Beef, TrendingUp, Apple } from "lucide-react";
import heroImage from "@/assets/hero-nutrition.png";

const macros = [
  { label: "Calories", value: 1850, target: 2200, unit: "kcal", icon: Flame, color: "text-warning" },
  { label: "Protein", value: 95, target: 130, unit: "g", icon: Beef, color: "text-primary" },
  { label: "Carbs", value: 210, target: 275, unit: "g", icon: Wheat, color: "text-info" },
  { label: "Water", value: 6, target: 8, unit: "cups", icon: Droplets, color: "text-info" },
];

const recentMeals = [
  { name: "Greek Yogurt Bowl", calories: 320, time: "8:30 AM" },
  { name: "Grilled Chicken Salad", calories: 480, time: "12:45 PM" },
  { name: "Almonds & Apple", calories: 220, time: "3:15 PM" },
];

const Dashboard = () => {
  return (
    <div className="container py-8 pb-24 md:pb-8 space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-primary p-8 md:p-12"
      >
        <div className="relative z-10 max-w-md">
          <h1 className="font-display text-3xl md:text-4xl text-primary-foreground mb-3">
            Good afternoon! 🌿
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            You've logged 3 meals today. Keep up the great work on your nutrition journey.
          </p>
        </div>
        <img
          src={heroImage}
          alt="Fresh nutrition ingredients"
          width={800}
          height={600}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-64 md:w-80 opacity-20 md:opacity-30 pointer-events-none"
        />
      </motion.div>

      {/* Macro Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {macros.map((macro, i) => {
          const pct = Math.round((macro.value / macro.target) * 100);
          return (
            <motion.div
              key={macro.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl bg-card p-5 border"
            >
              <div className="flex items-center justify-between mb-3">
                <macro.icon className={`h-5 w-5 ${macro.color}`} />
                <span className="text-xs font-medium text-muted-foreground">{pct}%</span>
              </div>
              <p className="font-display text-2xl text-foreground">
                {macro.value}
                <span className="text-sm font-body text-muted-foreground ml-1">{macro.unit}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">{macro.label}</p>
              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(pct, 100)}%` }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Meals */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Apple className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl text-foreground">Today's Meals</h2>
        </div>
        <div className="space-y-3">
          {recentMeals.map((meal, i) => (
            <motion.div
              key={meal.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center justify-between rounded-xl bg-card p-4 border"
            >
              <div>
                <p className="font-medium text-foreground">{meal.name}</p>
                <p className="text-sm text-muted-foreground">{meal.time}</p>
              </div>
              <span className="text-sm font-medium text-primary">{meal.calories} kcal</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
