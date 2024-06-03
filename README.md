# e2e tests for [SSLs.com](https://www.sbzend.ssls.com/)

[Task](https://docs.google.com/document/d/1jnyYBEPKXbLzcxsP-OUeHAzCTahvKdOR-lkfaJyxk7k/edit?usp=sharing)

Stack:

- Playwright https://playwright.dev/

## 🤖 Starting up

1. Clone repository
2. Install the dependencies using `npm install`
3. Run tests in headless mode using `npx playwright test`
4. OR run tests in UI mode using `npx playwright test --ui`
5. OR run tests in [GitHub Actions](https://github.com/serhio-r/e2e_tests_for_ssls/actions) - restart the last job, [example](https://monosnap.com/file/h3hvUxcN75rcVu7t2N6LPZDr3UxYxZ)

## 📁 Structure

```sh
 |- configs # Configuration files
 |- pages # Page object model
 |- tests # Sets of tests 
```

## 📜 Notes

- By default, tests are run WITHOUT parallelism (1 worker for test file) in Chromium browser. To change this, you need to uncomment the corresponding parameters in `playwright.config.js` file (`fullyParallel` and `projects`).
- If needed - use `npx playwright show-report` after tests to generate a report.
