import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://mudotet:Messitu123456@cluster0.4klvbgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
        
        console.log("DB Connected successfully");
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });
        
    } catch (error) {
        console.error("Database connection failed:", error);
        // Retry connection after 5 seconds
        setTimeout(() => {
            console.log("Retrying database connection...");
            connectDB();
        }, 5000);
    }
}

export function getDB() {
  if (!mongoose.connection) {
    throw new Error('Database not connected. Call connectDB first.');
  }
  return mongoose.connection;
}

// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.
