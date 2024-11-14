
const mongoose = require('mongoose');
const User = require('../models/user.model')

async function createUser(req, res) {
  try {
    // const user = await User.save(req.body);

    const newUser = new User(req.body);
    const createdUser = await newUser.save();
    res.status(201).json({
      status: 'success',
      data: {
        createdUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
}

async function getUsers(req, res) {
  
  try {
    
    const allUsers = await User.find()    

    res.status(200).json({
      status: 'success',
      data: {
        allUsers
      }
    });

  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
  
}

module.exports = {createUser, getUsers};