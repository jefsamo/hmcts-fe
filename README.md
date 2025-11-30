<<<<<<< HEAD
# Task Manager Frontend
=======
# HMCTS Take Home Task Manager Frontend
>>>>>>> 28f7377280ec98921a89b10c78bccb28d68dae4c

This is the frontend for the Task Manager application.  
It allows users to create tasks and view the details of the newly created task.

- **Framework:** React + TypeScript
- **Build tool:** Vite
- **UI library:** Mantine (`@mantine/core`, `@mantine/dates`)
- **HTTP:** native `fetch` API
<<<<<<< HEAD
- **Backend:** ASP.NET Core Web API (separate project)
=======
- **Backend:** ASP.NET Core Web API [here](https://www.metacareers.com/jobs](https://github.com/jefsamo/hmcts-backend)
>>>>>>> 28f7377280ec98921a89b10c78bccb28d68dae4c

---

## Features

- Task creation form with:
  - **Title** (required)
  - **Description** (optional)
  - **Status** (Todo / InProgress / Done)
  - **Due date & time** (required, using Mantine `DateTimePicker`)
- Client-side validation (required fields, basic checks)
- API integration with the backend `POST /api/tasks`
- Success notification and a card showing the created task’s details
- Error notification if the API request fails (validation/server errors)

---

## Project Structure

```txt
src/
  api.ts          # API helper for calling the backend
  App.tsx         # Main UI / task creation form
  main.tsx        # App bootstrap with MantineProvider
  types.ts        # Shared TypeScript interfaces (Task, CreateTaskPayload)
  ...
```
