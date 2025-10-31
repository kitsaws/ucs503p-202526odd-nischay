const app = require('./app')
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"
require('dotenv').config({ path: `./src/${envFile}` });
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