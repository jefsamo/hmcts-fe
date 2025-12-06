export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: "Todo" | "InProgress" | "Done";
  dueDateTime: string; // ISO
}

export interface CreateTaskPayload {
  title: string;
  description?: string | null;
  status: string;
  dueDateTime: string | null;
}
