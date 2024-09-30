const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();

// Allow CORS from frontend
app.use(cors({
  origin: 'https://blog-frontend-theta-pearl.vercel.app/' // Adjust if your frontend is hosted somewhere else
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
