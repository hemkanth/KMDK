module.exports = (app) => {
    var AdvertisementController = require('../controller/Advertisement.controller.js');
    // App 
    app.post('/API/Advertisement/AppAdvertisementCreate', AdvertisementController.AppAdvertisement_Create);
    app.post('/API/Advertisement/AppAdvertisementList', AdvertisementController.AppAdvertisement_List);
    app.post('/API/Advertisement/AppAdvertisementView', AdvertisementController.AppAdvertisement_View);
    app.post('/API/Advertisement/AppAdvertisementEdit', AdvertisementController.AppAdvertisement_Edit);
    app.post('/API/Advertisement/AppAdvertisementDelete', AdvertisementController.AppAdvertisement_Delete);

}