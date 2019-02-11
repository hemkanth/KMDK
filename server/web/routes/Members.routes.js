module.exports = (app) => {
    var MembersController = require('../controller/Members.controller.js');

    app.post('/API/Members/MemberMobileNumberValidate', MembersController.MembersMobileNumber_Validate);
    app.post('/API/Members/MemberCreate', MembersController.Members_Create);
    app.post('/API/Members/MemberList', MembersController.Members_List);
}