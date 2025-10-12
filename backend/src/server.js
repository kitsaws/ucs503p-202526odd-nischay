const app = require('./app')
require('dotenv').config({ path: './src/.env' });
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});