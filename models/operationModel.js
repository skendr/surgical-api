const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
    operationId: { type: String, unique: true, required: true },
    userId: { type: String, required: true },
    doctorId: { type: String, required: true },
    filename: { type: String, required: true},
    suggestedProcedures: { type: [String] },
    procedureName: { type: String }
})

const Operation = mongoose.model('Operation', operationSchema);
module.exports = Operation;