import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// components
import FirstNameScreen from "../screens/FirstNameScreen";
import GenderScreen from "../screens/GenderScreen";
import AddChildrenScreen from "../screens/AddChildrenScreen";
import EmailPasswordScreen from "../screens/EmailPasswordScreen";
import LoginScreen from "../screens/LoginScreen"; // Import the new LoginScreen

export type RootStackParamList = {
  FirstName: undefined;
  Gender: undefined;
  AddChildren: undefined;
  EmailPassword: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName="FirstName"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="FirstName" component={FirstNameScreen} />
        <Stack.Screen name="Gender" component={GenderScreen} />
        <Stack.Screen name="AddChildren" component={AddChildrenScreen} />
        <Stack.Screen name="EmailPassword" component={EmailPasswordScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
