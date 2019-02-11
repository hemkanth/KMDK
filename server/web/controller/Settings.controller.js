var mongoose = require('mongoose');
var SettingsModel = require('../models/Settings.model.js');

// ********************************************* State Settings *********************************************

// Create State in State Settings
exports.StateSettings_Create = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty' });
   } else if(!ReceivingData.StateName || ReceivingData.StateName === '' || ReceivingData.StateName === null) {
      res.status(400).send({Status: false, Message: 'State name can\'t be empty' });
   } else {
      var Create_StateSetting = new SettingsModel.StateSettingSchema({
         StateName : ReceivingData.StateName,
         CreatedBy : ReceivingData.User_Id,
         UpdatedBy : ReceivingData.User_Id,
         IfDeleted : false
      });
      Create_StateSetting.save((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in saving state'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully state saved'});
         }
      });
   }
}

// List State of State Settings
exports.StateSettings_List = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else {
      SettingsModel.StateSettingSchema.find({IfDeleted: false}, {}, {sort: {updatedAt : -1}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in finding states'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}

// View State in State Setting
exports.StateSettings_View = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty' });
   } else if(!ReceivingData.StateSetting_Id || ReceivingData.StateSetting_Id === '' || ReceivingData.StateSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'State Details can\'t be empty' });
   } else {
      SettingsModel.StateSettingSchema
      .findOne({_id: mongoose.Types.ObjectId(ReceivingData.StateSetting_Id), IfDeleted: false}, {}, {})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in updating states'});
         } else {
            res.status(417).send({Status: true, Response: result});
         }
      });
   }
}

// Edit State in State Setting
exports.StateSettings_Edit = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty' });
   } else if(!ReceivingData.StateSetting_Id || ReceivingData.StateSetting_Id === '' || ReceivingData.StateSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'State Details can\'t be empty' });
   } else if(!ReceivingData.StateName || ReceivingData.StateName === '' || ReceivingData.StateName === null) {
      res.status(400).send({Status: false, Message: 'State name can\'t be empty' });
   } else {
      SettingsModel.StateSettingSchema
      .updateMany({_id: mongoose.Types.ObjectId(ReceivingData.StateSetting_Id), IfDeleted: false}, {$set: {StateName: ReceivingData.StateName, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in updating states'});
         } else {
            res.status(417).send({Status: true, Message: 'Successfully state updated'});
         }
      });
   }
}

// Delete State in State Setting
exports.StateSettings_Delete = (req, res) => {
   var ReceivingData = req.body.Info;
   
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty' });
   } else if(!ReceivingData.StateSetting_Id || ReceivingData.StateSetting_Id === '' || ReceivingData.StateSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'State Details can\'t be empty' });
   } else {
      SettingsModel.StateSettingSchema
      .updateMany({_id: mongoose.Types.ObjectId(ReceivingData.StateSetting_Id), IfDeleted: false}, {$set: {IfDeleted: true, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in deleting states'});
         } else {
            res.status(417).send({Status: true, Message: 'Successfully state deleted'});
         }
      });
   }
}

// ***************************************** Division Settings **************************************

// Create District in District Setting
exports.DistrictSettings_Create = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User Detail can\'t be empty'});
   } else if(!ReceivingData.State_Id || ReceivingData.State_Id === '' || ReceivingData.State_Id === null) {
      res.status(400).send({Status: false, Message: 'State Detail can\'t be empty'});
   } else if(!ReceivingData.DistrictName || ReceivingData.DistrictName === '' || ReceivingData.DistrictName === null) {
      res.status(400).send({Status: false, Message: 'District Detail can\'t be empty'});
   } else {
      var Create_DistrictSettings = new SettingsModel.DistrictSettingSchema({
         State: mongoose.Types.ObjectId(ReceivingData.State_Id),
         DistrictName: ReceivingData.DistrictName,
         Message: ReceivingData.Message,
         CreatedBy: ReceivingData.User_Id,
         UpdatedBy: ReceivingData.User_Id,
         IfDeleted: false
      });
      Create_DistrictSettings.save((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in saving district'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully district create'});
         }
      });
   }
}

// List District from District Setting
exports.DistrictSettings_List = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User Detail can\'t be empty'});
   } else {
      SettingsModel.DistrictSettingSchema.find({IfDeleted: false}, {}, {sort: {updatedAt: -1}})
      .populate({ path: 'State', select: ['StateName'] })
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in finding states'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   } 
}

// View District from District Settings
exports.DistrictSettings_View = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User Detail can\'t be empty'});
   } else if(!ReceivingData.DistrictSetting_Id || ReceivingData.DistrictSetting_Id === '' || ReceivingData.DistrictSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'District Details can\'t be empty' });
   } else {
      SettingsModel.DistrictSettingSchema
      .findOne({_id: mongoose.Types.ObjectId(ReceivingData.DistrictSetting_Id), IfDeleted: false}, {}, {})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in view district'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}

// Edit District from District Settings
exports.DistrictSettings_Edit = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.DistrictSetting_Id || ReceivingData.DistrictSetting_Id === '' || ReceivingData.DistrictSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'District Details can\'t be empty' });
   } else if(!ReceivingData.State_Id || ReceivingData.State_Id === '' || ReceivingData.State_Id === null) {
      res.status(400).send({Status: false, Message: 'State Details can\'t be empty' });
   } else if(!ReceivingData.DistrictName || ReceivingData.DistrictName === '' || ReceivingData.DistrictName === null) {
      res.status(400).send({Status: false, Message: 'District Details can\'t be empty' });
   } else {
      SettingsModel.DistrictSettingSchema
      .updateMany({_id: mongoose.Types.ObjectId(ReceivingData.DistrictSetting_Id), IfDeleted: false}, {$set: {State: mongoose.Types.ObjectId(ReceivingData.State_Id), DistrictName: ReceivingData.DistrictName, Message: ReceivingData.Message, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in updating district'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in district updated'});
         }
      });
   }
}

