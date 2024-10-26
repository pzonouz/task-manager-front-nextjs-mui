export type Task = {
  id?: string;
  title?: string;
  description?: string;
  status?: "PR" | "CM" | "CN";
  completed?: boolean;
  owner?: string;
  category?: string;
  project?: string;
  tags?: string;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
};
