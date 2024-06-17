interface Category {
  id: number;
  name: string;
}

interface Streepje {
  id: number;
  userId: number;
  categoryId: number;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}
interface StreepjeCreate {
  userId: number;
  categoryId: number;
  reason: string;
}

interface FullStreepje {
  id: number;
  userId: number;
  category: Category;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}

export { Category, Streepje, FullStreepje, StreepjeCreate };
