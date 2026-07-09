## 1. Gitignore and env example

- [x] 1.1 Add `.gitignore` exception so `apps/api/.env.example` is committable
- [x] 1.2 Verify `apps/api/.env.example` exists with `DATABASE_URL`

## 2. Documentation

- [x] 2.1 Rewrite `README.md` with full bootstrap, dev, DB scripts, error envelope, workshop pointer
- [x] 2.2 Create `SMOKE_TEST.md` with manual verification checklist

## 3. Vitest

- [x] 3.1 Add `vitest` devDependency and `test` script to `apps/api`
- [x] 3.2 Create `vitest.config.ts` in `apps/api`
- [x] 3.3 Create `service.test.ts` with past-date rejection and future-date acceptance tests

## 4. Root test script

- [x] 4.1 Add `test` script to root `package.json` delegating to API

## 5. Verification

- [x] 5.1 Run `pnpm test` — all tests pass
- [x] 5.2 Follow README bootstrap steps on a clean mental check (documented paths exist)
- [x] 5.3 Confirm `SMOKE_TEST.md` covers mixed statuses and create flow
