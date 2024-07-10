const puppeteer = require("puppeteer");
const { When, Then } = require("@cucumber/cucumber");
const utils = require("../lib/util.js");
const loginPage = require("../support/pages/loginPage.js");
const profilePage = require("../support/pages/profilePage.js");

let expect;

(async () => {
  const chai = await import("chai");
  expect = chai.expect;
})();

When(
  /^I sign in the application using (invalid )?login "([^"]*)" and password "([^"]*)"$/,
  async function (invalid, login, password) {
    await utils.clickAndTypeText(this.page, loginPage["userNameInput"], login);
    await utils.clickAndTypeText(
      this.page,
      loginPage["passwordInput"],
      password
    );
    await utils.click(this.page, loginPage["loginButton"]);
    if (!invalid) {
      await this.page.waitForNavigation();
    }
  }
);

When("I sign out from the application", async function () {
  await utils.click(this.page, profilePage["logOutButton"]);
});

Then(
  "I validate that the output text is {string}",
  async function (expectedText) {
    let outputText = await utils.getText(this.page, loginPage["outputText"]);
    expect(outputText).to.contain(expectedText);
  }
);
