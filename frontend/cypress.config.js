// cypress.config.js
import { defineConfig } from "cypress";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

export default defineConfig({
  e2e: {
    // Setup Node event listeners if necessary
    setupNodeEvents(on, config) {
      // Pass environment variables to Cypress
      const baseUrl = "http://localhost:5173";
      config.baseUrl = baseUrl;
      config.env.apiUrl = config.env.VITE_API_URL;
      // Return the modified config
      return config;
    },

    // Set the default viewport size for all tests
    viewportWidth: 1200, // Set minimum width to 1200px
    viewportHeight: 800, // You can adjust the height as needed

    supportFile: "cypress/support/e2e.js", // Or the appropriate path for your support file
  },
});
