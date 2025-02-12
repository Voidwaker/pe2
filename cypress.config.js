import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", 
    defaultCommandTimeout: 8000, 
    pageLoadTimeout: 60000, 
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", 
    screenshotsFolder: "cypress/screenshots",
    video: false,
    setupNodeEvents(on, config) {
      
    },
  },
});
