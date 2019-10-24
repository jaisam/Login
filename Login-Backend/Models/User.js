const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const UserSchema = mongoose.Schema({
    firstName : {
        type : String,
        required: true
    },
    lastName : {
        type : String ,
        rquired : true
    },
    company : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true, // optimizes search query and not validate value
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('User', UserSchema);