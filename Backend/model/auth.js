const express = require('express');
const mongoose = require('mongoose');

// Define the user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
});

// Create the user model
const User = mongoose.model('User', UserSchema);
module.exports=User


