const { Given, When, Then } = require("@cucumber/cucumber");
const utils = require("../lib/util.js");
const navigationBar = require("../support/components/navigationBar.js");

let expect;

(async () => {
  const chai = await import("chai");
  expect = chai.expect;
})();

let alertMessage = "";

Given("I open a book store application page", async function () {
  this.page.on("dialog", async (dialog) => {
    alertMessage = await dialog.message();
    await dialog.accept();
  });
  await this.page.goto("https://demoqa.com/books");
});

Then("I validate redirection to the {string} page", async function (pageName) {
  let url = await this.page.url();
  expect(url).to.contain(pageName);
  console.log(url);
});

When(
  "I clicked a {string} button on the left navigation bar",
  async function (buttonName) {
    await utils.click(this.page, navigationBar[buttonName]);
  }
);
