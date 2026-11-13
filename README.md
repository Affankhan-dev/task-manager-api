# Task Manager API

A simple Task Manager project built with Node.js and Express.js. It includes a command-line tool, a core HTTP server, and a RESTful API.

Task data is stored in an in-memory JavaScript array. No database is used, so data resets whenever the server restarts.

## Requirements

- Node.js 18+
- npm
- Postman (for API testing)

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
```

Install dependencies:

```bash
npm install
```

## Running the Project

### Part A: CLI Tool

```bash
node cli.js "My task"
```

### Part B: Core HTTP Server

```bash
node http-server.js
```

Server runs at `http://localhost:3000`.

Available routes:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Welcome message |
| GET | `/tasks` | Get all tasks |
| GET | `/about` | Get application information |
| POST | `/tasks` | Create a task |

### Parts C and D: Express REST API

```bash
node app.js
```

API runs at `http://localhost:3000`.

**Important:** Run the core HTTP server and Express server separately because both use port 3000.

## Express API Endpoints

| Method | Endpoint | Description | Success | Errors |
|---|---|---|---|---|
| GET | `/api/v1/tasks` | Get all tasks | 200 | - |
| GET | `/api/v1/tasks/:id` | Get one task | 200 | 404 |
| POST | `/api/v1/tasks` | Create a task | 201 | 400 |
| PUT | `/api/v1/tasks/:id` | Update a task | 200 | 400, 404 |
| DELETE | `/api/v1/tasks/:id` | Delete a task | 200 | 404 |

## Example Requests

### Create a Task

POST `/api/v1/tasks`

Body (JSON):

```json
{
  "title": "Buy groceries"
}
```

Response (201):

```json
{
  "id": 1,
  "title": "Buy groceries",
  "completed": false
}
```

### Get All Tasks

GET `/api/v1/tasks`

### Get One Task

GET `/api/v1/tasks/1`

### Update a Task

PUT `/api/v1/tasks/1`

Body (JSON):

```json
{
  "title": "Complete assignment",
  "completed": true
}
```

### Delete a Task

DELETE `/api/v1/tasks/1`

## Task Object Structure

| Field | Type | Description |
|---|---|---|
| id | Number | Auto-generated unique ID |
| title | String | Required task title |
| completed | Boolean | Defaults to false |

## HTTP Status Codes

- **200 OK:** Request completed successfully.
- **201 Created:** New task created successfully.
- **400 Bad Request:** Invalid request data.
- **404 Not Found:** Requested task or route does not exist.

## Technologies Used

- Node.js
- Core HTTP Module
- Express.js
- JavaScript
- Postman

## Data Storage

Tasks are stored in an in-memory array. All task data is temporary and resets when the Express server restarts.