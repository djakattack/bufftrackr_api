const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MetricsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    weight: {
        type: Number
    },
    bodyfat: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Metrics = mongoose.model('metrics', MetricsSchema);