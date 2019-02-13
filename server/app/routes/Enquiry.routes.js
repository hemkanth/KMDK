module.exports = (app) => {
    var EnquiryController = require('../controller/Enquiry.controller.js');
    // App 
    app.post('/API/Events/AppEnquiryCreate', EnquiryController.AppEnquiry_Create);
    app.post('/API/Events/AppEnquiryList', EnquiryController.AppEnquiry_List);
    app.post('/API/Events/AppEnquiryView', EnquiryController.AppEnquiry_View);
    app.post('/API/Events/AppEnquiryEdit', EnquiryController.AppEnquiry_Edit);
    app.post('/API/Events/AppEnquiryDelete', EnquiryController.AppEnquiry_Delete);
}