import type { Task, CreateTaskPayload } from "./types";

const BASE_URL = "https://localhost:7204"; // match backend

export async function createTask(payload: CreateTaskPayload): Promise<Task> {
  const response = await fetch(`${BASE_URL}/api/v1/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message =
      (data && (data.error || data.title || data.detail)) ??
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return response.json();
}
