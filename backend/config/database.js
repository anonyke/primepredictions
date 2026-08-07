import mongoose from 'mongoose';

const connectionOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

let isConnected = false;

// Cache the in-flight connection promise so concurrent requests reuse a single
// connection attempt. Important for serverless (Vercel) where each invocation
// may try to connect simultaneously.
let connectionPromise = null;

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('MONGODB_URI is not set. Using in-memory fallback.');
    // In production, you should have MONGODB_URI set
    // For development, you can use a local MongoDB instance
    return { connected: false, message: 'No MongoDB URI configured' };
  }

  // Reuse an existing connection or an in-flight connection attempt.
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return { connected: true };
  }
  if (connectionPromise) {
    return connectionPromise;
  }

  connectionPromise = (async () => {
    try {
      mongoose.set('strictQuery', true);

      const db = await mongoose.connect(uri, connectionOptions);

      isConnected = db.connections[0].readyState === 1;

      if (isConnected) {
        console.log(`MongoDB connected: ${db.connection.host}`);
      }

      // Handle connection events
      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        isConnected = false;
      });

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
        isConnected = false;
      });

      mongoose.connection.on('reconnected', () => {
        console.log('MongoDB reconnected');
        isConnected = true;
      });

      // Graceful shutdown (only relevant for long-running Node processes)
      if (typeof process !== 'undefined' && !process.env.VERCEL) {
        process.on('SIGINT', async () => {
          await mongoose.connection.close();
          console.log('MongoDB connection closed through app termination');
          process.exit(0);
        });
      }

      return { connected: true };
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
      isConnected = false;

      // NOTE: No setTimeout retry here — it is not safe in serverless
      // (Vercel) because timers can keep the function alive and module state
      // is not persisted between invocations. Each request will retry naturally.
      return { connected: false, error: err.message };
    }
  })();

  // Allow the next call to retry after a failure (reset the cached promise).
  connectionPromise.catch(() => {
    connectionPromise = null;
  });

  return connectionPromise;
}

export function getConnectionStatus() {
  return {
    isConnected,
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host,
    name: mongoose.connection.name,
  };
}

export async function disconnectDB() {
  try {
    await mongoose.connection.close();
    isConnected = false;
    console.log('MongoDB disconnected');
  } catch (err) {
    console.error('Error disconnecting MongoDB:', err);
  }
}
