const app = require('./app')
require('dotenv').config({ path: './src/.env' });
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});