const mongoose = require('mongoose');
const {Schema}=mongoose; 

const performanceSchema = new Schema({
    lead_id: { type: Schema.Types.ObjectId, ref: 'Lead', required: true },
    total_orders: { type: Number, default: 0 },
    order_frequency: { type: Number, default: 0 },
    last_order_date: { type: Date },
    performance_status: { type: String, enum: ['good', 'lagging', 'average'] }
});
  
module.exports=mongoose.model('Performance', performanceSchema);
  