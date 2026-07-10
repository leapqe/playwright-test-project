# Playwright Test Project

A Playwright + TypeScript automation project. It contains two independent suites — a
browser **UI** suite and an **API** suite — driven from a single root
`playwright.config.ts` that exposes them as two Playwright projects (`ui` and `api`).

| Suite | Target | Base URL (env var) |
| ----- | ------ | ------------------ |
| **UI** | Demoblaze demo store — https://www.demoblaze.com | `UI_BASE_URL` |
| **API** — Activities | FakeRESTApi — https://fakerestapi.azurewebsites.net | `API_BASE_URL` |
| **API** — Users | https://crudcrud.com/api/<your-endpoint-id> | `CRUD_CRUD_URL` |

The API suite spans **two upstream APIs**, each with its own base URL. Every controller
reads its own env var, so the two APIs stay independent even though they run under the
same `api` project.

## Project structure

```
playwright-test-project/
├── env/
│   └── .env.test                          # UI_BASE_URL, API_BASE_URL, CRUD_CRUD_URL
├── playwright.config.ts                    # Root config — defines the `ui` and `api` projects
├── package.json
├── tsconfig.json                           # Path alias: @controllers/* -> api-automation/controllers/*
│
├── ui-automation/
│   ├── pages/                              # Page Objects
│   │   ├── home.page.ts
│   │   ├── login.modal.ts
│   │   └── signup.modal.ts
│   └── tests/│      
│       ├── fixtures/
│       │   └── ui-base.ts                  # `uiTest` fixture: homePage, logInModal, signUpModal
│       └── scenarios/
│           ├── login.spec.ts
│           └── signup.spec.ts
│
└── api-automation/
    ├── controllers/
    │   ├── fakerestapi/
    │   │   └── activities-controller.ts    # ActivitiesController — uses API_BASE_URL
    │   └── crudcrudapi/
    │       └── users-controller.ts         # UsersController — uses CRUD_CRUD_URL
    └── tests/
        ├── fixtures/
        │   └── api-base.ts                 # `apiTest` fixture: activitiesApi, usersApi
        └── scenarios/
            ├── activities-tests.spec.ts    # FakeRESTApi Activities CRUD
            └── user-tests.spec.ts          # crudcrud Users
```

## Setup

```bash
npm install
npx playwright install chrome
```

Then confirm the URLs and tokens in `env/.env.test`:

```dotenv
UI_BASE_URL="https://www.demoblaze.com"
API_BASE_URL="https://fakerestapi.azurewebsites.net"
CRUD_CRUD_URL="https://crudcrud.com/api/<your-endpoint-id>"
```


## Running the tests

The root `playwright.config.ts` loads `env/.env.test` directly (via `dotenv`), so no
`env-cmd` wrapper is needed.

```bash
# Everything (both projects)
npx playwright test

# UI suite only (Demoblaze) — runs headed Chrome
npx playwright test --project=ui

# API suite only (FakeRESTApi + crudcrud)
npx playwright test --project=api


# Open the last HTML report
npx playwright show-report
```

The `api` project uses `testMatch: '**/scenarios/**/*.spec.ts'`, so only spec files under
a `scenarios/` folder are collected — fixture and controller files are ignored.

## Architecture notes

- **Page Objects** (`ui-automation/pages/`) wrap Demoblaze UI interactions.
- **Controllers** (`api-automation/controllers/`) wrap each API resource and build full
  absolute URLs from their own env var, so the project-level `baseURL` isn't relied on.
- **Fixtures** (`*/fixtures/`) extend Playwright's `test` with typed helpers
  (`uiTest` / `apiTest`) that inject the page objects / controllers.
- **`@controllers/*`** path alias (see `tsconfig.json`) points at
  `api-automation/controllers/*`.

## Lint

```bash
npm run lint
```
