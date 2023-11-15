// App.js
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import TabsScreen from "./TabsScreen";
import { SafeAreaView } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <TabsScreen />
      </SafeAreaView>
    </NavigationContainer>
  );
}
