import { Category } from "./Category.type";
import { Prioirity } from "./Priority.type";

export type TaskType = {
  id?: string;
  title?: string;
  description?: string;
  status?: "PR" | "CM" | "CN";
  completed?: boolean;
  percentage: number;
  owner?: string;
  category?: string;
  priority?: string;
  project?: string;
  tags?: string;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
  category_full?: Category;
  priority_full?: Prioirity;
};
