# point-api

NestJS 기반 포인트 관리 API 서버입니다.  

---

## 현재 진행상황
- NestJS 기본 구조 설정 (AppModule, main.ts)
- 서버 정상 구동 확인 (AppController / AppService)
- CommonModule 분리 및 MemoryDb provider 관리
- Points API 개발 예정 (/points/earn, /points/use, /points/balance)

---

## 기술 스택
- **Node.js (v22)**  
- **NestJS (v11)**  
- **TypeScript (v5)**  
- **In-memory DB (임시 데이터 저장용 MemoryDb)**  

---

## 구조 예시
```
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
│
├── auth/
│   ├── dtos/
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
│
├── common/
│   ├── data/
│   │   └── memory.db.ts
│   ├── dtos/
│   │   └── user.response.dto.ts
│   └── common.module.ts
│
└── point/
    ├── dtos/
    ├── point.controller.ts
    ├── point.data.ts
    ├── point.module.ts
    └── point.service.ts
```

---

## 비고
현재는 초기 세팅 단계이며,  
이후 기능 단위 모듈(PointsModule 등) 추가 및 API 구현 예정.
