import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const config = {
  serverHost: process.env.SERVER_HOST || "10.0.70.50",
  serverURL: process.env.SERVER_URL || "http://10.0.70.50:5003",
  baseURL: process.env.BASE_URL || "http://10.0.70.50:5003/api/v1",
};
