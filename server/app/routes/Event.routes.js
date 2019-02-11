module.exports = (app) => {
    var EventController = require('../controller/Event.controller.js');
    // App 
    app.post('/API/Events/AppEvent_Create', EventController.Events_Create);
    app.post('/API/Events/AppEvent_List', EventController.Events_List);
    app.post('/API/Events/AppEvent_View', EventController.Events_View);
    app.post('/API/Events/AppEvent_Edit', EventController.Events_Edit);
    app.post('/API/Events/AppEvent_Delete', EventController.Events_Delete);
}