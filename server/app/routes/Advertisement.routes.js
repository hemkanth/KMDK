module.exports = (app) => {
    var AdvertisementController = require('../controller/Advertisement.controller.js');
    // App 
    app.post('/API/Complaint/AppAdvertisementCreate', AdvertisementController.AppAdvertisement_Create);
    app.post('/API/Complaint/AppAdvertisementList', AdvertisementController.AppAdvertisement_List);
    app.post('/API/Complaint/AppAdvertisementView', AdvertisementController.AppAdvertisement_View);
    app.post('/API/Complaint/AppAdvertisementEdit', AdvertisementController.AppAdvertisement_Edit);
    app.post('/API/Complaint/AppAdvertisementDelete', AdvertisementController.AppAdvertisement_Delete);

}