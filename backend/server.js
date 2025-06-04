const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend static files (adjust the path if needed)
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Import product routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Connect to MongoDB
const mongoUri = 'mongodb://localhost:27017/pos'; // change URI if needed
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Root test route
app.get('/', (req, res) => {
  res.send('Hello from POS Backend');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
