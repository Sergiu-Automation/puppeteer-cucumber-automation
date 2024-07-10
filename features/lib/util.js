module.exports = {
  click: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector, { delay: 30 });
    } catch (error) {
      throw new Error(`Could not click on selector: ${selector}`);
    }
  },

  clickAndTypeText: async function (page, selector, text) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
      await page.keyboard.down("Control");
      await page.keyboard.press("A");
      await page.keyboard.up("Control");
      await page.keyboard.press("Backspace");
      await page.type(selector, text, { delay: 30 });
    } catch (error) {
      throw new Error(`Could not type into selector: ${selector}`);
    }
  },

  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (element) => element.textContent);
    } catch (error) {
      throw new Error(`Could not get text from selector: ${selector}`);
    }
  },
};
