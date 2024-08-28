// // testScript.js
const { Builder, By, Key, until, driver } = require("selenium-webdriver");

async function runTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:3000"); // Replace with your app's URL

    // Simulate clicking the 'A' key on the virtual keyboard
    const res = await driver
      .findElement(By.xpath('//button[text()="A"]'))
      .click();

    console.log(res);

    // Add more interactions as needed
  } finally {
    await driver.quit();
  }
}

runTest();

// // Find the input field
// const inputField = await driver.findElement(By.id("inp1"));

// // Click the input field to focus
// await inputField.click();

// // Trigger the keyboard event (example: click a key)
// await driver.findElement(By.id("a")).click();
