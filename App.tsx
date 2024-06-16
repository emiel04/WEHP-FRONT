import Home from "./app/view/pages/Home";
import { AuthProvider } from "./app/context/AuthContext";
import NavigationLayout from "./app/view/layouts/NavigationLayout";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./app/context/UserContext";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
const Stack = createNativeStackNavigator();
import { default as theme } from "./assets/theme.json"; //
export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <NavigationLayout Stack={Stack}>
            <Home />
          </NavigationLayout>
        </ApplicationProvider>
      </UserProvider>
    </AuthProvider>
  );
}
