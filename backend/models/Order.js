const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    lead_id: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },
    order_date: { type: Date, required: true },
    order_value: { type: Number, required: true },
    order_status: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
  
module.exports=mongoose.model('Order', orderSchema);
  