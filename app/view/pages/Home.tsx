import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import userService from "../../services/userService";
import { useUser } from "../../context/UserContext";
import { Text } from "@ui-kitten/components";
import StreepjeBlock from "../components/StreepjeComponent";
import { MyStreepjes } from "../components/MyStreepjesComponent";
import { StreepjesFilter } from "../components/StreepjesFilterComponent";
import { components } from "@eva-design/eva/mapping";
import height = components.Avatar.meta.parameters.height;

const Home = () => {
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
      <Text>Hallo {user?.name ?? ""}</Text>
      {!user?.isWehp && (
        <View style={{ height: "30%", width: "100%" }}>
          <MyStreepjes userId={user?.id ?? 0}></MyStreepjes>
        </View>
      )}

      <View style={{ height: "70%", width: "100%" }}>
        <StreepjesFilter></StreepjesFilter>
      </View>
    </View>
  );
};
const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 16,
    paddingHorizontal: 16,
  },
});
export default Home;
