import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Center,
  Group,
  Loader,
  Notification,
  Select,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { createTask, getTasks } from "./api";
import type { Task } from "./types";

function App() {
  const [createdTask, setCreatedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      status: "Todo",
      dueDateTime: null as string | null,
    },
    validate: {
      title: (value) =>
        value.trim().length === 0 ? "Title is required" : null,
      status: (value) => (!value ? "Status is required" : null),
      dueDateTime: (value) => (!value ? "Due date/time is required" : null),
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    setSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    setCreatedTask(null);

    try {
      const payload = {
        title: values.title.trim(),
        description: values.description.trim() || null,
        status: values.status,
        dueDateTime: values.dueDateTime,
      };
      console.log(payload);

      const task = await createTask(payload);
      setCreatedTask(task);
      setSuccessMessage("Task created successfully!");
      form.reset();
      await loadTasks();
    } catch (err: any) {
      setErrorMessage(err.message ?? "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  });

  const loadTasks = async () => {
    try {
      setLoadingTasks(true);
      const all = await getTasks();
      setTasks(all);
    } catch (err: any) {
      setErrorMessage(err.message ?? "Failed to load tasks");
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Box p="md" maw={800} mx="auto">
      <Title order={2} mb="md">
        Create a New Task
      </Title>

      {/* existing form */}
      <form onSubmit={handleSubmit}>
        <Stack>
          {errorMessage && (
            <Notification color="red" onClose={() => setErrorMessage(null)}>
              {errorMessage}
            </Notification>
          )}

          {successMessage && (
            <Notification color="green" onClose={() => setSuccessMessage(null)}>
              {successMessage}
            </Notification>
          )}

          <TextInput
            label="Title"
            placeholder="Enter task title"
            withAsterisk
            {...form.getInputProps("title")}
          />

          <Textarea
            label="Description"
            placeholder="Optional description"
            minRows={3}
            {...form.getInputProps("description")}
          />

          <Select
            label="Status"
            withAsterisk
            data={[
              { value: "Todo", label: "To do" },
              { value: "InProgress", label: "In progress" },
              { value: "Done", label: "Done" },
            ]}
            {...form.getInputProps("status")}
          />

          <DateTimePicker
            label="Due date & time"
            withAsterisk
            value={form.values.dueDateTime}
            onChange={(value) => form.setFieldValue("dueDateTime", value)}
            placeholder="Pick date and time"
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit" loading={submitting}>
              Create Task
            </Button>
          </Group>
        </Stack>
      </form>

      {createdTask && (
        <Card mt="xl" shadow="sm" radius="md" withBorder>
          <Text fw={500} mb="xs">
            Last created task:
          </Text>
          <Text>
            <strong>Title:</strong> {createdTask.title}
          </Text>
          {createdTask.description && (
            <Text>
              <strong>Description:</strong> {createdTask.description}
            </Text>
          )}
          <Text>
            <strong>Status:</strong> {createdTask.status}
          </Text>
          <Text>
            <strong>Due:</strong>{" "}
            {dayjs(createdTask.dueDateTime).format("YYYY-MM-DD HH:mm")}
          </Text>
          <Text mt="xs" size="xs" c="dimmed">
            ID: {createdTask.id}
          </Text>
        </Card>
      )}

      <Title order={3} mt="xl" mb="sm">
        All Tasks
      </Title>

      {loadingTasks ? (
        <Center>
          <Loader />
        </Center>
      ) : tasks.length === 0 ? (
        <Text size="sm" c="dimmed">
          No tasks created yet.
        </Text>
      ) : (
        <Table striped highlightOnHover withTableBorder mt="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Due</Table.Th>
              <Table.Th>Description</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tasks.map((task) => (
              <Table.Tr key={task.id}>
                <Table.Td>{task.title}</Table.Td>
                <Table.Td>{task.status}</Table.Td>
                <Table.Td>
                  {dayjs(task.dueDateTime).format("YYYY-MM-DD HH:mm")}
                </Table.Td>
                <Table.Td>{task.description ?? "-"}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      )}
    </Box>
  );
}

export default App;
