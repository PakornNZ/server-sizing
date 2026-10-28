# Server Sizing Frontend

Next.js application for LLM model, GPU server, DGX Spark, and application infrastructure sizing.

## Local Setup

```bash
npm ci
copy .env.example .env
npm run db:generate
npm run dev
```

The repository includes `data/model_dashboard.sqlite` with the current catalog. The application is available at `http://localhost:3000` without a sign-in step.

## Validation

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

The browser smoke test uses Microsoft Edge by default:

```bash
npm run test:browser
```

Set `PLAYWRIGHT_CHANNEL` to another installed Playwright browser channel when needed.

## Metadata

```bash
npm run metadata:refresh
```

`metadata:refresh` updates supported topology from pinned Hugging Face configurations.

## Docker

The Compose service mounts the committed database directory at `/app/data`.

```bash
docker compose up -d --build
```

Docker publishes the application only on `127.0.0.1:3000`.
