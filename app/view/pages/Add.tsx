import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import userService from "../../services/userService";
import { useUser } from "../../context/UserContext";
import { Text } from "@ui-kitten/components";
import StreepjeBlock from "../components/StreepjeComponent";

const Add = () => {
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
      {user?.isWehp && <StreepjeBlock></StreepjeBlock>}
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
export default Add;
