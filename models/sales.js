const { Schema, model, mongo, default: mongoose } = require('mongoose');

const schema = new Schema({
    saleDate: {type: Date, required: true},
    items: [{
        name: {type: String},
        tags: [String],
        price: {type: mongoose.Decimal128},
        quantity: {type: Number}
    }],
    storeLocation: {type: String},
    customer: {
        gender: {type: String},
        age: {type: Number},
        email: {type: String},
        satisfaction: {type: Number}
    },
    couponUsed: {type: Boolean},
    purchaseMethod: {type: String}
});

const Sales = new model('sales', schema, 'sales');

module.exports = { Sales };