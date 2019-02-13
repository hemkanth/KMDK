var mongoose = require('mongoose');
var multer = require('multer');
var AdvertisementModel = require('../../web/models/Advertisement.model.js');
// ******************************** Multer **********************************
// Image
var AdvertisementStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './Uploads/Advertisement');
    },
    filename: (req, res, cb) => {
        cb(null, 'Advertisement_' + Date.now() + '.png');
    }
});

var AdvertisementUpload = multer({
    storage: AdvertisementStorage,
    fileFilter: (req, file, cb) => {
        let fileSplit = file.originalname.split(".");
        let extension = (fileSplit[fileSplit.length - 1]).toLowerCase();
        if(extension !== 'png' && extension !== 'jpg' && extension !== 'gif' && extension !== 'jpeg') {
            return callback("some files are unsupported format");
        }
        cb(null, true);
    }
}).single('AdvertisementImage');

// ************************************* Advertisement *****************************************

// Create
exports.AppAdvertisement_Create = (req, res) => {
    AdvertisementUpload(req, res, function(UploadErr){
        if(UploadErr instanceof multer.MulterError) {
            console.log('Multer Err , ' + UploadErr);
        } else if(UploadErr) {
            console.log('Unknown Err , ' + UploadErr);
        } else {
            var ReceivingData = req.body;
            if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
                res.status(400).send({Status: false, Message: 'User Details can\'t be empty' });
            } else if(!ReceivingData.AdvertisementType || ReceivingData.AdvertisementType === '' || ReceivingData.AdvertisementType === null) {
                res.status(400).send({Status: false, Message: 'Advertisement Type Details can\'t be empty' });
            } else if(!ReceivingData.Advertisement || ReceivingData.Advertisement === '' || ReceivingData.Advertisement === null) {
                res.status(400).send({Status: false, Message: 'Advertisement Details can\'t be empty' });
            } else if(!ReceivingData.Message || ReceivingData.Message === '' || ReceivingData.Message === null) {
                res.status(400).send({Status: false, Message: 'Message Details can\'t be empty' });
            } else if(!ReceivingData.Place || ReceivingData.Place === '' || ReceivingData.Place === null) {
                res.status(400).send({Status: false, Message: 'Place Details can\'t be empty' });
            } else if(!ReceivingData.Latitude || ReceivingData.Latitude === '' || ReceivingData.Latitude === null) {
                res.status(400).send({Status: false, Message: 'Latitude Details can\'t be empty' });
            } else if(!ReceivingData.Longitude || ReceivingData.Longitude === '' || ReceivingData.Longitude === null) {
                res.status(400).send({Status: false, Message: 'Longitude Details can\'t be empty' });
            } else {
                var tempAdvertisementImage = {};
                if(req.file !== null && req.file !== undefined && req.file !== '') {
                    tempAdvertisementImage = { filename: req.file.filename, mimetype: req.file.mimetype, size: req.file.size};
                }
                var Create_Advertisement = new AdvertisementModel.AdvertisementSchema({
                    AdvertisementType : mongoose.Types.ObjectId(ReceivingData.AdvertisementType),
                    Advertisement : ReceivingData.Advertisement,
                    Message : ReceivingData.Message,
                    AdvertisementImage : tempAdvertisementImage,
                    Place : ReceivingData.Place,
                    Latitude : ReceivingData.Latitude,
                    Longitude : ReceivingData.Longitude,
                    CreatedBy : mongoose.Types.ObjectId(ReceivingData.User_Id), 
                    UpdatedBy : mongoose.Types.ObjectId(ReceivingData.User_Id),
                    IfDeleted : false,
                    CreatedAt : new Date(),
                    UpdatedAt : new Date() 
                });
                Create_Advertisement.save((err, result) => {
                    if(err) {
                        res.status(417).send({Status: false, Message: 'Error in Creating Advertisement'});
                    } else {
                        res.status(200).send({Status: true, Message: 'Successfully Advertisement created'});
                    }
                });
            }
        }
    });
}

// List
exports.AppAdvertisement_List = (req, res) => {
    var ReceivingData = req.body;
    AdvertisementModel.AdvertisementSchema.find({IfDeleted: false}, {}, {$sort: {UpdatedAt: -1}})
    .exec((err, result) => {
        if(err) {
            res.status(417).send({Status: false, Message: 'Error in finding Advertisement'});
        } else {
            res.status(200).send({Status: true, Response: result});
        }
    });
}

