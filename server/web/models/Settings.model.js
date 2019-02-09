var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// State Settings Schema
var StateSettingSchema = mongoose.Schema({
   StateName: { type: String, required: true, unique: true },
   CreatedBy: { type: String },
   UpdatedBy: { type: String },
   IfDeleted: { type: Boolean, required: true }
   }, 
   {timestamp: true}
);
var VarStateSettingSchema = mongoose.model('StateSetting', StateSettingSchema, 'StateSetting_List');

// District Settings Schema
var DistrictSettingSchema = mongoose.Schema({
   State: { type: Schema.Types.ObjectId, ref: 'StateSetting' },
   DistrictName: { type: String, required: true, unique: true },
   Message: { type: String },
   CreatedBy: { type: String },
   UpdatedBy: { type: String },
   IfDeleted: { type: Boolean, required: true }
   },
   {timestamp: true}
);
var VarDistrictSettingSchema = mongoose.model('DistrictSetting', DistrictSettingSchema, 'DistrictSetting_List');

// Union Setting Schema
var UnionSettingSchema = mongoose.Schema({
   State: { type: Schema.Types.ObjectId, ref: 'StateSetting', required: true },
   District: { type: Schema.Types.ObjectId, ref: 'DistrictSetting', required: true },
   UnionName: { type: String, required: true, unique: true },
   Message: { type: String },
   CreatedBy: { type: String },
   UpdatedBy: { type: String },
   IfDeleted: { type: Boolean, required: true }
   },
   {timestamp: true}
);
var VarUnionSettingSchema = mongoose.model('UnionSetting', UnionSettingSchema, 'UnionSetting_List');

// Branch Setting Schema
var BranchSettingSchema = mongoose.Schema({
   State: { type: Schema.Types.ObjectId, ref: 'StateSetting', required: true },
   District: { type: Schema.Types.ObjectId, ref: 'DistrictSetting', required: true },
   Union: { type: Schema.Types.ObjectId, ref: 'UnionSetting', required: true },
   BranchName: { type: String, required: true },
   Message: { type: String },
   CreatedBy: { type: String },
   UpdatedBy: { type: String },
   IfDeleted: { type: Boolean, required: true }
   },
   {timestamp: true}
)
var VarBranchSettingSchema = mongoose.model('BranchSetting', BranchSettingSchema, 'BranchSetting_List');

// Constitution Setting Schema
var ConstitutionSettingSchema = mongoose.Schema({
   Branch: { type: Schema.Types.ObjectId, ref: 'BranchSetting', required: true },
   ConstitutionName: { type: String, required: true, unique: true },
   Message: { type: String },
   CreatedBy: { type: String },
   UpdatedBy: { type: String },
   IfDeleted: { type: Boolean, required: true }
   },
   {timestamp: true}
);
var VarConstitutionSettingSchema = mongoose.model('ConstitutionSetting', ConstitutionSettingSchema, 'ConstitutionSetting_List');

// Group Setting Schema
var GroupSettingSchema = mongoose.Schema({
   GroupName: { type: String, required: true, unique: true },
   CreatedBy: { type: String },
   UpdatedBy: { type: String },
   IfDeleted: { type: Boolean, required: true }
   },
   {timestamp: true}
);
var VarGroupSettingSchema = mongoose.model('GroupSetting', GroupSettingSchema, 'GroupSetting_List');

// Member Approval Period Setting Schema
var MemberApprovalPeriodSettingSchema = mongoose.Schema({
   ApprovalPeriod: { type: String, required: true },
   CreatedBy: { type: String },
   UpdatedBy: { type: String },
   IfDeleted: { type: Boolean, required: true },
   },
   {timestamp: true}
);
var VarMemberApprovalPeriodSettingSchema = mongoose.model('MemberApprovalPeriodSetting', MemberApprovalPeriodSettingSchema, 'MemberApprovalPeriodSetting_List');

// Complaint Category Setting Schema
var ComplaintCategorySettingSchema = mongoose.Schema({
   ComplaintCategory: { type: String, required: true, unique: true },
   CreatedBy: { type: String },
   UpdatedBy: { type: String },
   IfDeleted: { type: Boolean, required: true }
   },
   {timestamp: true}
);
var VarComplaintCategorySettingSchema = mongoose.model('ComplaintCategorySetting', ComplaintCategorySettingSchema, 'ComplaintCategorySetting_List');

// Advertisement Type Setting Schema
var AdvertisementTypeSettingSchema = mongoose.Schema({
   AdvertisementType: { type: String, required: true, unique: true },
   CreatedBy: { type: String },
   UpdatedBy: { type: String },
   IfDeleted: { type: Boolean, required: true }
   },
   {timestamp: true}
);
var VarAdvertisementTypeSettingSchema = mongoose.model('AdvertisementTypeSetting', AdvertisementTypeSettingSchema, 'AdvertisementTypeSetting_List');

// Booth Setting Schema
var BoothSettingSchema = mongoose.Schema({
   BoothName: { type: String, required: true },
   BoothNumber: { type: String, required: true },
   Message: { type: String },
   CreatedBy: { type: String },
   UpdatedBy: { type: String },
   IfDeleted: { type: Boolean, required: true }
   },
   {timestamp: true}
);
var VarBoothSettingSchema = mongoose.model('BoothSetting', BoothSettingSchema, 'BoothSetting_List');

// official designation Setting Schema
var OfficialDesignationSettingSchema = mongoose.Schema({
   OfficialDesignation : { type: String, required: true, unique: true },
   IfDivision: { type: Boolean, required: true },
   CanCreate: { type: Boolean, required: true },
   CanView: { type: Boolean, required: true },
   CanEdit: { type: Boolean, required: true },
   CanApprove: { type: Boolean, required: true },
   CanDelete: { type: Boolean, required: true },
   StateLevel: { type: Boolean, required: true },
   DistrictLevel: { type: Boolean, required: true },
   ZoneLevel: { type: Boolean, required: true },
   BranchLevel: { type: Boolean, required: true },
   Message: { type: String },
   CreatedBy: { type: String },
   UpdatedBy: { type: String },
   IfDeleted: { type: String },
   },
   {timestamp: true}
);
var VarOfficialDesignationSettingSchema = mongoose.model('OfficialDesignationSetting', OfficialDesignationSettingSchema, 'OfficialDesignationSetting_List');

// Export Schema
module.exports = {
   StateSettingSchema : VarStateSettingSchema,
   DistrictSettingSchema : VarDistrictSettingSchema,
   UnionSettingSchema : VarUnionSettingSchema,
   BranchSettingSchema :  VarBranchSettingSchema,
   ConstitutionSettingSchema : VarConstitutionSettingSchema,
   GroupSettingSchema : VarGroupSettingSchema,
   MemberApprovalPeriodSettingSchema : VarMemberApprovalPeriodSettingSchema,
   ComplaintCategorySettingSchema : VarComplaintCategorySettingSchema,
   AdvertisementTypeSettingSchema : VarAdvertisementTypeSettingSchema,
   BoothSettingSchema : VarBoothSettingSchema,
   OfficialDesignationSettingSchema : VarOfficialDesignationSettingSchema
} 