import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import TasksScreen from "../screens/task/TasksScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import {Platform} from "react-native";
import Colors from "../constants/Colors";
import LogoTitle from "../components/LogoTitle";
import TabHeader from "../components/TabHeader";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";
export default function BottomTabNavigator({navigation, route}) {
  // Set the header title on the parent stack navigator depending on the
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
  });
  const iconPrefix = Platform.OS === "ios" ? "ios" : "md";
  const TabBarOptions = {activeTintColor: Colors.themeColor};
  const bottomTabs = [
    {
      name: "Tasks",
      title: "Tasks",
      component: TasksScreen,
      iconName: "-book",
    },
    {
      name: "Profile",
      title: "Profile",
      component: ProfileScreen,
      iconName: "-person",
    },
    {
      name: "Home",
      title: "",
      component: HomeScreen,
      iconName: "",
      home: true,
      image: require("./../assets/icons/logo-orange.png"),
    },
    {
      name: "Search",
      title: "Search",
      component: SearchScreen,
      iconName: "-search",
    },
    {
      name: "Notifications",
      title: "Notifications",
      component: NotificationsScreen,
      iconName: "-notifications",
    },
  ];
  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={TabBarOptions}
    >
      {bottomTabs.map((nav) => {
        const {name, component, title, image, iconName, home} = nav;
        return (
          <BottomTab.Screen
            key={name}
            name={name}
            component={component}
            options={{
              title: title,
              tabBarIcon: ({focused}) => (
                <TabBarIcon
                  home={home}
                  image={image}
                  focused={focused}
                  name={iconPrefix + iconName}
                />
              ),
            }}
          />
        );
      })}
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return Platform.OS === "ios" ? <LogoTitle /> : "Esaar"; //<LogoTitle />;
    case "Tasks":
      return <TabHeader title={routeName} />;
    case "Profile":
      return "Profile";
    case "Search":
      return "Search";
    case "Notifications":
      return "Notifications";
    case "isaar":
      return "esaar for everyone";
  }
}
