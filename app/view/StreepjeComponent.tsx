import { Button, View } from "react-native";
import {
  IndexPath,
  Input,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import userService from "../services/userService";
import { Category } from "../config/types";
import categoryService from "../services/categoryService";
import { User } from "../global";
import streepService from "../services/streepService";
const StreepjeBlock = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [output, setOutput] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedNameIndex, setSelectedNameIndex] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));

  const [selectedCatIndex, setSelectedCatIndex] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));

  const selectedUser = Array.isArray(selectedNameIndex)
    ? users[selectedNameIndex[0].row]
    : users[selectedNameIndex.row];

  const selectedCategory = Array.isArray(selectedCatIndex)
    ? categories[selectedCatIndex[0].row]
    : categories[selectedCatIndex.row];

  const [reason, setReason] = React.useState("");

  useEffect(() => {
    userService.getUsers(false).then((user) => {
      setUsers(user ?? []);
    });

    categoryService.getCategories().then((categories) => {
      if (categories?.hasOwnProperty("error")) {
        console.error("Error getting categories");
        return;
      }
      setCategories((categories as Category[]) ?? []);
    });
  }, []);

  function addStreepje(user: User, category: Category, reason: string) {
    streepService
      .addStreepje({
        userId: user.id,
        categoryId: category.id,
        reason,
      })
      .then(() => {
        setOutput("Streepje toegevoegd!");
        setSelectedCatIndex(new IndexPath(0));
        setReason("");
      });
  }

  return (
    <View>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
        }}
      >
        Wie is de misdadiger?
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
      <Select
        selectedIndex={selectedCatIndex}
        placeholder={"Kies een categorie"}
        value={selectedCategory?.name}
        onSelect={(index) => setSelectedCatIndex(index)}
      >
        {categories && categories.length > 0 ? (
          categories.map((cat) => <SelectItem key={cat.id} title={cat.name} />)
        ) : (
          <SelectItem title="No categories available" />
        )}
      </Select>

      <Input
        multiline={true}
        placeholder="Reden"
        value={reason}
        onChangeText={setReason}
        style={{ minHeight: 64 }}
      />

      <Button
        title="Voeg streepje toe"
        onPress={() => addStreepje(selectedUser, selectedCategory, reason)}
      ></Button>

      <Text>{output}</Text>
    </View>
  );
};

export default StreepjeBlock;
