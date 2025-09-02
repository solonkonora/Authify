import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number | string;
  jwtSecret: string;
  jwtExpiresIn: string;
  database: {
    url: string;
  };
  nodeEnv: string;
  logLevel: string;
}

const config: Config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "your-super-secret-jwt-key",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  database: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://username:password@localhost:5432/authify",
  },
  nodeEnv: process.env.NODE_ENV || "development",
  logLevel: process.env.LOG_LEVEL || "info",
};

if (!process.env.JWT_SECRET && config.nodeEnv === "production") {
  throw new Error("JWT_SECRET environment variable is required in production");
}

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL not set, using default connection string");
}

export default config;
