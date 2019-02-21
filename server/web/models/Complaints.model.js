var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComplaintSchema = mongoose.Schema({
    Name: {type: String, required: true},
    MobileNumber: {type: String, required: true},
    ComplaintType: {type: Schema.Types.ObjectId, ref: 'ComplaintCategorySetting', required: true},
    Complaint: {type: String,required: true},
    Message: {type: String, required: true},
    ComplaintImage: {type: Object},
    ComplaintVideo: {type: Object},
    ComplaintAudio: {type: Object},
    Place : {type: String, required: true},
    CreatedBy: { type: Schema.Types.ObjectId, ref: 'Members'},
    UpdatedBy: { type: Schema.Types.ObjectId, ref: 'Members'},
    IfDeleted: { type: Boolean, required: true },
    CreatedAt: { type: Date },
    UpdatedAt: { type: Date },
    }, 
    {timestamp: true}
);

var VarComplaintSchema = mongoose.model('Complaint', ComplaintSchema, 'Complaint_List');

module.exports = {
    ComplaintSchema : VarComplaintSchema
}