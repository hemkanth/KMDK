var mongoose = require('mongoose');
var multer = require('multer');
var EventsModel = require('../../web/models/Events.model.js');

// ******************************** Multer **********************************
var EventsImageStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './Uploads/Events');
    },
    filename: (req, res, cb) => {
        cb(null, 'Event_' + Date.now() + '.png');
    }
});
 
var EventsImageUpload = multer({
    storage: EventsImageStorage,
    fileFilter: (req, file, cb) => {
        let fileSplit = file.originalname.split(".");
        let extension = (fileSplit[fileSplit.length - 1]).toLowerCase();
        if(extension !== 'png' && extension !== 'jpg' && extension !== 'gif' && extension !== 'jpeg') {
            return callback("only 'png, gif, jpg and jpeg' image are allowed");
        }
        cb(null, true);
    }
}).single('EventImage');

// ******************************** Events ***********************************
// // Create
// exports.Events_Create = (req, res) => {
//     EventsImageUpload(req, res, function(UploadErr){
//         if(UploadErr instanceof multer.MulterError) {
//             console.log('Multer Err , ' + UploadErr);
//         } else if(UploadErr) {
//             console.log('Unknown Err , ' + UploadErr);
//         } else {
//             var ReceivingData = req.body;
//             if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
//                 res.status(400).send({Status: false, Message: 'User Details can\'t be empty' });
//             } else if(!ReceivingData.EventName || ReceivingData.EventName === '' || ReceivingData.EventName === null) {
//                 res.status(400).send({Status: false, Message: 'Event Name can\'t be empty' });
//             } else if(!ReceivingData.Place || ReceivingData.Place === '' || ReceivingData.Place === null) {
//                 res.status(400).send({Status: false, Message: 'Place Details can\'t be empty' });
//             } else if(!ReceivingData.State_Id || ReceivingData.State_Id === '' || ReceivingData.State_Id === null) {
//                 res.status(400).send({Status: false, Message: 'State Details can\'t be empty' });
//             } else if(!ReceivingData.District_Id || ReceivingData.District_Id === '' || ReceivingData.District_Id === null) {
//                 res.status(400).send({Status: false, Message: 'District Details can\'t be empty' });
//             } else if(!ReceivingData.Zone_Id || ReceivingData.Zone_Id === '' || ReceivingData.Zone_Id === null) {
//                 res.status(400).send({Status: false, Message: 'Zone Details can\'t be empty' });
//             } else if(!ReceivingData.Branch_Id || ReceivingData.Branch_Id === '' || ReceivingData.Branch_Id === null) {
//                 res.status(400).send({Status: false, Message: 'Branch Details can\'t be empty' });
//             } else if(!ReceivingData.Date || ReceivingData.Date === '' || ReceivingData.Date === null) {
//                 res.status(400).send({Status: false, Message: 'Event Date can\'t be empty' });
//             } else if(!ReceivingData.ContactName || ReceivingData.ContactName === '' || ReceivingData.ContactName === null) {
//                 res.status(400).send({Status: false, Message: 'Contact Name can\'t be empty' });
//             } else if(!ReceivingData.ContactNumber || ReceivingData.ContactNumber === '' || ReceivingData.ContactNumber === null) {
//                 res.status(400).send({Status: false, Message: 'Contact Number can\'t be empty' });
//             } else {
//                 var tempEventImage = {};
//                 if(req.file !== null && req.file !== undefined && req.file !== '') {
//                     tempEventImage = { filename: req.file.filename, mimetype: req.file.mimetype, size: req.file.size};
//                 }
//                 var Create_Event = new EventsModel.EventsSchema({
//                     EventName :  ReceivingData.EventName,
//                     EventImage: tempEventImage,
//                     Place : ReceivingData.Place,
//                     State: mongoose.Types.ObjectId(ReceivingData.State_Id),
//                     District: mongoose.Types.ObjectId(ReceivingData.District_Id),
//                     Zone: mongoose.Types.ObjectId(ReceivingData.Zone_Id),
//                     Branch: mongoose.Types.ObjectId(ReceivingData.Branch_Id),
//                     Date: new Date(ReceivingData.Date),
//                     ContactName: ReceivingData.ContactName,
//                     ContactNumber: ReceivingData.ContactNumber,
//                     CreatedAt: new Date(),
//                     UpdatedAt: new Date(),
//                     IfDeleted: false,
//                     CreatedBy: mongoose.Types.ObjectId(ReceivingData.User_Id),
//                     UpdatedBy : mongoose.Types.ObjectId(ReceivingData.User_Id) 
//                 });
//                 Create_Event.save((err, result) => {
//                     if(err) {
//                         res.status(417).send({Status: false, Message: 'Error in Creating Event'});
//                     } else {
//                         res.status(200).send({Status: true, Message: 'Successfully Event created'});
//                     }
//                 });
//             }
//         }
//     });
// }

