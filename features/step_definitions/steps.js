const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

let driver;

Given('User is located on the main page of saucedemo website', { timeout: 8000 }, async function () {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://www.saucedemo.com');
});

When('User clicks the “Login” button', async function () {
  const loginButton = await driver.findElement(By.xpath('//input[@data-test="login-button"]'));
  await loginButton.click();
});

Then('User should see “Epic sadface: Username is required” error message', async function () {
  const errorMessage = await driver.findElement(By.xpath('//h3[@data-test="error"]'));
  const text = await errorMessage.getText();
  assert.strictEqual(text, 'Epic sadface: Username is required');
  await driver.quit();
});
