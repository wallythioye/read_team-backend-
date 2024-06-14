require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());

// Middleware pour servir les images statiques
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(cors({
  origin: 'http://localhost:3001', // Spécifiez l'origine de votre frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Si vous utilisez des cookies
}));

app.use('/api/users', userRoutes);

connectDB();

module.exports = app;
