
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Connection URL
// const uristring = 'mongodb://localhost:27017/cracker_db';
const uristring = 'mongodb://cracker1:cracker1@ds119028.mlab.com:19028/cracker_db';
  
var mongoOptions = { };
 
mongoose.connect(uristring, mongoOptions, function (err, res) {
    if (err) { 
        console.log('Error when connecting to: ' + uristring + '. ' + err);
    } 
    else {
        console.log('Successfully connected to: ' + uristring);
    }
});
 
 
var ProductSchema = new Schema({
    title: String,
    price: Number,
    instock: Boolean,
    photo: String,
});
var Products = mongoose.model('Products', ProductSchema);
module.exports = Products;

var Login = new Schema({
    user_id: String,
    useer_name: String,
    user_email: String,
    user_password: String,
    user_role: String,
    is_active: Number,
    created_at: Date
});
var Users = mongoose.model('ic_users', Login);
module.exports = Users;


var Companies = new Schema({
    company_id: String,
    company_name: String,
    company_contact_email: String,
    company_description: String,
    website: String,
    is_active: Number,
    created_at: Date
});
var Companies = mongoose.model('ic_companies',Companies);
module.exports = Companies;

/*
var CompanyDetails= new Schema({
    details_id: String,
    website: String,
    location:String,
    headquaters: String,
    founded_year: String,
    type: String,
    company_size: String,
    speciality: String,
    created_at: Date
});
var Users = mongoose.model('ic_users', Login);
module.exports = Users;

*/