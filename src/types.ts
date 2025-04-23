export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
}

export type FilterState = "all" | "active" | "completed";

export type ReorderHandler = (fromIdx: number, toIdx: number) => void;
