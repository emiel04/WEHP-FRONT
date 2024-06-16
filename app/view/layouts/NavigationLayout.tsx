import { NavigationContainer } from "@react-navigation/native";
import { ReactNode } from "react";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";
import { useAuth } from "../../context/AuthContext";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import { Button } from "react-native";

interface NavigationLayoutProps {
  children?: ReactNode;
  Stack: NativeStackNavigatorProps;
}

const NavigationLayout = ({ children, Stack }: NavigationLayoutProps) => {
  const { authState, onLogout } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerRight: () => (
                  <Button onPress={onLogout} title={"Logout"} />
                ),
              }}
            />
            <Stack.Screen name="Categories" component={Categories} />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationLayout;
