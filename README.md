# Playwright Test Project 

A Playwright + TypeScript automation project. It contains two independent suites:

| Suite | Target | Config |
| ----- | ------ | ------ |
| **UI** | Demoblaze demo store — https://www.demoblaze.com | `ui-automation/tests/demoblaze.config.ts` |
| **API** | FakeRESTApi — https://fakerestapi.azurewebsites.net | `api-automation/tests/fakerestapi/fakerestapi.config.ts` |



## Project structure

```
playwright-test-project/
├── env/
│   └── .env.test                       # UI_BASE_URL + API_BASE_URL for the test env
├── ui-automation/
│   ├── pages/                          # Page Objects
│   │   ├── home.page.ts
│   │   ├── login.modal.ts
│   │   └── signup.modal.ts
│   └── tests/
│       ├── demoblaze.config.ts
│       ├── fixtures/ui-base.ts     
│       └── scenarios/
│           ├── login.spec.ts
│           └── signup.spec.ts
├── api-automation/
│   ├── controllers/fakerestapi/
│   │   └── activities-controller.ts   
│   └── tests/fakerestapi/
│       ├── fakerestapi.config.ts
│       ├── fixtures/api-base.ts       
│       └── scenarios/
│           └── activities-tests.spec.ts
├── playwright.config.ts               
├── package.json
└── tsconfig.json                      
```

## Setup

```bash
npm install
npx playwright install chrome
```

## Running the tests

Both suites read their URLs from `env/.env.test`.

```bash
# UI suite (Demoblaze) — runs headed Chrome
npm run test:ui

# API suite (FakeRESTApi)
npm run test:api

# Both suites via the root config
npm run test                

```

