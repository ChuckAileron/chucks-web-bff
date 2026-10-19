# CHUCK's Web — BFF

![NestJS](https://img.shields.io/badge/NestJS-12-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vitest](https://img.shields.io/badge/testing-Vitest-6E9F18?logo=vitest&logoColor=white)

Backend For Frontend (BFF) de **CHUCK's Web**: una capa de proxy delgada y *stateless* en NestJS que agrupa y enruta las llamadas del frontend hacia el backend real. El frontend habla **solo** con este servicio; el BFF reenvía cada petición al backend en `BACKEND_URL` (mismo path) y devuelve la respuesta tal cual.

> **Arquitectura:** [`chucks-web-frontend`](../chucks-web-frontend) (`:5177`) → **este repo** (`:3000`) → [`chucks-web-backend`](../chucks-web-backend) (`:3001` + PostgreSQL)

## Arquitectura

```
Controller (rutas) → Service (HttpModule) → BackendProxyService.forward() → Backend
```

- **`src/common/backend-proxy.service.ts`** — clase base compartida: resuelve `BACKEND_URL` desde `ConfigService`, envuelve el Observable de Axios con `firstValueFrom` y devuelve solo `response.data`.
- **Errores transparentes:** si el backend responde, se relanza `HttpException(data, status)`; si no responde → `BadGatewayException('Backend unavailable')`.
- **`ValidationPipe({ whitelist: true, transform: true })`** global y `ParseIntPipe` en params numéricos. La validación real de payloads la hace el backend (aún no hay DTOs propios).
- **Sin base de datos, sin autenticación, sin estado:** cada arranque arranca limpio.

### Timeouts por módulo

| Timeout | Módulos |
|---|---|
| 5 s | tasks, collections, wiki |
| 10 s | accounts, hijitos, weight |
| 30 s | calendar |
| 60 s | wishlist, launchbox, shopping, images (operaciones con scraping) |

## Stack

| Área | Tecnología |
|---|---|
| Framework | NestJS 12 (ESM, `"type": "module"`) |
| HTTP saliente | `@nestjs/axios` + Axios |
| Config | `@nestjs/config` (`ConfigService`) |
| Validación | `class-validator` + `class-transformer` (preparados para DTOs) |
| Tests | **Vitest** + Supertest (no Jest) |
| Lint / Format | Oxlint (`--type-aware`) + Prettier |

## Requisitos

- El [`chucks-web-backend`](../chucks-web-backend) levantado (por defecto en `http://localhost:3001`).

## Puesta en marcha

```bash
npm install
cp .env.example .env   # y ajusta BACKEND_URL/PORT si hace falta
npm run start:dev
```

El BFF queda en **http://localhost:3000** (log: `BFF running on http://localhost:3000`).

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `BACKEND_URL` | `http://localhost:3001` | URL base del backend — `src/common/backend-proxy.service.ts` |
| `PORT` | `3000` | Puerto HTTP del BFF — `src/main.ts` |

Ver `.env.example`. `dotenv/config` se carga al arrancar.

## Scripts

| Script | Descripción |
|---|---|
| `npm run dev` / `npm run start:dev` | Desarrollo con watch |
| `npm run start:debug` | Debug (`--inspect-brk` + watch) |
| `npm run start` / `start:prod` | Arranque simple / producción (`node dist/main`) |
| `npm run build` | `nest build` |
| `npm run lint` | Oxlint type-aware sobre `src/` y `test/` |
| `npm run format` | Prettier |
| `npm test` / `test:watch` / `test:cov` | Vitest (unitarios) |
| `npm run test:e2e` | E2E con `vitest.config.e2e.ts` |
| `npm run deploy` | Deploy vía `@nestjs/mau` |

## Endpoints

~66 endpoints: `GET /health` más un bloque por módulo que replica el path del backend.

| Módulo | Rutas |
|---|---|
| **App** | `GET /health` → `{ status: 'ok', service: 'chucks-web-bff' }` |
| **tasks** | `GET/POST /tasks`, `GET/PATCH/DELETE /tasks/:id` |
| **collections** | `GET/POST /collections`, `GET/PATCH/DELETE /collections/:id`, `PUT /collections/reorder`, `POST /collections/import`, `GET /collections/:id/export`, `GET/POST /collections/:id/items`, `PATCH/DELETE /collections/items/:itemId` |
| **wishlist** | `GET/POST /wishlist`, `POST /wishlist/refresh`, `POST /wishlist/:id/prices`, `POST /wishlist/prices/:priceId/refresh`, `DELETE /wishlist/prices/:priceId`, `PATCH/DELETE /wishlist/:id` |
| **launchbox** | `POST /launchbox/single`, `/apply-one`, `/csv/parse`, `/match-rows`, `/bulk`, `/apply-bulk`, `/apply-results-csv`, `GET /launchbox/bulk/:jobId`, `/bulk/:jobId/results`, `POST /launchbox/bulk/:jobId/cancel` |
| **images** | `POST /images/search` |
| **wiki** | `GET/POST /wiki/pages`, `GET/PATCH/DELETE /wiki/pages/:id`, `GET /wiki/categories`, `POST /wiki/categories/banner`, `GET /wiki/stats` |
| **shopping** | `GET/POST /shopping/contexts`, `DELETE /shopping/contexts/:id`, `GET /shopping/contexts/:id/items`, `POST /shopping/contexts/:id/links`, `POST /shopping/contexts/:id/refresh`, `DELETE /shopping/contexts/:id/inactive` |
| **hijitos** | `GET /hijitos`, `GET/PUT /hijitos/banner`, `PATCH /hijitos/tracks/:slug`, `POST /hijitos/tasks`, `PATCH/DELETE /hijitos/tasks/:id`, `POST /hijitos/tasks/:id/subtasks`, `PATCH/DELETE /hijitos/subtasks/:id` |
| **accounts** | `GET/POST /accounts`, `PUT /accounts/reorder`, `GET/PATCH/DELETE /accounts/:id`, `GET /accounts/:id/registers`, `GET /accounts/:id/years`, `GET /accounts/:id/monthly`, `POST /accounts/registers`, `PATCH/DELETE /accounts/registers/:id` |
| **calendar** | `GET /calendar/colors`, `GET /calendar/events`, `POST /calendar/events`, `PATCH/DELETE /calendar/events/:id`, `POST /calendar/holidays/:year/refresh` |
| **weight** | `GET /weight`, `PUT /weight/target`, `POST /weight/entries`, `DELETE /weight/entries/:date` |

## CORS

Habilitado solo para el frontend en desarrollo:

```ts
['http://localhost:5177', 'http://127.0.0.1:5177']
```

## Estructura

```
src/
├── main.ts                       # Bootstrap: dotenv, CORS, ValidationPipe, PORT
├── app.module.ts                 # Registro de los 11 módulos
├── app.controller.ts             # GET /health
├── common/
│   └── backend-proxy.service.ts  # Clase base del proxy (forward, errores)
└── <modulo>/
    ├── <modulo>.module.ts
    ├── <modulo>.controller.ts    # Rutas
    └── <modulo>.service.ts       # Llamada HTTP al backend
test/                             # E2E (supertest contra /health)
```

## Notas

- El BFF **no consume APIs externas**: búsquedas de imágenes, scraping de precios y festivos los resuelve el backend.
- Sin autenticación: la seguridad/usuarios, si se añade, vivirá en el backend.
- Los módulos `tasks`, `wishlist` y `app` tienen tests unitarios que mockean `HttpService` y `ConfigService`.
