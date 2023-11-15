// DynamicTabs.js
import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { format, addDays } from "date-fns";
import { Text, View } from "react-native";

const Tab = createMaterialTopTabNavigator();

const TabScreen = ({ date }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>{format(date, "yyyy-MM-dd")}</Text>
  </View>
);

const DynamicTabs = ({ route }) => {
  const { tabsCount } = route.params;
  const [screens, setScreens] = useState([]);

  useEffect(() => {
    // Dynamically create screens based on the tabsCount
    console.log(tabsCount + "TABS COUNT");
    const newScreens = Array.from({ length: tabsCount }, (_, index) => {
      return {
        name: `Tab${index + 1}`,
        component: () => <TabScreen date={addDays(new Date(), index)} />,
      };
    });
    setScreens(newScreens);
  }, [tabsCount]);
  if (screens.length === 0) {
    // Return a default screen or loading indicator when there are no screens
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No screens available</Text>
      </View>
    );
  }
  return (
    <Tab.Navigator>
      {screens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default DynamicTabs;