// Delete District from District Settings
exports.DistrictSettings_Delete = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User Detail can\'t be empty'});
   } else if(!ReceivingData.DistrictSetting_Id || ReceivingData.DistrictSetting_Id === '' || ReceivingData.DistrictSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'District Details can\'t be empty' });
   } else {
      SettingsModel.DistrictSettingSchema
      .updateMany({_id: mongoose.Types.ObjectId(ReceivingData.DistrictSetting_Id), IfDeleted: false}, {$set: {IfDeleted: true, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in deleting district'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in district deleted'});
         }
      });
   }
}

// ***************************************** Zone Settings **************************************

// Create Zone in Zone Setting
exports.ZoneSettings_Create = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User Detail can\'t be empty'});
   } else if(!ReceivingData.State_Id || ReceivingData.State_Id === '' || ReceivingData.State_Id === null) {
      res.status(400).send({Status: false, Message: 'State Detail can\'t be empty'});
   } else if(!ReceivingData.District_Id || ReceivingData.District_Id === '' || ReceivingData.District_Id === null) {
      res.status(400).send({Status: false, Message: 'District Detail can\'t be empty'});
   } else if(!ReceivingData.ZoneName || ReceivingData.ZoneName === '' || ReceivingData.ZoneName === null) {
      res.status(400).send({Status: false, Message: 'Zone Detail can\'t be empty'});
   } else {
      var Create_ZoneSettings = new SettingsModel.ZoneSettingSchema({
         State: mongoose.Types.ObjectId(ReceivingData.State_Id),
         District: mongoose.Types.ObjectId(ReceivingData.District_Id),
         ZoneName: ReceivingData.ZoneName,
         Message: ReceivingData.Message,
         CreatedBy: ReceivingData.User_Id,
         UpdatedBy: ReceivingData.User_Id,
         IfDeleted: false
      });
      Create_ZoneSettings.save((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in saving Zone'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully Zone create'});
         }
      });
   }
}

// List Zone from Zone Setting
exports.ZoneSettings_List = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User Detail can\'t be empty'});
   } else {
      SettingsModel.ZoneSettingSchema.find({IfDeleted: false}, {}, {sort: {updatedAt: -1}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in finding Zone'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   } 
}

// View Zone from Zone Settings
exports.ZoneSettings_View = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.ZoneSetting_Id || ReceivingData.ZoneSetting_Id === '' || ReceivingData.ZoneSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Zone Details can\'t be empty' });
   } else {
      SettingsModel.ZoneSettingSchema
      .findOne({_id: mongoose.Types.ObjectId(ReceivingData.ZoneSetting_Id), IfDeleted: false}, {}, {})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in view district'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}

// Edit Zone from Zone Settings
exports.ZoneSettings_Edit = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User Detail can\'t be empty'});
   } else if(!ReceivingData.ZoneSetting_Id || ReceivingData.ZoneSetting_Id === '' || ReceivingData.ZoneSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Zone Details can\'t be empty' });
   } else if(!ReceivingData.State_Id || ReceivingData.State_Id === '' || ReceivingData.State_Id === null) {
      res.status(400).send({Status: false, Message: 'State Details can\'t be empty' });
   } else if(!ReceivingData.District_Id || ReceivingData.ZoneName === '' || ReceivingData.ZoneName === null) {
      res.status(400).send({Status: false, Message: 'District Details can\'t be empty' });
   } else if(!ReceivingData.ZoneName || ReceivingData.ZoneName === '' || ReceivingData.ZoneName === null) {
      res.status(400).send({Status: false, Message: 'Zone Details can\'t be empty' });
   } else {
      SettingsModel.ZoneSettingSchema
      .updateMany({_id: mongoose.Types.ObjectId(ReceivingData.DistrictSetting_Id), IfDeleted: false}, {$set: {State: mongoose.Types.ObjectId(ReceivingData.State_Id), District: mongoose.Types.ObjectId(ReceivingData.District_Id), ZoneName: ReceivingData.ZoneName, Message: ReceivingData.Message, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in updating Zone'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in Zone updated'});
         }
      });
   }
}

// Delete Zone from Zone Settings
exports.ZoneSettings_Delete = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.ZoneSetting_Id || ReceivingData.ZoneSetting_Id === '' || ReceivingData.ZoneSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Zone Details can\'t be empty' });
   } else {
      SettingsModel.ZoneSettingSchema
      .updateMany({_id: mongoose.Types.ObjectId(ReceivingData.ZoneSetting_Id), IfDeleted: false}, {$set: {IfDeleted: true, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in deleting district'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in Zone deleted'});
         }
      });
   }
}

// ****************************************** Branch Setting *****************************************
// Create Branch setting
exports.BranchSettings_Create = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.State_Id || ReceivingData.State_Id === '', ReceivingData.State_Id === null) {
      res.status(400).send({Status: false, Message: 'State details can\'t bew empty'});
   } else if(!ReceivingData.District_Id || ReceivingData.District_Id === '', ReceivingData.District_Id === null) {
      res.status(400).send({Status: false, Message: 'District details can\'t bew empty'});
   } else if(!ReceivingData.Zone_Id || ReceivingData.Zone_Id === '', ReceivingData.Zone_Id === null) {
      res.status(400).send({Status: false, Message: 'Zone details can\'t bew empty'});
   } else if(!ReceivingData.BranchName || ReceivingData.BranchName === '', ReceivingData.BranchName === null) {
      res.status(400).send({Status: false, Message: 'Branch details can\'t bew empty'});
   } else {
      var Create_BranchSetting = new SettingsModel.BranchSettingSchema({
         State: mongoose.Types.ObjectId(ReceivingData.State_Id),
         District: mongoose.Types.ObjectId(ReceivingData.District_Id),
         Zone: mongoose.Types.ObjectId(ReceivingData.Zone_Id),
         BranchName: ReceivingData.BranchName,
         CreatedBy: ReceivingData.User_Id,
         UpdatedBy: ReceivingData.User_Id,
         IfDeleted: false
      });
      Create_BranchSetting.save((err, result) => {
         if(err) {
            console.log(err);
            res.status(417).send({Status: false, Message: 'Error in creating branch'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in branch created'});
         }
      });
   }
}

// Branch List from Branch Setting
exports.BranchSettings_List = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'user details can\'t bew empty'});
   } else {
      SettingsModel.BranchSettingSchema.find({IfDeleted: false}, {}, {sort: {updatedAt: -1}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in creating branch'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}

// Branch view from Branch Setting
exports.BranchSettings_View = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'user details can\'t bew empty'});
   } else if(!ReceivingData.BranchSetting_Id || ReceivingData.BranchSetting_Id === '' || ReceivingData.BranchSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Branch details can\'t bew empty'});
   } else {
      SettingsModel.BranchSettingSchema
      .findOne({_id: mongoose.Types.ObjectId(ReceivingData.BranchSetting_Id) ,IfDeleted: false}, {}, {})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in viewing branch'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}

// Branch edit from Branch Setting
exports.BranchSettings_Edit = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User Detail can\'t be empty'});
   } else if(!ReceivingData.BranchSetting_Id || ReceivingData.BranchSetting_Id === '' || ReceivingData.BranchSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Branch details can\'t bew empty'});
   } else if(!ReceivingData.State_Id || ReceivingData.State_Id === '' || ReceivingData.State_Id === null) {
      res.status(400).send({Status: false, Message: 'State details can\'t bew empty'});
   } else if(!ReceivingData.District_Id || ReceivingData.District_Id === '' || ReceivingData.District_Id === null) {
      res.status(400).send({Status: false, Message: 'District details can\'t bew empty'});
   } else if(!ReceivingData.Zone_Id || ReceivingData.Zone_Id === '' || ReceivingData.Zone_Id === null) {
      res.status(400).send({Status: false, Message: 'Zone details can\'t bew empty'});
   } else if(!ReceivingData.BranchName || ReceivingData.BranchName === '' || ReceivingData.BranchName === null) {
      res.status(400).send({Status: false, Message: 'Branch details can\'t bew empty'});
   } else {
      SettingsModel.BranchSettingSchema
      .updateMany({_id: mongoose.Types.ObjectId(ReceivingData.BranchSetting_Id), IfDeleted: false}, {$set: {State: mongoose.Types.ObjectId(ReceivingData.BranchSetting_Id), District: mongoose.Types.ObjectId(ReceivingData.District_Id), Zone: mongoose.Types.ObjectId(Zone_Id), BranchName: ReceivingData.BranchName, Message: ReceivingData.Message, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in update branch'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in branch updated'});
         }
      });
   }
}

// Branch delete from Branch Stetting
exports.BranchSettings_Delete = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'user details can\'t bew empty'});
   } else if(!ReceivingData.BranchSetting_Id || ReceivingData.BranchSetting_Id === '' || ReceivingData.BranchSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Branch details can\'t bew empty'});
   } else {
      SettingsModel.BranchSettingSchema
      .updateMany({_id: mongoose.Types.ObjectId(ReceivingData.BranchSetting_Id) ,IfDeleted: false}, {$set: {IfDeleted: true, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in viewing branch'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully branch deleted'});
         }
      });
   }
}