// View
exports.AppAdvertisement_View = (req, res) => {
    var ReceivingData = req.body;
    if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
        res.status(400).send({Status: false, Message: 'User Details can\'t be empty' });
    } else if(!ReceivingData.Advertisement_Id|| ReceivingData.Advertisement_Id === '' || ReceivingData.Advertisement_Id === null) {
        res.status(400).send({Status: false, Message: 'Advertisement Details can\'t be empty' });
    } else {
        AdvertisementModel.AdvertisementSchema
        .findOne({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.Advertisement_Id)}, {}, {})
        .exec((err, result) => {
            if(err) {
                res.status(417).send({Status: false, Message: 'Error in finding Advertisement'});
            } else {
                res.status(200).send({Status: true, Response: result});
            }
        });
    }
}

// Edit
exports.AppAdvertisement_Edit = (req, res) => {
    AdvertisementUpload(req, res, function(UploadErr){
        if(UploadErr instanceof multer.MulterError) {
            console.log('Multer Err , ' + UploadErr);
        } else if(UploadErr) {
            console.log('Unknown Err , ' + UploadErr);
        } else {
            var ReceivingData = req.body;
            if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
                res.status(400).send({Status: false, Message: 'User Details can\'t be empty' });
            } else if(!ReceivingData.Advertisement_Id|| ReceivingData.Advertisement_Id === '' || ReceivingData.Advertisement_Id === null) {
                res.status(400).send({Status: false, Message: 'Advertisement Details can\'t be empty' });
            } else if(!ReceivingData.AdvertisementType || ReceivingData.AdvertisementType === '' || ReceivingData.AdvertisementType === null) {
                res.status(400).send({Status: false, Message: 'Advertisement Type Details can\'t be empty' });
            } else if(!ReceivingData.Advertisement || ReceivingData.Advertisement === '' || ReceivingData.Advertisement === null) {
                res.status(400).send({Status: false, Message: 'Advertisement Details can\'t be empty' });
            } else if(!ReceivingData.Message || ReceivingData.Message === '' || ReceivingData.Message === null) {
                res.status(400).send({Status: false, Message: 'Message Details can\'t be empty' });
            } else if(!ReceivingData.Place || ReceivingData.Place === '' || ReceivingData.Place === null) {
                res.status(400).send({Status: false, Message: 'Place Details can\'t be empty' });
            } else if(!ReceivingData.Latitude || ReceivingData.Latitude === '' || ReceivingData.Latitude === null) {
                res.status(400).send({Status: false, Message: 'Latitude Details can\'t be empty' });
            } else if(!ReceivingData.Longitude || ReceivingData.Longitude === '' || ReceivingData.Longitude === null) {
                res.status(400).send({Status: false, Message: 'Longitude Details can\'t be empty' });
            } else {
                var tempAdvertisementImage = {};
                if(req.file !== null && req.file !== undefined && req.file !== '') {
                    tempAdvertisementImage = { filename: req.file.filename, mimetype: req.file.mimetype, size: req.file.size};
                }
                AdvertisementModel.AdvertisementSchema
                .updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.Advertisement_Id)}, 
                {$set: {
                    AdvertisementType : mongoose.Types.ObjectId(ReceivingData.AdvertisementType),
                    Advertisement : ReceivingData.Advertisement,
                    Message : ReceivingData.Message,
                    AdvertisementImage : tempAdvertisementImage,
                    Place : ReceivingData.Place,
                    Latitude : ReceivingData.Latitude,
                    Longitude : ReceivingData.Longitude,
                    UpdatedBy : mongoose.Types.ObjectId(ReceivingData.User_Id),
                    IfDeleted : false,
                    UpdatedAt : new Date() 
                }}, {})
                .exec((err, result) => {
                    if(err) {
                        res.status(417).send({Status: false, Message: 'Error in Updating Advertisement'});
                    } else {
                        res.status(200).send({Status: true, Message: 'Successfully in Advertisement updated'});
                    }
                });
            }
        }
    });
}

// Delete
exports.AppAdvertisement_Delete = (req, res) => {
    var ReceivingData = req.body;
    if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
        res.status(400).send({Status: false, Message: 'User Details can\'t be empty' });
    } else if(!ReceivingData.Advertisement_Id|| ReceivingData.Advertisement_Id === '' || ReceivingData.Advertisement_Id === null) {
        res.status(400).send({Status: false, Message: 'Advertisement Details can\'t be empty' });
    } else {
        AdvertisementModel.AdvertisementSchema
        .updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.Advertisement_Id)},
        {$set: {IfDeleted: true, UpdatedBy: mongoose.Types.ObjectId(ReceivingData.User_Id)}}, {})
        .exec((err, result) => {
            if(err) {
                res.status(417).send({Status: false, Message: 'Error in Deleting Advertisement'});
            } else {
                res.status(200).send({Status: true, Message: 'Successfully Advertisement deleted'});
            }
        });
    }
}