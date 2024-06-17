import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { ReactNode } from "react";
import { NativeStackNavigatorProps } from "react-native-screens/lib/typescript/native-stack/types";
import { useAuth } from "../../context/AuthContext";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import { Button } from "@ui-kitten/components";
import Add from "../pages/Add";
import { useUser } from "../../context/UserContext";
import { View } from "react-native";

interface NavigationLayoutProps {
  children?: ReactNode;
  Stack: NativeStackNavigatorProps;
}

const NavigationLayout = ({ children, Stack }: NavigationLayoutProps) => {
  const { authState } = useAuth();
  const { user } = useUser();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerRight: () => NavigationHeader(),
                title: user?.isWehp ? "Wehp" : "Mijn streepjes",
              }}
            />
            <Stack.Screen name="Categories" component={Categories} />
            {user?.isWehp && <Stack.Screen name="Add" component={Add} />}
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

const NavigationHeader = () => {
  const navigation = useNavigation();
  const { onLogout } = useAuth();
  const { user } = useUser();

  return (
    <View style={{ flexDirection: "row", padding: 16 }}>
      <Button onPress={onLogout} style={{ marginRight: user?.isWehp ? 16 : 0 }}>
        Logout
      </Button>
      {user?.isWehp && (
        <Button
          onPress={() => {
            navigation.navigate("Add" as never);
          }}
        >
          {"     +     "}
        </Button>
      )}
    </View>
  );
};

export default NavigationLayout;
