// cypress.config.js
import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

export default defineConfig({
  e2e: {
    // Pass environment variables to Cypress
    env: {
      baseUrl: process.env.CYPRESS_baseUrl,
      apiUrl: process.env.VITE_API_URL,
    },

    // Setup Node event listeners if necessary
    setupNodeEvents(on, config) {
      // Return the modified config
      return config;
    },

    // Set the default viewport size for all tests
    viewportWidth: 1170,  // Set minimum width to 1200px
    viewportHeight: 800,  // You can adjust the height as needed

    supportFile: 'cypress/support/e2e.js',  // Or the appropriate path for your support file
  },
});
