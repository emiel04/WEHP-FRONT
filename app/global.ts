export interface Global {
  user: User | null;
}

export interface User {
  id: number;
  name: string;
  isWehp: boolean;
}

export default {
  // user: null,
} as Global;
