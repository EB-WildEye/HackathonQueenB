import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // load env var

import chatRoutes from './routes/chat.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',  // if CLIENT_URL is not set in .env, default to localhost:3000
  credentials: true
}));

app.use(express.json());
app.use('/api/chat', chatRoutes);  // mount chat routes


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`BeSafe Server is running on port ${PORT}`);
});
