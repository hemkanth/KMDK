// Export Routes
module.exports = (app) => {
   
   // import required controller
   var SettingsController = require('../controller/Settings.controller.js');

   // App State Settings Routes
   app.post('/API/Settings/AppStateList', SettingsController.AppStateSettings_List);
   app.post('/API/Settings/AppDistrictList', SettingsController.AppDistrictSettings_List);
   app.post('/API/Settings/AppZoneList', SettingsController.AppZoneSettings_List);
   app.post('/API/Settings/AppBranchList', SettingsController.AppBranchSettings_List);  
   app.post('/API/Settings/AppConstitutionList', SettingsController.AppConstitutionSetting_List);
   app.post('/API/Settings/AppGroupList', SettingsController.AppGroupSetting_List);
   app.post('/API/Settings/AppMemberApprovalPeriodList', SettingsController.AppMemberApprovalPeriodSetting_List);
   app.post('/API/Settings/AppComplaintCategoryList', SettingsController.AppComplaintCategorySetting_List);
   app.post('/API/Settings/AppAdvertisementTypeList', SettingsController.AppAdvertisementTypeSetting_List);
   app.post('/API/Settings/AppBoothList', SettingsController.AppBoothSetting_List);
   app.post('/API/Settings/AppOfficialDesignationList', SettingsController.AppOfficialDesignationSetting_List);

}