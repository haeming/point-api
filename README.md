# point-api
NestJS 기반 포인트 관리 API 서버입니다.

## 1. 실행 방법

### 사전 요구사항
- Node.js 18 이상
- npm 9 이상

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run start
```

## 2. 프로젝트 구조
```
src/
├── auth/
│   ├── controller/
│   │   └── auth.controller.ts
│   ├── dtos/
│   │   ├── login.request.dto.ts
│   │   ├── login.response.dto.ts
│   │   ├── signup.request.dto.ts
│   │   └── signup.response.dto.ts
│   ├── service/
│   │   └── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   └── auth.module.ts
│
├── common/
│   ├── data/
│   │   └── memory.db.ts
│   ├── enum/
│   │   └── transaction-type.enum.ts
│   ├── exceptions/
│   │   └── balance.exception.ts
│   └── common.module.ts
│
├── point/
│   ├── controller/
│   │   └── point.controller.ts
│   ├── dtos/
│   │   ├── balance.request.dto.ts
│   │   ├── balance.response.dto.ts
│   │   ├── history.request.dto.ts
│   │   ├── history.response.dto.ts
│   │   ├── history-list.response.dto.ts
│   │   ├── point-transaction.request.dto.ts
│   │   └── point-transaction.response.dto.ts
│   ├── service/
│   │   └── point.service.ts
│   ├── point.data.ts
│   └── point.module.ts
│
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## 3. API 명세

### Base URL
```
http://localhost:3000/api
```

### 인증 (Authentication)
로그인 후 발급받은 JWT 토큰을 사용하여 인증이 필요한 API를 호출할 수 있습니다.
### Headers
`Authorization: Bearer {token}`
### 인증이 필요한 API
- 포인트 조회
- 포인트 적립
- 포인트 사용
- 포인트 내역 조회

---

### 1. 회원가입

**Endpoint**
```
POST /auth/signup
```

**Request Body**
```json
{
  "userId": "1234",
  "password": "1234"
}
```

**Response**
- **Status Code:** 201 Created
```json
{
  "userId": "1234",
  "message": "회원가입이 완료되었습니다."
}
```

**Error Response**
- **Status Code:** 400 Bad Request
```json
{
  "message": "이미 존재하는 사용자입니다.",
  "error": "Bad Request",
  "statusCode": 400
}
```

---

### 2. 로그인

**Endpoint**
```
POST /auth/login
```

**Request Body**
```json
{
  "userId": "1234",
  "password": "1234"
}
```

**Response**
- **Status Code:** 201 Created
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0IiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "expiresIn": 3600,
  "userId": "1234"
}
```

**Error Response**
- **Status Code:** 401 Unauthorized
```json
{
  "message": "아이디 또는 비밀번호가 일치하지 않습니다.",
  "error": "Unauthorized",
  "statusCode": 401
}
```

---

### 3. 포인트 조회

**Endpoint**
```
GET /point/balance/{userId}
```

**Path Parameters**
- `userId`: 사용자 ID (예: "1234")

**Response**

초기 가입 시 포인트는 0으로 시작합니다.

- **Status Code:** 200 OK
```json
{
  "balance": 0
}
```

---

### 4. 포인트 적립

**Endpoint**
```
POST /point/earn/{userId}
```

**Path Parameters**
- `userId`: 사용자 ID (예: "1234")

**Request Body**
```json
{
  "amount": 50
}
```

**Response**

기존 잔액이 500원일 경우 50원 적립 후 결과입니다.

- **Status Code:** 201 Created
```json
{
  "userId": "1234",
  "newBalance": 550,
  "amount": 50,
  "transactionId": 14,
  "timestamp": "2025-11-09T05:06:24.025Z"
}
```

---

### 5. 포인트 내역 조회

**Endpoint**
```
GET /point/history/{userId}
```

**Path Parameters**
- `userId`: 사용자 ID (예: "1234")

**Response**
- **Status Code:** 200 OK
```json
{
  "userId": "1234",
  "transactions": [
    {
      "id": 5,
      "type": "EARN",
      "amount": 50,
      "timestamp": "2025-11-09T05:51:12.642Z"
    },
    {
      "id": 4,
      "type": "EARN",
      "amount": 50,
      "timestamp": "2025-11-09T05:51:12.489Z"
    },
    {
      "id": 3,
      "type": "EARN",
      "amount": 50,
      "timestamp": "2025-11-09T05:51:12.334Z"
    }
  ]
}
```

**참고:** `type` 필드는 `EARN`(적립) 또는 `USE`(사용)를 나타냅니다.

---

### 6. 포인트 사용

**Endpoint**
```
POST /point/use/{userId}
```

**Path Parameters**
- `userId`: 사용자 ID (예: "1234")

**Request Body**
```json
{
  "amount": 500
}
```

**Response**
- **Status Code:** 201 Created
```json
{
  "userId": "1234",
  "newBalance": 200,
  "amount": 500,
  "transactionId": 15,
  "timestamp": "2025-11-09T05:51:20.206Z"
}
```

**Error Response**
- **Status Code:** 400 Bad Request
```json
{
  "message": "잔액이 부족합니다.",
  "error": "Bad Request",
  "statusCode": 400
}
```
