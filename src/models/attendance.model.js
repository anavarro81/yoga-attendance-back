const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({    
    claseID: { 
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Class'
          }
      }  ,
        stutendID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        attendace: { 
            type: Boolean, 
            required: true }
    
    
});

const Attendace = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendace;