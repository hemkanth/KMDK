// Export Routes
module.exports = (app) => {
   
   // import required controller
   var SettingsController = require('../controller/Settings.controller.js');

   // State Settings Routes
   app.post('/API/Settings/StateCreate', SettingsController.StateSettings_Create);
   app.post('/API/Settings/StateList', SettingsController.StateSettings_List);
   app.post('/API/Settings/StateView', SettingsController.StateSettings_View);
   app.post('/API/Settings/StateEdit', SettingsController.StateSettings_Edit);
   app.post('/API/Settings/StateDelete', SettingsController.StateSettings_Delete);

   // District Settings Routes
   app.post('/API/Settings/DistrictCreate', SettingsController.DistrictSettings_Create);
   app.post('/API/Settings/DistrictList', SettingsController.DistrictSettings_List);
   app.post('/API/Settings/DistrictView', SettingsController.DistrictSettings_View);
   app.post('/API/Settings/DistrictEdit', SettingsController.DistrictSettings_Edit);
   app.post('/API/Settings/DistrictDelete', SettingsController.DistrictSettings_Delete);

   // District Settings Routes
   app.post('/API/Settings/ZoneCreate', SettingsController.ZoneSettings_Create);
   app.post('/API/Settings/ZoneList', SettingsController.ZoneSettings_List);
   app.post('/API/Settings/ZoneView', SettingsController.ZoneSettings_View);
   app.post('/API/Settings/ZoneEdit', SettingsController.ZoneSettings_Edit);
   app.post('/API/Settings/ZoneDelete', SettingsController.ZoneSettings_Delete);

   // District Settings Routes
   app.post('/API/Settings/BranchCreate', SettingsController.BranchSettings_Create);
   app.post('/API/Settings/BranchList', SettingsController.BranchSettings_List);
   app.post('/API/Settings/BranchView', SettingsController.BranchSettings_View);
   app.post('/API/Settings/BranchEdit', SettingsController.BranchSettings_Edit);
   app.post('/API/Settings/BranchDelete', SettingsController.BranchSettings_Delete);

   // District Settings Routes
   app.post('/API/Settings/ConstitutionCreate', SettingsController.ConstitutionSetting_Create);
   app.post('/API/Settings/ConstitutionList', SettingsController.ConstitutionSetting_List);
   app.post('/API/Settings/ConstitutionView', SettingsController.ConstitutionSetting_View);
   app.post('/API/Settings/ConstitutionEdit', SettingsController.ConstitutionSetting_Edit);
   app.post('/API/Settings/ConstitutionDelete', SettingsController.ConstitutionSetting_Delete);

   // District Settings Routes
   app.post('/API/Settings/MemberApprovalPeriodCreate', SettingsController.MemberApprovalPeriodSetting_Create);
   app.post('/API/Settings/MemberApprovalPeriodList', SettingsController.MemberApprovalPeriodSetting_List);
   app.post('/API/Settings/MemberApprovalPeriodView', SettingsController.MemberApprovalPeriodSetting_View);
   app.post('/API/Settings/MemberApprovalPeriodEdit', SettingsController.MemberApprovalPeriodSetting_Edit);
   app.post('/API/Settings/MemberApprovalPeriodDelete', SettingsController.MemberApprovalPeriodSetting_Delete);

   // District Settings Routes
   app.post('/API/Settings/ComplaintCategoryCreate', SettingsController.ComplaintCategorySetting_Create);
   app.post('/API/Settings/ComplaintCategoryList', SettingsController.ComplaintCategorySetting_List);
   app.post('/API/Settings/ComplaintCategoryView', SettingsController.ComplaintCategorySetting_View);
   app.post('/API/Settings/ComplaintCategoryEdit', SettingsController.ComplaintCategorySetting_Edit);
   app.post('/API/Settings/ComplaintCategoryDelete', SettingsController.ComplaintCategorySetting_Delete);

   // District Settings Routes
   app.post('/API/Settings/AdvertisementTypeCreate', SettingsController.AdvertisementTypeSetting_Create);
   app.post('/API/Settings/AdvertisementTypeList', SettingsController.AdvertisementTypeSetting_List);
   app.post('/API/Settings/AdvertisementTypeView', SettingsController.AdvertisementTypeSetting_View);
   app.post('/API/Settings/AdvertisementTypeEdit', SettingsController.AdvertisementTypeSetting_Edit);
   app.post('/API/Settings/AdvertisementTypeDelete', SettingsController.AdvertisementTypeSetting_Delete);

   // District Settings Routes
   app.post('/API/Settings/BoothCreate', SettingsController.BoothSetting_Create);
   app.post('/API/Settings/BoothList', SettingsController.BoothSetting_List);
   app.post('/API/Settings/BoothView', SettingsController.BoothSetting_View);
   app.post('/API/Settings/BoothEdit', SettingsController.BoothSetting_Edit);
   app.post('/API/Settings/BoothDelete', SettingsController.BoothSetting_Delete);

   // District Settings Routes
   app.post('/API/Settings/OfficialDesignationCreate', SettingsController.OfficialDesignationSetting_Create);
   app.post('/API/Settings/OfficialDesignationList', SettingsController.OfficialDesignationSetting_List);
   app.post('/API/Settings/OfficialDesignationView', SettingsController.OfficialDesignationSetting_View);
   app.post('/API/Settings/OfficialDesignationEdit', SettingsController.OfficialDesignationSetting_Edit);
   app.post('/API/Settings/OfficialDesignationDelete', SettingsController.OfficialDesignationSetting_Delete);

   // RelationShipType Settings Routes
   app.post('/API/Settings/RelationShipTypeCreate', SettingsController.RelationShipType_Create);
   app.post('/API/Settings/RelationShipTypeList', SettingsController.RelationShipType_List);
   app.post('/API/Settings/RelationShipTypeView', SettingsController.RelationShipType_View);
   app.post('/API/Settings/RelationShipTypeEdit', SettingsController.RelationShipType_Edit);
   app.post('/API/Settings/RelationShipTypeDelete', SettingsController.RelationShipType_Delete);
}