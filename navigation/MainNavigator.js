import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Register from "../screens/Register";
import ChatScreen from "../screens/ChatScreen";
import Splash from "../screens/Splash";
import { useLogin } from "../context/LoginProvider";
import ColorsPPS from "../utils/ColorsPPS";
const Stack = createNativeStackNavigator();

const Init = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        component={Splash}
        options={{ headerShown: false }}
        name="Splash"
      />
      <Stack.Screen
        component={Login}
        options={{ headerShown: false }}
        name="Login"
      />
      <Stack.Screen
        component={Register}
        options={{ headerShown: false }}
        name="Registro"
      />
    </Stack.Navigator>
  );
};
const MainStack = () => {
  const { setSalaA, salaA } = useLogin();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Home}
        options={{
          headerShown: false,
        }}
        name="Home"
      />
      <Stack.Screen
        component={ChatScreen}
        options={{
          headerBackTitle: "Volver",
          title: salaA ? "Chat 4A" : "Chat 4B",
          headerStyle: {
            backgroundColor: salaA ? ColorsPPS.violeta : ColorsPPS.moradoOscuro,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
        name="ChatScreen"
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { isFinishSplash, isLogIn } = useLogin();

  return isLogIn ? <MainStack /> : <Init />;
};

export default MainNavigator;
