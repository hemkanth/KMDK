module.exports = (app) => {
    var MembersController = require('../controller/Members.controller.js');
    // App 
    app.post('/API/Members/AppMembersLoginValidate', MembersController.AppMembersLogin_Validate);
    app.post('/API/Members/AppMembersOTPValidate', MembersController.AppMembersOTP_Validate);
    app.post('/API/Members/AppMemberMobileNumberValidate', MembersController.AppMembersMobileNumber_Validate);
    app.post('/API/Members/AppMemberCreate', MembersController.AppMembers_Create);
    app.post('/API/Members/AppMemberList', MembersController.AppMembers_List);
    app.post('/API/Members/AppMemberView', MembersController.AppMembers_View);
    app.post('/API/Members/AppMemberApprove', MembersController.AppMembers_Approve);
    app.post('/API/Members/AppMemberRejected', MembersController.AppMembers_Reject);
}