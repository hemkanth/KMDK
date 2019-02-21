var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EnquirySchema = mongoose.Schema({
    Name: {type: String, required: true},
    Place : {type: String, required: true},
    Date:{type: Date, required: true},
    Message: {type: String, required: true },
    CreatedBy: { type: Schema.Types.ObjectId, ref: 'Members'},
    UpdatedBy: { type: Schema.Types.ObjectId, ref: 'Members'},
    IfDeleted: { type: Boolean, required: true },
    CreatedAt: { type: Date },
    UpdatedAt: { type: Date }
    },
    {timestamp: true}
);
var VarEnquirySchema = mongoose.model('Enquiry', EnquirySchema, 'Enquiry_List');

module.exports = {
    EnquirySchema : VarEnquirySchema
};
