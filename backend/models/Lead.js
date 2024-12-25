const mongoose = require('mongoose');
const {Schema} = mongoose;

const leadSchema = new Schema({
    lead_name: { type: String, required: true },
    lead_status: { type: String, required: true, enum: ['new', 'inprogress', 'converted'] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],
    interactions: [{ type: Schema.Types.ObjectId, ref: 'Interaction' }],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    performance: { type: Schema.Types.ObjectId, ref: 'Performance' },
    call_frequency: { type: Schema.Types.ObjectId, ref: 'CallFrequency' }
});
  
module.exports=mongoose.model('Lead', leadSchema);
  