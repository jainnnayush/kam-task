const mongoose = require('mongoose');
const {Schema} = mongoose;

const callFrequencySchema = new Schema({
    lead_id: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },
    frequency: { type: Number, required: true },
    last_called: { type: Date, required: true },
    next_call: { type: Date, required: true }
});

module.exports = mongoose.model('CallFrequency',callFrequencySchema);