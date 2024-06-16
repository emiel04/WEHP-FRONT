interface Category {
  id: number;
  name: string;
}

interface Streepje {
  userId: number;
  categoryId: number;
  reason: string;
}

export { Category, Streepje };
