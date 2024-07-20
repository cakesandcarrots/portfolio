// server.js

import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model('Blog', blogSchema);

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(bodyParser.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using https
    httpOnly: true,
    maxAge: 3600000, // 1 hour
  },
  genid: () => {
    // Generate a random session ID
    return crypto.randomBytes(16).toString('hex');
  },
}));

const hardcodedUsername = 'admin';
const hardcodedPassword = 'password';

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === hardcodedUsername && password === hardcodedPassword) {
    req.session.user = username;
    return res.status(200).json({ message: 'Login successful' });
  }

  return res.status(401).json({ message: 'Invalid username or password' });
});

app.get('/api/check-session', (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ loggedIn: true });
  }
  return res.status(200).json({ loggedIn: false });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Clears the session cookie
    return res.status(200).json({ message: 'Logout successful' });
  });
});

app.get('/api/session-status', (req, res) => {
  return res.json({ session: req.session });
});

// Blog routes
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
});

app.post('/api/blogs', async (req, res) => {
  const { title, description } = req.body;
  const currentDate = new Date(); // Get current date and time

  try {
    const newBlog = new Blog({
      title,
      description,
      createdAt: currentDate,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error });
  }
});

app.put('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate(id, { title, description }, { new: true });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog', error });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
