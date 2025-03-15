import app from "./app";

Bun.serve({
  fetch: app.fetch.bind(app),
});

console.log("Server is running on port 3000");
