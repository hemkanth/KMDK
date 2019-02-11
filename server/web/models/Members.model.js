var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MembersSchema = mongoose.Schema({
    Name: {type: String, required: true},
    Education: {type: String, required: true},
    Address: {type: String, required: true},
    City: {type: String, required: true},
    MobileNumber: {type: String, required: true, unique: true},
    State: { type: Schema.Types.ObjectId, ref: 'StateSetting' },
    District: { type: Schema.Types.ObjectId, ref: 'DistrictSetting' },
    Zone: { type: Schema.Types.ObjectId, ref: 'ZoneSetting' },
    Branch: { type: Schema.Types.ObjectId, ref: 'BranchSetting' },
    If_Official: { type: Boolean, required: true},
    State_Authority: {type: Boolean},
    District_Authority: {type: Boolean},
    Zone_Authority: {type: Boolean},
    Branch_Authority: {type: Boolean},
    Can_Add: {type: Boolean},
    Can_View: {type: Boolean},
    Can_Edit: {type: Boolean},
    Can_Approval: {type: Boolean},
    CreatedBy: { type: Schema.Types.ObjectId, ref: 'Members' },
    UpdatedBy: { type: Schema.Types.ObjectId, ref: 'Members'  },
    Member_Status: {type: String },
    Status: { type: String },
    OTP: {type: String},
    IfDeleted: { type: Boolean, required: true },
    ActiveStatus: {type: Boolean, required: true},
    CreatedAt: {type: Date, required: true},
    UpdatedAt: {type: Date, required: true}
   },
   {timestamp: true}
);
var VarMembersSchema = mongoose.model('Members', MembersSchema, 'Members_List');

module.exports = {
    MembersSchema : VarMembersSchema
}