const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    trim: true,
  },
  classes_id: {
    // Contiene los IDs de las clases a las que está apuntado el alumno
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class'
    }]
    
    
  }

});

const User = mongoose.model('User', userSchema);

module.exports = User;