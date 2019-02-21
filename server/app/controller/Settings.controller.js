var mongoose = require('mongoose');
var SettingsModel = require('../../web/models/Settings.model.js');

// ********************************************* State Settings *********************************************

// App List State of State Settings
exports.AppStateSettings_List = (req, res) => {
   var ReceivingData = req.body;
   SettingsModel.StateSettingSchema.find({IfDeleted: false}, {}, {sort: {UpdatedAt : -1}})
   .exec((err, result) => {
      if(err) {
         res.status(417).send({Status: false, Message: 'Error in finding states'});
      } else {
         res.status(200).send({Status: true, Response: result});
      }
   });
}

// ***************************************** Division Settings **************************************

// App List District from District Setting
exports.AppDistrictSettings_List = (req, res) => {
   var ReceivingData = req.body;
   if(!ReceivingData.State_Id || ReceivingData.State_Id === '' || ReceivingData.State_Id === null) {
      res.status(400).send({Status: false, Message: 'State Detail can\'t be empty'});
   } else {
      SettingsModel.DistrictSettingSchema
      .find({IfDeleted: false, State: mongoose.Types.ObjectId(ReceivingData.State_Id)}, {}, {sort: {UpdatedAt: -1}})
      .populate({ path: 'State', select: ['StateName'] })
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in finding District'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   } 
}

// ***************************************** Zone Settings **************************************

// App List Zone from Zone Setting
exports.AppZoneSettings_List = (req, res) => {
   var ReceivingData = req.body;
   if(!ReceivingData.District_Id || ReceivingData.District_Id === '' || ReceivingData.District_Id === null) {
      res.status(400).send({Status: false, Message: 'District Detail can\'t be empty'});
   } else {
      SettingsModel.ZoneSettingSchema
      .find({IfDeleted: false, District: mongoose.Types.ObjectId(ReceivingData.District_Id)}, {}, {sort: {UpdatedAt: -1}})
      .populate({ path: 'State', select: ['StateName'] })
      .populate({ path: 'District', select: ['DistrictName'] })
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in finding Zone'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   } 
}

// ****************************************** Branch Setting *****************************************

// App Branch List from Branch Setting
exports.AppBranchSettings_List = (req, res) => {
   var ReceivingData = req.body;
   if(!ReceivingData.Zone_Id || ReceivingData.Zone_Id === '' || ReceivingData.Zone_Id === null) {
      res.status(400).send({Status: false, Message: 'Zone Detail can\'t be empty'});
   } else {
      SettingsModel.BranchSettingSchema
      .find({IfDeleted: false, Zone: mongoose.Types.ObjectId(ReceivingData.Zone_Id)}, {}, {sort: {UpdatedAt: -1}})
      .populate({ path: 'State', select: ['StateName'] })
      .populate({ path: 'District', select: ['DistrictName'] })
      .populate({ path: 'Zone', select: ['ZoneName'] })
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in finding branch'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}

// ************************************** Constitution Setting *************************************

// App Constitution Setting list
exports.AppConstitutionSetting_List = (req, res) => {
   var ReceivingData = req.body;
   if(!ReceivingData.Branch_Id || ReceivingData.Branch_Id === '' || ReceivingData.Branch_Id === null) {
      res.status(400).send({Status: false, Message: 'Branch Detail can\'t be empty'});
   } else {
      SettingsModel.ConstitutionSettingSchema
      .find({IfDeleted: false, Branch: mongoose.Types.ObjectId(ReceivingData.Branch_Id)}, {}, {sort: {UpdatedAt: -1}})
      .populate({ path: 'Branch', select: ['BranchName'] })
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in finding Constitution'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}

// ************************************ Group Setting ***********************************************

// App Group Setting List
exports.AppGroupSetting_List = (req, res) => {
   var ReceivingData = req.body;
   SettingsModel.GroupSettingSchema.find({IfDeleted: false}, {}, {sort: {UpdatedAt: -1}})
   .exec((err, result) => {
      if(err) {
         res.status(417).send({Status: false, Message: 'Error in finding group'});
      } else {
         res.status(200).send({Status: true, Response: result});
      }
   });
}

// ****************************************** Member Approval Period Setting ************************

// App Member Approval period List
exports.AppMemberApprovalPeriodSetting_List = (req, res) => {
   var ReceivingData = req.body;
   SettingsModel.MemberApprovalPeriodSettingSchema.find({IfDeleted: false}, {}, {sort: {UpdatedAt: -1}})
   .exec((err, result) => {
      if(err) {
         res.status(417).send({Status: false, Message: 'Error in listing Approval period'});
      } else {
         res.status(200).send({Status: true, Response: result});
      }
   });
}


// ******************************** Complaint Category Setting **************************************

// App Complaint Category List
exports.AppComplaintCategorySetting_List = (req, res) => {
   var ReceivingData = req.body;
   SettingsModel.ComplaintCategorySettingSchema.find({IfDeleted: false}, {}, {sort: {UpdatedAt: -1}})
   .populate({ path: 'ComplaintType', select: ['ComplaintCategory'] })
   .exec((err, result) => {
      if(err) {
         res.status(417).send({Status: false, Message: 'Error in listing Complaint Category'});
      } else {
         res.status(200).send({Status: true, Response: result});
      }
   });
}

// **************************************** Advertisement Type Setting ****************************

// App List Advertisement Type Setting
exports.AppAdvertisementTypeSetting_List = (req, res) => {
   var ReceivingData = req.body;
   SettingsModel.AdvertisementTypeSettingSchema.find({IfDeleted: false}, {}, {sort: {UpdatedAt: -1}})
   .exec((err, result) => {
      if(err) {
         res.status(417).send({Status: false, Message: 'Error in creating Advertisement'});
      } else {
         res.status(200).send({Status: true, Response: result});
      }
   });
}

// ************************************** Booth Setting ******************************************

// App List Booth Setting
exports.AppBoothSetting_List = (req, res) => {
   var ReceivingData = req.body;
   SettingsModel.BoothSettingSchema.find({IfDeleted: false}, {}, {sort: {UpdatedAt: -1}})
   .exec((err, result) => {
      if(err) {
         res.status(417).send({Status: false, Message: 'Error in creating booth'});
      } else {
         res.status(200).send({Status: true, Response: result});
      }
   });
}

// ************************************** Official Designation Setting ******************************************

// App List official designation Setting
exports.AppOfficialDesignationSetting_List = (req, res) => {
   var ReceivingData = req.body;
   SettingsModel.OfficialDesignationSettingSchema.find({IfDeleted: false}, {}, {sort: {UpdatedAt: -1}})
   .exec((err, result) => {
      if(err) {
         res.status(417).send({Status: false, Message: 'Error in finding Official Designation'});
      } else {
         res.status(200).send({Status: true, Response: result});
      }
   });
}


// ************************************** RelationShip Type Setting ******************************************

// App Relation Type Setting
exports.AppRelationShipType_List = (req, res) => {
   var ReceivingData = req.body;
   SettingsModel.RelationShipTypeSchema.find({IfDeleted: false}, {}, {sort: {UpdatedAt: -1}})
   .exec((err, result) => {
      if(err) {
         res.status(417).send({Status: false, Message: 'Error in finding Relationship Type'});
      } else {
         res.status(200).send({Status: true, Response: result});
      }
   });
}

