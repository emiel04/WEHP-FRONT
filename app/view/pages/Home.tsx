import React, { useEffect, useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import userService from "../../services/userService";
import { useUser } from "../../context/UserContext";

const Home = () => {
  const navigation = useNavigation();
  const { user, setUser } = useUser();
  useEffect(() => {
    async function main() {
      const user = await userService.getMe();
      setUser(user);
    }
    main();
  }, []);

  return (
    <View style={stylesheet.container}>
      <Text>Hallo {user?.name}</Text>
      {user?.isWehp && <Text>Ben je klaar om Jules en Emiel te straffen?</Text>}
      {user?.isWehp && (
        <Button
          title="Go to Category"
          onPress={() => navigation.navigate("Categories" as never)}
        />
      )}
    </View>
  );
};
const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Home;