// ************************************** Constitution Setting *************************************
// Constitution Setting Create
exports.ConstitutionSetting_Create = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User Detail can\'t be empty'});
   } else if(!ReceivingData.BranchSetting_Id || ReceivingData.BranchSetting_Id === '' || ReceivingData.BranchSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Branch details can\'t bew empty'});
   } else if(!ReceivingData.ConstitutionName || ReceivingData.ConstitutionName === '' || ReceivingData.ConstitutionName === null) {
      res.status(400).send({Status: false, Message: 'Constitution details can\'t bew empty'});
   } else {
      var Create_ConstitutionSetting = new SettingsModel.ConstitutionSettingSchema({
         Branch: mongoose.Types.ObjectId(ReceivingData.BranchSetting_Id),
         ConstitutionName: ReceivingData.ConstitutionName,
         Message: ReceivingData.Message,
         CreatedBy: ReceivingData.User_Id,
         UpdatedBy: ReceivingData.User_Id,
         IfDeleted: false
      });
      Create_ConstitutionSetting.save((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in creating Constitution'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully Constitution Created'});
         }
      });
   }
}

// Constitution Setting list
exports.ConstitutionSetting_List = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
     res.status(400).send({Status: false, Message: 'user details can\'t bew empty'});
   } else {
      SettingsModel.ConstitutionSettingSchema.find({IfDeleted: false}, {}, {sort: {updatedAt: -1}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in listing Constitution'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}
// Constitution Setting View
exports.ConstitutionSetting_View = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'user details can\'t bew empty'});
   } else if(!ReceivingData.ConstitutionSetting_Id || ReceivingData.ConstitutionSetting_Id === '' || ReceivingData.ConstitutionSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Constitution details can\'t bew empty'});
   } else {
      SettingsModel.ConstitutionSettingSchema
      .findOne({_id: mongoose.Types.ObjectId(ConstitutionSetting_Id), IfDeleted: false}, {})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in viewing Constitution'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}

// Constitution setting edit
exports.ConstitutionSetting_Edit = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.ConstitutionSetting_Id || ReceivingData.ConstitutionSetting_Id === '' || ReceivingData.ConstitutionSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Constitution details can\'t bew empty'});
   } else if(!ReceivingData.BranchSetting_Id || ReceivingData.BranchSetting_Id === '' || ReceivingData.BranchSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Branch details can\'t bew empty'});
   } else if(!ReceivingData.ConstitutionName || ReceivingData.ConstitutionName === '' || ReceivingData.ConstitutionName === null) {
      res.status(400).send({Status: false, Message: 'Constitution name can\'t bew empty'});
   } else {
      SettingsModel.ConstitutionSettingSchema
      .updateMany({_id: mongoose.Types.ObjectId(ReceivingData.ConstitutionSetting_Id), IfDeleted: false}, {$set: {Branch: mongoose.Types.ObjectId(ReceivingData.BranchSetting_Id), ConstitutionName: ReceivingData.ConstitutionName, Message: ReceivingData.Message, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in updating Constitution'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in Constitution updated'});
         }
      });
   } 
} 

// Constitution setting delete
exports.ConstitutionSetting_Delete = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.ConstitutionSetting_Id || ReceivingData.ConstitutionSetting_Id === '' || ReceivingData.ConstitutionSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Constitution details can\'t bew empty'});
   } else {
      SettingsModel.ConstitutionSettingSchema
      .updateMany({_id: mongoose.Types.ObjectId(ReceivingData.ConstitutionSetting_Id), IfDeleted: false}, {$set: {IfDeleted: true, updatedAt: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in deleting Constitution'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in Constitution deleted'});
         }
      });
   } 
} 

// ************************************ Group Setting ***********************************************
//Create Group Settings
exports.GroupSetting_Create = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.GroupName || ReceivingData.GroupName === '' || ReceivingData.GroupName === null) {
      res.status(400).send({Status: false, Message: 'Group details can\'t be empty'});
   } else {
      var Create_GroupSetting = new SettingsModel.GroupSettingSchema({
         GroupName: ReceivingData.GroupName,
         CreatedBy: ReceivingData.User_Id,
         UpdatedBy: ReceivingData.User_Id,
         IfDeleted: false
      });
      Create_GroupSetting.save((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in Creating Group'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in Group Created'});
         }
      });
   }
}

// Group Setting List
exports.GroupSetting_List = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else {
      SettingsModel.GroupSettingSchema.find({IfDeleted: false}, {}, {sort: {updatedAt: -1}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in listing group'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}

// Group Setting View
exports.GroupSetting_View = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.GroupSetting_Id || ReceivingData.GroupSetting_Id === '' || ReceivingData.GroupSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Group details can\'t be empty'});
   } else {
      SettingsModel.GroupSettingSchema
      .findOne({_id: mongoose.Types.ObjectId(ReceivingData.GroupSetting_Id), IfDeleted: false}, {})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in viewing group'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}


// Group Setting Edit
exports.GroupSetting_Edit = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.GroupSetting_Id || ReceivingData.GroupSetting_Id === '' || ReceivingData.GroupSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Group details can\'t be empty'});
   } else if(!ReceivingData.GroupName || ReceivingData.GroupName === '' || ReceivingData.GroupName === null) {
      res.status(400).send({Status: false, Message: 'Group name details can\'t be empty'});
   } else {
      SettingsModel.GroupSettingSchema
      .updateMany({_id: mongoose.Types.ObjectId(ReceivingData.GroupSetting_Id), IfDeleted: false}, {$set: {GroupName: ReceivingData.GroupName, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in editing group'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully Group Edited'});
         }
      });
   }
}

