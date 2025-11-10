import React, { useState } from "react";
import { View } from "react-native";
import { CustomHeader } from "../components/CustomHeader";
import Home from "../pages/Home";
import History from "../pages/History";
import Profile from "../pages/Profile";

export const MainLayout = () => {
  const [activeTab, setActiveTab] = useState("Home");

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <Home />;
      case "History":
        return <History />;
      case "Profile":
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#111" }}>
      <CustomHeader activeTab={activeTab} onTabChange={setActiveTab} />
      <View style={{ flex: 1 }}>{renderContent()}</View>
    </View>
  );
};
