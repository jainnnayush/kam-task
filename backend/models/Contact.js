const mongoose = require('mongoose');
const {Schema} = mongoose;

const contactSchema = new Schema({
    contact_name: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
  
module.exports = mongoose.model('Contact', contactSchema);
  