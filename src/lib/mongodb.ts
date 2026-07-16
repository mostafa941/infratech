import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;

if (!MONGODB_URL) {
  throw new Error("Please define MONGODB_URL in .env");
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: typeof mongoose | undefined;
  // eslint-disable-next-line no-var
  var _mongoosePromise: Promise<typeof mongoose> | undefined;
}

let cached = global._mongooseConn;
let cachedPromise = global._mongoosePromise;

export async function connectDB() {
  if (cached) return cached;

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(MONGODB_URL, {
      bufferCommands: false,
    });
  }

  try {
    cached = await cachedPromise;
    global._mongooseConn = cached;
  } catch (e) {
    cachedPromise = undefined;
    throw e;
  }

  return cached;
}
