import { httpServer } from "./app.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      // Server running
    });
  })
  .catch((err) => {
    // Failed to connect to database
    process.exit(1);
  });
