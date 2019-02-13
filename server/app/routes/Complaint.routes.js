module.exports = (app) => {
    var ComplaintController = require('../controller/Complaint.controller.js');
    // App 
    app.post('/API/Complaint/AppComplaintCreate', ComplaintController.AppComplaint_Create);
    app.post('/API/Complaint/AppComplaintList', ComplaintController.AppComplaint_List);
    app.post('/API/Complaint/AppComplaintView', ComplaintController.AppComplaint_View);
    app.post('/API/Complaint/AppComplaintEdit', ComplaintController.AppComplaint_Edit);
    app.post('/API/Complaint/AppComplaintDelete', ComplaintController.AppComplaint_Delete);

}