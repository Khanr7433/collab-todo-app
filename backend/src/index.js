import { httpServer } from "./app.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  });
