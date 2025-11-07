# Simple Point API Server

This is a simple API server for managing user points.

## Installation

```bash
npm install
```

## Running the Server

```bash
node src/app.js
```

The server will start on `http://localhost:3000`.

## API Usage

All APIs require an `x-api-key` header with the value `test-key`.

### Earn Points

* **URL:** `/api/earn`
* **Method:** `POST`
* **Headers:**
  * `Content-Type: application/json`
  * `x-api-key: test-key`
* **Body:**

```json
{
  "userId": "user1",
  "points": 100
}
```

**Example (curl):**

```bash
curl -X POST http://localhost:3000/api/earn -H "Content-Type: application/json" -H "x-api-key: test-key" -d '{"userId": "user1", "points": 100}'
```

### Get Balance

* **URL:** `/api/balance`
* **Method:** `GET`
* **Headers:**
  * `x-api-key: test-key`
* **Query Parameters:**
  * `userId`

**Example (curl):**

```bash
curl http://localhost:3000/api/balance?userId=user1 -H "x-api-key: test-key"
```

### Get History

* **URL:** `/api/history`
* **Method:** `GET`
* **Headers:**
  * `x-api-key: test-key`
* **Query Parameters:**
  * `userId`

**Example (curl):**

```bash
curl http://localhost:3000/api/history?userId=user1 -H "x-api-key: test-key"
```