// Group Setting Delete
exports.GroupSetting_Delete = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.GroupSetting_Id || ReceivingData.GroupSetting_Id === '' || ReceivingData.GroupSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Group details can\'t be empty'});
   } else {
      SettingsModel.GroupSettingSchema
      .updateMany({_id: mongoose.Types.ObjectId(ReceivingData.GroupSetting_Id), IfDeleted: false}, {$set: {IfDeleted: true, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in deleting group'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully Group deleted'});
         }
      });
   }
}

// ****************************************** Member Approval Period Setting ************************
// Create Member Approval Period Setting
exports.MemberApprovalPeriodSetting_Create = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.ApprovalPeriod || ReceivingData.ApprovalPeriod === '' || ReceivingData.ApprovalPeriod === null) {
      res.status(400).send({Status: false, Message: 'Approval Period details can\'t be empty'});
   } else{
      var Create_MemberApprovalPeriodSetting = new SettingsModel.MemberApprovalPeriodSettingSchema({
         ApprovalPeriod: ReceivingData.ApprovalPeriod,
         CreatedBy: ReceivingData.User_Id,
         UpdatedBy: ReceivingData.User_Id,
         IfDeleted: false
      });
      Create_MemberApprovalPeriodSetting.save((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in creating Approval period'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully Approval period Created'});
         }
      });
   } 
}

// Member Approval period List
exports.MemberApprovalPeriodSetting_List = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else{
      SettingsModel.MemberApprovalPeriodSettingSchema.find({IfDeleted: false}, {}, {sort: {updatedAt: -1}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in listing Approval period'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   } 
}

// Member Approval period View
exports.MemberApprovalPeriodSetting_View = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.MemberApprovalPeriodSetting_Id || ReceivingData.MemberApprovalPeriodSetting_Id === '' || ReceivingData.MemberApprovalPeriodSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Member Approval Period details can\'t be empty'});
   } else{
      SettingsModel.MemberApprovalPeriodSettingSchema
      .findOne({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.MemberApprovalPeriodSetting_Id)}, {})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in viewing Approval period'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   } 
}

// Member Approval period edit
exports.MemberApprovalPeriodSetting_Edit = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.MemberApprovalPeriodSetting_Id || ReceivingData.MemberApprovalPeriodSetting_Id === '' || ReceivingData.MemberApprovalPeriodSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Member Approval Period details can\'t be empty'});
   } else if(!ReceivingData.ApprovalPeriod || ReceivingData.ApprovalPeriod === '' || ReceivingData.ApprovalPeriod === null) {
      res.status(400).send({Status: false, Message: 'Approval Period details can\'t be empty'});
   } else {
      SettingsModel.MemberApprovalPeriodSettingSchema
      .updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.MemberApprovalPeriodSetting_Id)}, {$set: {ApprovalPeriod: ReceivingData.ApprovalPeriod, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in updating Approval period'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in updated Approval period'});
         }
      });
   } 
}
// Member Approval period delete
exports.MemberApprovalPeriodSetting_Delete = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.MemberApprovalPeriodSetting_Id || ReceivingData.MemberApprovalPeriodSetting_Id === '' || ReceivingData.MemberApprovalPeriodSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Member Approval Period details can\'t be empty'});
   } else {
      SettingsModel.MemberApprovalPeriodSettingSchema
      .updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.MemberApprovalPeriodSetting_Id)}, {$set: {IfDeleted: true, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in deleting Approval period'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in deleted Approval period'});
         }
      });
   } 
} 

// ******************************** Complaint Category Setting **************************************
// Create Complaint Category Setting
exports.ComplaintCategorySetting_Create = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.ComplaintCategory || ReceivingData.ComplaintCategory === '' || ReceivingData.ApprovalPeriod === null) {
      res.status(400).send({Status: false, Message: 'Complaint Category details can\'t be empty'});
   } else{
      var Create_ComplaintCategorySetting = new SettingsModel.ComplaintCategorySettingSchema({
         ComplaintCategory: ReceivingData.ComplaintCategory,
         CreatedBy: ReceivingData.User_Id,
         UpdatedBy: ReceivingData.User_Id,
         IfDeleted: false
      });
      Create_ComplaintCategorySetting.save((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in creating Complaint Category'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully Complaint Category Created'});
         }
      });
   } 
}

// Complaint Category List
exports.ComplaintCategorySetting_List = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else{
      SettingsModel.ComplaintCategorySettingSchema.find({IfDeleted: false}, {}, {sort: {updatedAt: -1}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in listing Complaint Category'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   } 
}

// Complaint Category View
exports.ComplaintCategorySetting_View = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.ComplaintCategorySetting_Id || ReceivingData.ComplaintCategorySetting_Id === '' || ReceivingData.ComplaintCategorySetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Complaint Category details can\'t be empty'});
   } else{
      SettingsModel.ComplaintCategorySettingSchema
      .findOne({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.ComplaintCategorySetting_Id)}, {})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in viewing Complaint Category'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   } 
}

