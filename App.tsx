import Home from "./app/view/pages/Home";
import { AuthProvider } from "./app/context/AuthContext";
import NavigationLayout from "./app/view/layouts/NavigationLayout";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./app/context/UserContext";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
const Stack = createNativeStackNavigator();
import { default as theme } from "./assets/theme.json"; //
import { EvaIconsPack } from "@ui-kitten/eva-icons";
export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <NavigationLayout Stack={Stack}>
            <Home />
          </NavigationLayout>
        </ApplicationProvider>
      </UserProvider>
    </AuthProvider>
  );
}
