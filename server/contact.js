import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 5001; 

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  mail: String,
  description: String,
});

const User = mongoose.model('User', userSchema);

app.post('/api/contact', async (req, res) => {
  const { name, mail, description } = req.body;

  const newUser = new User({ name, mail, description });

  try {
    await newUser.save();
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}, 'name mail description'); // Fetch name, mail, and description fields
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});


app.listen(PORT, () => {
  console.log(`Contact server running on http://localhost:${PORT}`);
});
