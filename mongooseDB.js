var mongoose = require('mongoose');
const encription = require('crypto-js');
var encKey = "ASECRET";

mongoose.connect('mongodb://localhost/pd', {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(" we're connected!");
});

const userSchema = new mongoose.Schema({
    name : String,
    age : Number, 
    id : Number,
    email : String,
    password : String
},{
  timestamps: true
});
userSchema.pre('save', function(next) {
    let user = this;

    if(!user.isModified("password")) {
        return next();
    }
    
    let cipfer = encription.AES.encrypt("password", key);
    user.password = cipfer.toString();
    next();

  });

var userModel = mongoose.model("User", userSchema);

module.exports = {
    userModel
};
