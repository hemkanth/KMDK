var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EnquirySchema = mongoose.Schema({
    Name: {type: String, required: true},
    Place : {type: String, required: true},
    Date:{type: Date, required: true},
    Message: {type: String, required: true },
    State: { type: Schema.Types.ObjectId, ref: 'StateSetting', required: true },
    District: { type: Schema.Types.ObjectId, ref: 'DistrictSetting', required: true },
    Zone: { type: Schema.Types.ObjectId, ref: 'ZoneSetting', required: true },
    Branch: { type: Schema.Types.ObjectId, ref: 'BranchSetting', required: true },
    CreatedBy: { type: Schema.Types.ObjectId, ref: 'Members', required: true },
    UpdatedBy: { type: Schema.Types.ObjectId, ref: 'Members', required: true },
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
