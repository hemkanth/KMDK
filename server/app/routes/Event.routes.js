module.exports = (app) => {
    var EventController = require('../controller/Event.controller.js');
    // App 
    // app.post('/API/Events/AppEventCreate', EventController.Events_Create);
    app.post('/API/Events/AppEventList', EventController.AppEvents_List);
    app.post('/API/Events/AppEventView', EventController.AppEvents_View);
    // app.post('/API/Events/AppEventEdit', EventController.Events_Edit);
    // app.post('/API/Events/AppEventDelete', EventController.Events_Delete);
}