// Complaint Category edit
exports.ComplaintCategorySetting_Edit = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.ComplaintCategorySetting_Id || ReceivingData.ComplaintCategorySetting_Id === '' || ReceivingData.ComplaintCategorySetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Complaint Category details can\'t be empty'});
   } else if(!ReceivingData.ComplaintCategory || ReceivingData.ComplaintCategory === '' || ReceivingData.ComplaintCategory === null) {
      res.status(400).send({Status: false, Message: 'ComplaintCategory details can\'t be empty'});
   } else {
      SettingsModel.ComplaintCategorySettingSchema
      .updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.ComplaintCategorySetting_Id)}, {$set: {ComplaintCategory: ReceivingData.ComplaintCategory, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in updating ComplaintCategory'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in updated Complaint Category'});
         }
      });
   } 
}
// Complaint Category delete
exports.ComplaintCategorySetting_Delete = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.ComplaintCategorySetting_Id || ReceivingData.ComplaintCategorySetting_Id === '' || ReceivingData.ComplaintCategorySetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Member Approval Period details can\'t be empty'});
   } else {
      SettingsModel.ComplaintCategorySettingSchema
      .updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.ComplaintCategorySetting_Id)}, {$set: {IfDeleted: true, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in deleting Approval period'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in deleted Approval period'});
         }
      });
   } 
} 

// **************************************** Advertisement Type Setting ****************************

// Create Advertisement Type Setting
exports.AdvertisementTypeSetting_Create = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.AdvertisementType || ReceivingData.AdvertisementType === '' || ReceivingData.AdvertisementType === null) {
      res.status(400).send({Status: false, Message: 'Advertisement details can\'t be empty'});
   } else {
      var Create_AdvertisementTypeSetting = new SettingsModel.AdvertisementTypeSettingSchema({
         AdvertisementType : ReceivingData.AdvertisementType,
         CreatedBy : ReceivingData.User_Id,
         UpdatedBy : ReceivingData.User_Id,
         IfDeleted : false
      });
      Create_AdvertisementTypeSetting.save((err, req) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in creating Advertisement'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in Created Advertisement Type'});
         }
      });
   }
}

// List Advertisement Type Setting
exports.AdvertisementTypeSetting_List = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else {
      SettingsModel.AdvertisementTypeSettingSchema.find({IfDeleted: false}, {}, {sort: {updatedAt: -1}})
      .exec((err, req) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in creating Advertisement'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}

// View Advertisement Type Setting
exports.AdvertisementTypeSetting_View = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.AdvertisementTypeSetting_Id || ReceivingData.AdvertisementTypeSetting_Id === '' || ReceivingData.AdvertisementTypeSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Advertisement details can\'t be empty'});
   } else {
      SettingsModel.AdvertisementTypeSettingSchema
      .findOne({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.AdvertisementTypeSetting_Id)}, {}, {sort: {updatedAt: -1}})
      .exec((err, req) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in creating Advertisement'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}

// Edit Advertisement Type Setting
exports.AdvertisementTypeSetting_Edit = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.AdvertisementTypeSetting_Id || ReceivingData.AdvertisementTypeSetting_Id === '' || ReceivingData.AdvertisementTypeSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Advertisement details can\'t be empty'});
   } else if(!ReceivingData.AdvertisementType || ReceivingData.AdvertisementType === '' || ReceivingData.AdvertisementType === null) {
      res.status(400).send({Status: false, Message: 'Advertisement details can\'t be empty'});
   } else {
      SettingsModel.AdvertisementTypeSettingSchema
      .updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.AdvertisementTypeSetting_Id)}, {$set: {AdvertisementType: ReceivingData.AdvertisementType, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, req) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in updating Advertisement'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in updated Advertisement'});
         }
      });
   }
}

// delete Advertisement Type Setting
exports.AdvertisementTypeSetting_Delete = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.AdvertisementTypeSetting_Id || ReceivingData.AdvertisementTypeSetting_Id === '' || ReceivingData.AdvertisementTypeSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Advertisement details can\'t be empty'});
   } else {
      SettingsModel.AdvertisementTypeSettingSchema
      .updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.AdvertisementTypeSetting_Id)}, {$set: {IfDeleted: true, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, req) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in deleting Advertisement'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in deleted Advertisement'});
         }
      });
   }
}

// ************************************** Booth Setting ******************************************

// Create Booth Setting
exports.BoothSetting_Create = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.BoothName || ReceivingData.BoothName === '' || ReceivingData.BoothName === null) {
      res.status(400).send({Status: false, Message: 'Booth Name can\'t be empty'});
   } else if(!ReceivingData.BoothNumber || ReceivingData.BoothNumber === '' || ReceivingData.BoothNumber === null) {
      res.status(400).send({Status: false, Message: 'Booth Number can\'t be empty'});
   } else {
      var Create_BoothSetting = new SettingsModel.BoothSettingSchema({
         BoothName : ReceivingData.BoothName,
         BoothNumber : ReceivingData.BoothNumber,
         CreatedBy :  ReceivingData.User_Id,
         UpdatedBy : ReceivingData.User_Id,
         IfDeleted : false
      });
      Create_BoothSetting.save((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in creating booth'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in Created Booth'});
         }
      });
   }
}

