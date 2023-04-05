import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200/",
    supportFile: false,
    specPattern: "**/*.cy.ts",
  },
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
  env: {
    email: "adrabczyk90@gmail.com",
    password: "",
  },
});
