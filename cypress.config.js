const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  viewportHeight: 1080,
  viewportWidth: 1920,
  video:false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
     baseUrl: 'http://localhost:4200',
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*']

  }
});