// List Booth Setting
exports.BoothSetting_List = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else {
      SettingsModel.BoothSettingSchema.find({IfDeleted: false}, {}, {sort: {updatedAt: -1}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in creating booth'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}
// View Booth Setting
exports.BoothSetting_View = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.BoothSetting_Id || ReceivingData.BoothSetting_Id === '' || ReceivingData.BoothSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Booth details can\'t be empty'});
   } else {
      SettingsModel.BoothSettingSchema
      .findOne({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.BoothSetting_Id)}, {})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in viewing booth'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}

// Edit Booth Setting
exports.BoothSetting_Edit = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.BoothSetting_Id || ReceivingData.BoothSetting_Id === '' || ReceivingData.BoothSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Booth details can\'t be empty'});
   } else if(!ReceivingData.BoothName || ReceivingData.BoothName === '' || ReceivingData.BoothName === null) {
      res.status(400).send({Status: false, Message: 'Booth name can\'t be empty'});
   } else if(!ReceivingData.BoothNumber || ReceivingData.BoothNumber === '' || ReceivingData.BoothNumber === null) {
      res.status(400).send({Status: false, Message: 'Booth number can\'t be empty'});
   } else {
      SettingsModel.BoothSettingSchema
      .updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.BoothSetting_Id)}, {$set: {BoothName: ReceivingData.BoothName, BoothNumber: ReceivingData.BoothNumber, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in updating booth'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in Updated Booth'});
         }
      });
   }
}

// Delete Booth Setting
exports.BoothSetting_Delete = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.BoothSetting_Id || ReceivingData.BoothSetting_Id === '' || ReceivingData.BoothSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Booth details can\'t be empty'});
   } else {
      SettingsModel.BoothSettingSchema
      .updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.BoothSetting_Id)}, {$set: { IfDeleted: true ,UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in deleting booth'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in Deleted Booth'});
         }
      });
   }
}

// ************************************** Official Designation Setting ******************************************

// Create official designation Setting
exports.OfficialDesignationSetting_Create = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.OfficialDesignation || ReceivingData.OfficialDesignation === '' || ReceivingData.OfficialDesignation === null) {
      res.status(400).send({Status: false, Message: 'Official Designation can\'t be empty'});
   } else if(!ReceivingData.IfDivision || ReceivingData.IfDivision === '' || ReceivingData.IfDivision === null) {
      res.status(400).send({Status: false, Message: 'Division can\'t be empty'});
   } else if(!ReceivingData.CanCreate || ReceivingData.CanCreate === '' || ReceivingData.CanCreate === null) {
      res.status(400).send({Status: false, Message: 'Permission details can\'t be empty'});
   } else if(!ReceivingData.CanView || ReceivingData.CanView === '' || ReceivingData.CanView === null) {
      res.status(400).send({Status: false, Message: 'Permission details can\'t be empty'});
   } else if(!ReceivingData.CanEdit || ReceivingData.CanEdit === '' || ReceivingData.CanEdit === null) {
      res.status(400).send({Status: false, Message: 'Permission details can\'t be empty'});
   } else if(!ReceivingData.CanApprove || ReceivingData.CanApprove === '' || ReceivingData.CanApprove === null) {
      res.status(400).send({Status: false, Message: 'Permission details can\'t be empty'});
   } else if(!ReceivingData.CanDelete || ReceivingData.CanDelete === '' || ReceivingData.CanDelete === null) {
      res.status(400).send({Status: false, Message: 'Permission details can\'t be empty'});
   } else if(!ReceivingData.StateLevel || ReceivingData.StateLevel === '' || ReceivingData.StateLevel === null) {
      res.status(400).send({Status: false, Message: 'Level details can\'t be empty'});
   } else if(!ReceivingData.DistrictLevel || ReceivingData.DistrictLevel === '' || ReceivingData.DistrictLevel === null) {
      res.status(400).send({Status: false, Message: 'Level details can\'t be empty'});
   } else if(!ReceivingData.ZoneLevel || ReceivingData.ZoneLevel === '' || ReceivingData.ZoneLevel === null) {
      res.status(400).send({Status: false, Message: 'Level details can\'t be empty'});
   } else if(!ReceivingData.BranchLevel || ReceivingData.BranchLevel === '' || ReceivingData.BranchLevel === null) {
      res.status(400).send({Status: false, Message: 'Level details can\'t be empty'});
   } else {
      var Create_OfficialDesignationSetting = new SettingsModel.BoothSettingSchema({
         OfficialDesignation : ReceivingData.OfficialDesignation,
         IfDivision: ReceivingData.IfDivision,
         CanCreate: ReceivingData.CanCreate,
         CanView: ReceivingData.CanView,
         CanEdit: ReceivingData.CanEdit,
         CanApprove: ReceivingData.CanApprove,
         CanDelete: ReceivingData.CanDelete,
         StateLevel: ReceivingData.StateLevel,
         DistrictLevel: ReceivingData.DistrictLevel,
         ZoneLevel: ReceivingData.ZoneLevel,
         BranchLevel: ReceivingData.BranchLevel,
         Message: ReceivingData.Message,
         CreatedBy: ReceivingData.User_Id,
         UpdatedBy: ReceivingData.User_Id,
         IfDeleted: false,
      });
      Create_OfficialDesignationSetting.save((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in creating Official Designation'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully in Created Official Designation'});
         }
      });
   }
}

