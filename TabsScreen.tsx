import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { format, addDays } from "date-fns";
import { Text, View } from "react-native";
import moment from "moment";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
const Tab = createMaterialTopTabNavigator();

type tabScreenType = {
  date: Date;
  functio: any;
};
const TabScreen = ({ date, functio }: tabScreenType) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      functio(`${date}`);
    }
  }, [isFocused]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{moment(date).format("yyyy-MM-DD")}</Text>
    </View>
  );
};

const renderScreens = (tabsDate: any, handleAddDate: any) => {
  return (
    <>
      {tabsDate.map((item) => (
        <Tab.Screen
          key={item}
          name={`${item}`}
          component={() => <TabScreen functio={handleAddDate} date={item} />}
          initialParams={{ item }}
        />
      ))}
    </>
  );
};

const TabsScreen = () => {
  const navigation = useNavigation();

  const handleAddDate = (routename: string) => {
    setIt(routename);
  };
  const navigationRef = useNavigationContainerRef();
  const [tabsDate, setSelectedDate] = useState<string[]>([
    moment(addDays(new Date(), -1)).format("yyyy-MM-DD"),
    moment(new Date()).format("yyyy-MM-DD"),
    moment(addDays(new Date(), 1)).format("yyyy-MM-DD"),
  ]);
  const [currentRoute, setIt] = useState(`${tabsDate[0]}`);
  useEffect(() => {
    console.log(currentRoute);
    console.log(new Date(currentRoute));
    console.log(tabsDate.indexOf(currentRoute));
    if (tabsDate.length - 1 === tabsDate.indexOf(currentRoute)) {
      setSelectedDate([
        ...tabsDate,
        moment(addDays(new Date(currentRoute), 1)).format("yyyy-MM-DD"),
      ]);
    } else if (tabsDate.indexOf(currentRoute) === 0) {
      setSelectedDate([
        moment(addDays(new Date(currentRoute), -1)).format("yyyy-MM-DD"),
        ...tabsDate,
      ]);
    }
    console.log(tabsDate.length);
  }, [currentRoute]);
  //   useFocusEffect(
  //     React.useCallback(() => {
  //       // Handle tab change logic here
  //       console.log("Tab focused:", date);
  //       // You can perform additional actions when the tab changes
  //       return () => {
  //         // Cleanup or additional actions when the component is unmounted
  //       };
  //     }, [date])
  //   );

  //   const handleTabPress = () => {
  //     setSelectedDate(addDays(selectedDate, 1));
  //   };
  useEffect(() => {}, [tabsDate.length]);

  const key = tabsDate.length.toString();
  return (
    <Tab.Navigator
      key={key}
      initialRouteName={`${tabsDate[1]}`}
      screenOptions={{
        tabBarScrollEnabled: true,
      }}
    >
      {renderScreens(tabsDate, handleAddDate)}
    </Tab.Navigator>
  );
};

export default TabsScreen;
