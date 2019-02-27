const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var OrderSchema = new Schema({
    customerName: {type: String},
    customerPhone: {type: String},
    totalPrice: {type: Number},
    createdAt: [Date]
});

module.exports = mongoose.model("Order", OrderSchema);


