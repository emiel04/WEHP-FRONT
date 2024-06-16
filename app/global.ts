export interface Global {
  user: User | null;
}

export interface User {
  name: string;
  isWehp: boolean;
}

export default {
  // user: null,
} as Global;