// list
exports.AppEvents_List = (req, res) => {
    var ReceivingData = req.body;
    EventsModel.EventsSchema
    .find({IfDeleted: false}, {}, {sort: {UpdatedAt: -1}})
    .populate({ path: 'State', select: ['StateName'] })
    .populate({ path: 'District', select: ['DistrictName'] })
    .populate({ path: 'Zone', select: ['ZoneName'] })
    .populate({ path: 'Branch', select: ['BranchName'] })
    .populate({ path: 'CreatedBy', select: ['Name'] })
    .populate({ path: 'UpdatedBy', select: ['Name'] })
    .exec((err, result) => {
        if(err) {
           res.status(417).send({Status: false, Message: 'Error in finding Events'});
        } else {
           res.status(200).send({Status: true, Response: result});
        }
    });
}

// View
exports.AppEvents_View = (req, res) => {
    if(!ReceivingData.Event_Id || ReceivingData.Event_Id === '' || ReceivingData.Event_Id === null) {
        res.status(400).send({Status: false, Message: 'Event Details can\'t be empty' });
    } else {
        EventsModel.EventsSchema
        .findOne({_id: mongoose.Types.ObjectId(ReceivingData.Event_Id), IfDeleted: true}, {})
        .populate({ path: 'State', select: ['StateName'] })
        .populate({ path: 'District', select: ['DistrictName'] })
        .populate({ path: 'Zone', select: ['ZoneName'] })
        .populate({ path: 'Branch', select: ['BranchName'] })
        .populate({ path: 'CreatedBy', select: ['Name'] })
        .populate({ path: 'UpdatedBy', select: ['Name'] })
        .exec((err, result) => {
            if(err) {
                res.status(417).send({Status: false, Message: 'Error in finding Event'});
            } else {
                res.status(200).send({Status: true, Response: result});
            }
        });
    }
}

