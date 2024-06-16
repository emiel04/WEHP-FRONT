import { Button, TextInput, View, StyleSheet, Pressable } from "react-native";
import { IndexPath, Select, SelectItem, Text } from "@ui-kitten/components";
import { Input } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import userService from "../../services/userService";

const Login = () => {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { onLogin } = useAuth();

  const [usernames, setUsernames] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState<IndexPath>(
    new IndexPath(0),
  );
  const displayValue = usernames[selectedIndex.row];

  useEffect(() => {
    userService.getUsernames().then((usernames) => {
      setUsernames(usernames ?? []);
    });
  }, []);

  async function handleLogin() {
    const response = await onLogin(name, pin);

    if (response?.error) {
      setError(response.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WEHP</Text>
      <Select
        selectedIndex={selectedIndex}
        placeholder={"Select your username"}
        value={displayValue}
        onSelect={(index: IndexPath) => setSelectedIndex(index)}
      >
        {usernames && usernames.length > 0 ? (
          usernames.map((username) => (
            <SelectItem key={username} title={username} />
          ))
        ) : (
          <SelectItem title="No usernames available" />
        )}
      </Select>
      <Input
        style={styles.input}
        placeholder="PIN"
        value={pin}
        onChangeText={setPin}
        secureTextEntry
        inputMode="numeric"
        maxLength={5}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
});
export default Login;
