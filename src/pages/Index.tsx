import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/components/dashboard/Dashboard";
import NutritionChat from "@/components/chat/NutritionChat";
import MealLogger from "@/components/meals/MealLogger";
import FoodAnalyzer from "@/components/analyze/FoodAnalyzer";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "chat":
        return <NutritionChat />;
      case "meals":
        return <MealLogger />;
      case "analyze":
        return <FoodAnalyzer />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AppLayout>
  );
};

export default Index;
