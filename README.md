# e2e tests for SSLs.com

Stack:

- Playwright https://playwright.dev/

## 🤖 Starting up

1. Clone repository
2. Install the dependencies using `npm install`
3. Run tests in headless mode using `npx playwright test`
4. OR run tests in UI mode using `npx playwright test --ui`

## 📁 Structure

```sh
 |- configs # Configuration files
 |- pages # Page object model
 |- tests # Sets of tests 
```

## 📜 Notes

- By default, tests are run WITHOUT parallelism in chromium. To change this, you need to uncomment the corresponding parameters in playwright.config.js file (fullyParallel and projects).
- If needed - use `npx playwright show-report` after tests to generate a report.