// List official designation Setting
exports.OfficialDesignationSetting_List = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else {
      SettingsModel.OfficialDesignationSettingSchema.find({IfDeleted: false}, {}, {sort: {updatedAt: -1}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in finding Official Designation'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}

// View official designation Setting
exports.OfficialDesignationSetting_View = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.OfficialDesignationSetting_Id || ReceivingData.OfficialDesignationSetting_Id === '' || ReceivingData.OfficialDesignationSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Official Designation details can\'t be empty'});
   } else {
      SettingsModel.OfficialDesignationSettingSchema
      .findOne({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.OfficialDesignationSetting_Id)}, {})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in viewing Official Designation'});
         } else {
            res.status(200).send({Status: true, Response: result});
         }
      });
   }
}

// Edit official designation Setting
exports.OfficialDesignationSetting_Edit = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.OfficialDesignationSetting_Id || ReceivingData.OfficialDesignationSetting_Id === '' || ReceivingData.OfficialDesignationSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Official Designation details can\'t be empty'});
   } else if(!ReceivingData.OfficialDesignation || ReceivingData.OfficialDesignation === '' || ReceivingData.OfficialDesignation === null) {
      res.status(400).send({Status: false, Message: 'Official Designation can\'t be empty'});
   } else if(!ReceivingData.IfDivision || ReceivingData.IfDivision === '' || ReceivingData.IfDivision === null) {
      res.status(400).send({Status: false, Message: 'Division can\'t be empty'});
   } else if(!ReceivingData.CanCreate || ReceivingData.CanCreate === '' || ReceivingData.CanCreate === null) {
      res.status(400).send({Status: false, Message: 'Permission details can\'t be empty'});
   } else if(!ReceivingData.CanView || ReceivingData.CanView === '' || ReceivingData.CanView === null) {
      res.status(400).send({Status: false, Message: 'Permission details can\'t be empty'});
   } else if(!ReceivingData.CanEdit || ReceivingData.CanEdit === '' || ReceivingData.CanEdit === null) {
      res.status(400).send({Status: false, Message: 'Permission details can\'t be empty'});
   } else if(!ReceivingData.CanApprove || ReceivingData.CanApprove === '' || ReceivingData.CanApprove === null) {
      res.status(400).send({Status: false, Message: 'Permission details can\'t be empty'});
   } else if(!ReceivingData.CanDelete || ReceivingData.CanDelete === '' || ReceivingData.CanDelete === null) {
      res.status(400).send({Status: false, Message: 'Permission details can\'t be empty'});
   } else if(!ReceivingData.StateLevel || ReceivingData.StateLevel === '' || ReceivingData.StateLevel === null) {
      res.status(400).send({Status: false, Message: 'Level details can\'t be empty'});
   } else if(!ReceivingData.DistrictLevel || ReceivingData.DistrictLevel === '' || ReceivingData.DistrictLevel === null) {
      res.status(400).send({Status: false, Message: 'Level details can\'t be empty'});
   } else if(!ReceivingData.ZoneLevel || ReceivingData.ZoneLevel === '' || ReceivingData.ZoneLevel === null) {
      res.status(400).send({Status: false, Message: 'Level details can\'t be empty'});
   } else if(!ReceivingData.BranchLevel || ReceivingData.BranchLevel === '' || ReceivingData.BranchLevel === null) {
      res.status(400).send({Status: false, Message: 'Level details can\'t be empty'});
   } else {
      SettingsModel.OfficialDesignationSettingSchema
      .updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.OfficialDesignationSetting_Id)}, 
      {$set: {
         OfficialDesignation : ReceivingData.OfficialDesignation,
         IfDivision: ReceivingData.IfDivision,
         CanCreate: ReceivingData.CanCreate,
         CanView: ReceivingData.CanView,
         CanEdit: ReceivingData.CanEdit,
         CanApprove: ReceivingData.CanApprove,
         CanDelete: ReceivingData.CanDelete,
         StateLevel: ReceivingData.StateLevel,
         DistrictLevel: ReceivingData.DistrictLevel,
         ZoneLevel: ReceivingData.ZoneLevel,
         BranchLevel: ReceivingData.BranchLevel,
         Message: ReceivingData.Message,
         UpdatedBy: ReceivingData.User_Id
      }})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in update Official Designation'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully updated Official Designation'});
         }
      });
   }
}

// Delete official designation Setting
exports.OfficialDesignationSetting_Delete = (req, res) => {
   var ReceivingData = req.body.Info;
   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
      res.status(400).send({Status: false, Message: 'User details can\'t be empty'});
   } else if(!ReceivingData.OfficialDesignationSetting_Id || ReceivingData.OfficialDesignationSetting_Id === '' || ReceivingData.OfficialDesignationSetting_Id === null) {
      res.status(400).send({Status: false, Message: 'Official Designation details can\'t be empty'});
   } else {
      SettingsModel.OfficialDesignationSettingSchema
      .updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.OfficialDesignationSetting_Id)}, {$set: {IfDeleted: true, UpdatedBy: ReceivingData.User_Id}})
      .exec((err, result) => {
         if(err) {
            res.status(417).send({Status: false, Message: 'Error in deleting Official Designation'});
         } else {
            res.status(200).send({Status: true, Message: 'Successfully deleted Official Designation'});
         }
      });
   }
}