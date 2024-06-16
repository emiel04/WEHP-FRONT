import {
  Button,
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { onLogin } = useAuth();

  async function handleLogin() {
    const response = await onLogin(name, pin);

    if (response?.error) {
      setError(response.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WEHP</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
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
