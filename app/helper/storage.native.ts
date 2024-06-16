import * as SecureStore from "expo-secure-store";

function getItem(key: string) {
  return SecureStore.getItemAsync(key);
}

function setItem(key: string, value: any) {
  return SecureStore.setItemAsync(key, value);
}

function deleteItem(key: string) {
  return SecureStore.deleteItemAsync(key);
}

export { getItem, setItem, deleteItem };
