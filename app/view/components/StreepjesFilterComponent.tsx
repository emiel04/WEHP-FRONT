import React, { useEffect, useState } from "react";
import { User } from "../../global";
import userService from "../../services/userService";
import { getItem } from "../../helper/storage";
import { KEY_LASTLOGIN } from "../../config/config";
import {
  IndexPath,
  Input,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import categoryService from "../../services/categoryService";
import { Category } from "../../config/types";
import { Button, View } from "react-native";
import { MyStreepjes } from "./MyStreepjesComponent";

export const StreepjesFilter = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedNameIndex, setSelectedNameIndex] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));

  const selectedUser = Array.isArray(selectedNameIndex)
    ? users[selectedNameIndex[0].row]
    : users[selectedNameIndex.row];
  useEffect(() => {
    userService.getUsers(false).then((user) => {
      setUsers(user ?? []);
    });
  }, []);
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
        }}
      >
        Bekijk streepjes van:
      </Text>
      <Select
        selectedIndex={selectedNameIndex}
        placeholder={"Kies een naam"}
        value={selectedUser?.name}
        onSelect={(index) => setSelectedNameIndex(index)}
      >
        {users && users.length > 0 ? (
          users.map((user) => <SelectItem key={user.id} title={user.name} />)
        ) : (
          <SelectItem title="No usernames available" />
        )}
      </Select>
      {selectedUser && (
        <View style={{ height: "100%" }}>
          <MyStreepjes userId={selectedUser.id}></MyStreepjes>
        </View>
      )}
    </View>
  );
};