// // Edit
// exports.Events_Edit = (req, res) => {
//     EventsImageUpload(req, res, function(UploadErr){
//         if(UploadErr instanceof multer.MulterError) {
//             console.log('Multer Err , ' + UploadErr);
//         } else if(UploadErr) {
//             console.log('Unknown Err , ' + UploadErr);
//         } else {
//             var ReceivingData = req.body;
//             if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
//                 res.status(400).send({Status: false, Message: 'User Details can\'t be empty' });
//             } else if(!ReceivingData.Event_Id || ReceivingData.Event_Id === '' || ReceivingData.Event_Id === null) {
//                 res.status(400).send({Status: false, Message: 'Event Details can\'t be empty' });
//             } else if(!ReceivingData.EventName || ReceivingData.EventName === '' || ReceivingData.EventName === null) {
//                 res.status(400).send({Status: false, Message: 'Event Name can\'t be empty' });
//             } else if(!ReceivingData.Place || ReceivingData.Place === '' || ReceivingData.Place === null) {
//                 res.status(400).send({Status: false, Message: 'Place Details can\'t be empty' });
//             } else if(!ReceivingData.State_Id || ReceivingData.State_Id === '' || ReceivingData.State_Id === null) {
//                 res.status(400).send({Status: false, Message: 'State Details can\'t be empty' });
//             } else if(!ReceivingData.District_Id || ReceivingData.District_Id === '' || ReceivingData.District_Id === null) {
//                 res.status(400).send({Status: false, Message: 'District Details can\'t be empty' });
//             } else if(!ReceivingData.Zone_Id || ReceivingData.Zone_Id === '' || ReceivingData.Zone_Id === null) {
//                 res.status(400).send({Status: false, Message: 'Zone Details can\'t be empty' });
//             } else if(!ReceivingData.Branch_Id || ReceivingData.Branch_Id === '' || ReceivingData.Branch_Id === null) {
//                 res.status(400).send({Status: false, Message: 'Branch Details can\'t be empty' });
//             } else if(!ReceivingData.Date || ReceivingData.Date === '' || ReceivingData.Date === null) {
//                 res.status(400).send({Status: false, Message: 'Event Date can\'t be empty' });
//             } else if(!ReceivingData.ContactName || ReceivingData.ContactName === '' || ReceivingData.ContactName === null) {
//                 res.status(400).send({Status: false, Message: 'Contact Name can\'t be empty' });
//             } else if(!ReceivingData.ContactNumber || ReceivingData.ContactNumber === '' || ReceivingData.ContactNumber === null) {
//                 res.status(400).send({Status: false, Message: 'Contact Number can\'t be empty' });
//             } else {
//                 var tempEventImage = {};
//                 if(req.file !== null && req.file !== undefined && req.file !== '') {
//                     tempEventImage = { filename: req.file.filename, mimetype: req.file.mimetype, size: req.file.size};
//                 }
//                 EventsModel.EventsSchema
//                 .updateMany({_id: mongoose.Types.ObjectId(ReceivingData.Event_Id), IfDeleted: true}, 
//                 {$set: {
//                     EventName :  ReceivingData.EventName,
//                     EventImage: tempEventImage,
//                     Place : ReceivingData.Place,
//                     State: mongoose.Types.ObjectId(ReceivingData.State_Id),
//                     District: mongoose.Types.ObjectId(ReceivingData.District_Id),
//                     Zone: mongoose.Types.ObjectId(ReceivingData.Zone_Id),
//                     Branch: mongoose.Types.ObjectId(ReceivingData.Branch_Id),
//                     Date: new Date(ReceivingData.Date),
//                     ContactName: ReceivingData.ContactName,
//                     ContactNumber: ReceivingData.ContactNumber,
//                     UpdatedAt: new Date(),
//                     UpdatedBy : mongoose.Types.ObjectId(ReceivingData.User_Id) 
//                 }})
//                 .exec((err, result) => {
//                     if(err) {
//                        res.status(417).send({Status: false, Message: 'Error in updating Events'});
//                     } else {
//                        res.status(200).send({Status: true, Message: 'Success in Events Updated'});
//                     }
//                 });
//             }
//         }
//     });
// }

// // Delete
// exports.Events_Delete = (req, res) => {
//     if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
//         res.status(400).send({Status: false, Message: 'User Details can\'t be empty' });
//     } else if(!ReceivingData.Event_Id || ReceivingData.Event_Id === '' || ReceivingData.Event_Id === null) {
//         res.status(400).send({Status: false, Message: 'Event Details can\'t be empty' });
//     } else {
//         EventsModel.EventsSchema
//         .updateMany({_id: mongoose.Types.ObjectId(ReceivingData.Event_Id), IfDeleted: true}, {$set: {IfDeleted: true, UpdatedBy: mongoose.Types.ObjectId(ReceivingData.User_Id)}})
//         .exec((err, result) => {
//             if(err) {
//                 res.status(417).send({Status: false, Message: 'Error in finding Event'});
//             } else {
//                 res.status(200).send({Status: true, Message: 'Successfully Event deleted'});
//             }
//         });
//     }
// }