const mongoose = require('mongoose');
const {Schema} = mongoose; 

const interactionSchema = new Schema({
    lead_id: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },
    contact_id: { type: Schema.Types.ObjectId, ref: 'Contact', required: true },
    interaction_type: { type: String, required: true },
    interaction_date: { type: Date, required: true },
    notes: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
  
module.exports= mongoose.model('Interaction', interactionSchema);
  