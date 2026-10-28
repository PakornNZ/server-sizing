# Server Sizing Frontend

Next.js application for LLM model, GPU server, DGX Spark, and application infrastructure sizing.

## Local Setup

```bash
npm ci
copy .env.example .env
npm run db:generate
npm run dev
```

The repository includes `data/model_dashboard.sqlite` with the current catalog. Set new admin credentials and a random `AUTH_SECRET` in `.env` before starting the application.

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
npm run metadata:queue
```

`metadata:refresh` updates supported topology from pinned Hugging Face configurations. `metadata:queue` regenerates the unresolved metadata report in the project root.

## Docker

The Compose service mounts the committed database directory at `/app/data`.

```bash
docker compose up -d --build
```

The external Docker network `proxy` must already exist.
