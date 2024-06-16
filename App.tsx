import Home from "./app/view/pages/Home";
import { AuthProvider } from "./app/context/AuthContext";
import NavigationLayout from "./app/view/layouts/NavigationLayout";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UserProvider } from "./app/context/UserContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <NavigationLayout Stack={Stack}>
          <Home />
        </NavigationLayout>
      </UserProvider>
    </AuthProvider>
  );
}
