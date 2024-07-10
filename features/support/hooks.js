const puppeteer = require("puppeteer");
const {
  Before,
  After,
  BeforeAll,
  AfterAll,
  AfterStep,
  Status,
} = require("@cucumber/cucumber");

let browser = null;
let page = null;

// ==== BeforeAll and AfterAll do not have access to test scope 'this'
// ==== Before and After do

// executed once before any test
BeforeAll(async function () {});

// AfterStep(async function (testCase) {
//   let screenshot = await this.page.screenshot();
//   if (testCase.result.status === Status.PASSED) {
//     console.log(`Test '${testCase.pickle.name}': Step - passed.`);
//   }
//   this.attach(screenshot, "image/png");
// });

// executed once after all tests
AfterAll(async function () {
  // Make sure the browser is closed
  if (browser != null) {
    browser.close();
  }
});

// executed before every test
Before(async function () {
  browser = await puppeteer.launch({
    headless: false, // set to False to see the tests. Add slowMo: 200 to slow each action by 200ms so you can see what happens.
    // only use --no-sandbox on websites you trust!
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--start-maximized"],
    slowMo: 50,
  });
  page = await browser.newPage();
  // How large the page will intend to be. It won't find elements outside of the viewport. Change this to pretend to be mobile, etc.
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  this.browser = browser;
  this.page = page;
});

// executed after every test
After(async function (testCase) {
  // attach a screenshot
  if (
    testCase.result.status === Status.FAILED ||
    testCase.result.status === Status.PASSED
  ) {
    if (this.page != null) {
      let screenshot = await this.page.screenshot();
      this.attach(screenshot, "image/png");
    }
  }
  if (testCase.result.status === Status.PASSED) {
    console.log(`Test: '${testCase.pickle.name}' - passed!`);
  }
  if (testCase.result.status === Status.FAILED) {
    console.log(`Test: '${testCase.pickle.name}' - failed...`);
  }

  if (browser != null) {
    browser.close();
  }
});
