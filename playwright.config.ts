import { defineConfig } from "@playwright/test";

// Real-browser tests for the routes that need layout, scrolling and an accessibility tree. They run against a production build.
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  use: { baseURL: "http://localhost:3100", channel: "chrome", reducedMotion: "reduce" },
  webServer: { command: "npm run build && npx next start -p 3100", url: "http://localhost:3100", reuseExistingServer: true, timeout: 180_000 },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "phone", use: { viewport: { width: 390, height: 844 } } },
  ],
});
