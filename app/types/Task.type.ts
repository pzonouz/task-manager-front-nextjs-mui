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
};
