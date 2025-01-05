const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 8000;

if (!process.env.MONGODB_URI) {
  console.error(
    'MONGODB_URI is not defined in the environment variables'.red.bold
  );
  process.exit(1);
}

connectDB().catch((err) => {
  console.error(`Database connection failed: ${err.message}`.red.bold);
  process.exit(1);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' });
});

app.use('/api/users', require('./routes/userRoutes'));

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`.cyan.bold);
});
