// ...existing code...
import mongoose from "mongoose";

const ensureScheme = (uri) => {
  if (!uri) return null;
  uri = uri.trim();
  if (uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://"))
    return uri;
  // If someone set "localhost:27017/db" or "127.0.0.1:27017/db", add scheme
  return `mongodb://${uri}`;
};

const connectDB = async () => {
  try {
    // Accept common env names
    let uri =
      process.env.MONGO_URI ||
      process.env.MONGODB_URI ||
      process.env.MONGO_URL ||
      process.env.DATABASE_URL ||
      "";

    if (!uri) {
      const host = process.env.MONGO_HOST || "127.0.0.1";
      const port = process.env.MONGO_PORT || "27017";
      const dbname = (
        process.env.MONGO_DBNAME ||
        process.env.MONGODB_DBNAME ||
        "e-commerce"
      ).trim();
      uri = `mongodb://${host}:${port}/${dbname}`;
    } else {
      uri = ensureScheme(uri);
    }

    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB connected: ${conn.connection.host}/${conn.connection.name}`
    );
  } catch (error) {
    console.error("MongoDB connection error:", error.message || error);
    process.exit(1);
  }
};

export default connectDB;
// ...existing code...
