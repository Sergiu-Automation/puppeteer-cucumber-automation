const reporter = require("cucumber-html-reporter");

const options = {
  theme: "bootstrap",
  jsonFile: "output/cucumber_report.json",
  output: "output/cucumber_report.html",
  reportSuiteAsScenarios: true,
  launchReport: true,
  name: "TSRO Test",
  storeScreenshots: true,
  noInlineScreenshots: true,
  brandTitle: "Cucumber automatic tests",
  screenshotsDirectory: "/screenshots/",
  metadata: {
    "App Version": "0.1.1",
    "Test Environment": "Build 35467",
    Platform: "Windows 10",
    Parallel: "Scenarios",
    Executed: "Local System",
  },
};

reporter.generate(options);
