import { Button, TextInput, View, StyleSheet, Pressable } from "react-native";
import { IndexPath, Select, SelectItem, Text } from "@ui-kitten/components";
import { Input } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import userService from "../../services/userService";
import { getItem, setItem } from "../../helper/storage";
import { jwtDecode } from "jwt-decode";
import { KEY_LASTLOGIN } from "../../config/config";
const Login = () => {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { onLogin } = useAuth();

  const [usernames, setUsernames] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));

  const displayValue = Array.isArray(selectedIndex)
    ? usernames[selectedIndex[0].row]
    : usernames[selectedIndex.row];

  useEffect(() => {
    userService.getUsernames().then(async (usernames) => {
      setUsernames(usernames ?? []);
      const sub = await getItem(KEY_LASTLOGIN);
      if (usernames.includes(sub)) {
        setSelectedIndex(new IndexPath(usernames.indexOf(sub)));
      }
    });
  }, []);

  function pinChange(pin: string) {
    setPin(pin);
    if (pin.length === 5) {
      handleLogin(pin);
    }
  }

  async function handleLogin(p: string) {
    const response = await onLogin(displayValue, p);

    if (response?.error) {
      setError(response.message);
    } else {
      const token = response.token;
      const decoded = jwtDecode(token);
      await setItem(KEY_LASTLOGIN, decoded.sub);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WEHP</Text>
      <Select
        selectedIndex={selectedIndex}
        placeholder={"Select your username"}
        value={displayValue}
        onSelect={(index) => setSelectedIndex(index)}
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
        onChangeText={pinChange}
        secureTextEntry
        inputMode="numeric"
        maxLength={5}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Login" onPress={() => handleLogin(pin)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 120,
    gap: 6,
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
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
});
export default Login;
