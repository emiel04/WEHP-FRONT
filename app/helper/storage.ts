import AsyncStorage from "@react-native-async-storage/async-storage";

function getItem(key: string) {
  return AsyncStorage.getItem(key);
}

function setItem(key: string, value: any) {
  return AsyncStorage.setItem(key, value);
}

function deleteItem(key: string) {
  return AsyncStorage.removeItem(key);
}

export { getItem, setItem, deleteItem };
