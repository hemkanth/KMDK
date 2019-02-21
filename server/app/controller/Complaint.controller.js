var mongoose = require('mongoose');
var multer = require('multer');
var ComplaintModel = require('../../web/models/Complaints.model.js');
var fileType, fileFormat, fileName;
// ******************************** Multer **********************************
// Image
var ComplaintStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './Uploads/Complaint/' + fileType);
    },
    filename: (req, res, cb) => {
        cb(null, fileName + Date.now() + fileFormat);
    }
});

var ComplaintUpload = multer({
    storage: ComplaintStorage,
    fileFilter: (req, file, cb) => {
        let fileSplit = file.originalname.split(".");
        let extension = (fileSplit[fileSplit.length - 1]).toLowerCase();
        if (extension === 'png' || extension === 'jpg' || extension === 'gif' || extension === 'jpeg' || extension === 'mp4' || extension === 'mp3' || extension === 'wav') {
            if (extension === 'mp4') {
                fileType = 'Video';
                fileFormat = '.mp4';
                fileName = 'ComplaintVideo_'
            } else if (extension === 'mp3' || extension === 'wav') {
                fileType = 'Audio';
                fileFormat = '.mp3';
                fileName = 'ComplaintAudio_'
            } else {
                fileType = 'Image';
                fileFormat = '.png';
                fileName = 'ComplaintImage_'
            }
        }
        if(extension !== 'png' && extension !== 'jpg' && extension !== 'gif' && extension !== 'jpeg' && extension !== 'mp4' && extension !== 'mp3' && extension !== 'wav') {
            return callback("some files are unsupported format");
        }
        cb(null, true);
    }
}).fields([
    {name: 'ComplaintImage', maxCount: 1},
    {name: 'ComplaintVideo', maxCount: 1},
    {name: 'ComplaintAudio', maxCount: 1},
]);

// ******************************** Events ***********************************
// Create
exports.AppComplaint_Create = (req, res) => {
    ComplaintUpload(req, res, function(UploadErr){
        if(UploadErr instanceof multer.MulterError) {
            console.log('Multer Err , ' + UploadErr);
        } else if(UploadErr) {
            console.log('Unknown Err , ' + UploadErr);
        } else {
            var ReceivingData = req.body;
            if(!ReceivingData.Name || ReceivingData.Name === '' || ReceivingData.Name === null) {
                res.status(400).send({Status: false, Message: 'Name can\'t be empty' });
            } else if(!ReceivingData.MobileNumber || ReceivingData.MobileNumber === '' || ReceivingData.MobileNumber === null) {
                res.status(400).send({Status: false, Message: 'Mobile Number can\'t be empty' });
            } else if(!ReceivingData.ComplaintType || ReceivingData.ComplaintType === '' || ReceivingData.ComplaintType === null) {
                res.status(400).send({Status: false, Message: 'ComplaintType can\'t be empty' });
            } else if(!ReceivingData.Complaint || ReceivingData.Complaint === '' || ReceivingData.Complaint === null) {
                res.status(400).send({Status: false, Message: 'Complaint can\'t be empty' });
            } else if(!ReceivingData.Message || ReceivingData.Message === '' || ReceivingData.Message === null) {
                res.status(400).send({Status: false, Message: 'Message can\'t be empty' });
            } else if(!ReceivingData.Place || ReceivingData.Place === '' || ReceivingData.Place === null) {
                res.status(400).send({Status: false, Message: 'Place Details can\'t be empty' });
            } else {
                var tempComplaintImage = {};
                var tempComplaintVideo = {};
                var tempComplaintAudio = {};
                if(req.files.ComplaintImage !== null && req.files.ComplaintImage !== undefined && req.files.ComplaintImage !== '') {
                    tempComplaintImage = { filename: req.files.ComplaintImage[0].filename, mimetype: req.files.ComplaintImage[0].mimetype, size: req.files.ComplaintImage[0].size};
                }
                if(req.files.ComplaintVideo !== null && req.files.ComplaintVideo !== undefined && req.files.ComplaintVideo !== '') {
                    tempComplaintVideo = { filename: req.files.ComplaintVideo[0].filename, mimetype: req.files.ComplaintVideo[0].mimetype, size: req.files.ComplaintVideo[0].size};
                }
                if(req.files.ComplaintAudio !== null && req.files.ComplaintAudio !== undefined && req.files.ComplaintAudio !== '') {
                    tempComplaintAudio = { filename: req.files.ComplaintAudio[0].filename, mimetype: req.files.ComplaintAudio[0].mimetype, size: req.files.ComplaintAudio[0].size};
                }
                var tempUserId = (!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) ? null : mongoose.Types.ObjectId(ReceivingData.User_Id);
                var Create_Complaint = new ComplaintModel.ComplaintSchema({
                    Name :  ReceivingData.Name,
                    MobileNumber: ReceivingData.MobileNumber,
                    ComplaintType : mongoose.Types.ObjectId(ReceivingData.ComplaintType),
                    Complaint : ReceivingData.Complaint,
                    Message : ReceivingData.Message,
                    ComplaintImage: tempComplaintImage,
                    ComplaintVideo : tempComplaintVideo,
                    ComplaintAudio : tempComplaintAudio,
                    Place : ReceivingData.Place,
                    CreatedAt: new Date(),
                    UpdatedAt: new Date(),
                    IfDeleted: false,
                    CreatedBy: tempUserId,
                    UpdatedBy : tempUserId 
                });
                Create_Complaint.save((err, result) => {
                    if(err) {
                        res.status(417).send({Status: false, Message: 'Error in Creating Event'});
                    } else {
                        res.status(200).send({Status: true, Message: 'Successfully Event created'});
                    }
                });
            }
        }
    });
}

// Complaint List
exports.AppComplaint_List = (req, res) => {
    var ReceivingData = req.body;
    ComplaintModel.ComplaintSchema.find({IfDeleted: false}, {}, {$sort: {UpdatedAt: -1}})
    .populate({ path: 'ComplaintType', select: ['ComplaintCategory'] })
    .populate({ path: 'CreatedBy', select: ['Name'] })
    .populate({ path: 'UpdatedBy', select: ['Name'] })
    .exec((err, result) => {
        if(err) {
            res.status(417).send({Status: false, Message: 'Error in finding Complaint'});
        } else {
            res.status(200).send({Status: true, Response: result});
        }
    });
}

// Complaint view
exports.AppComplaint_View = (req, res) => {
    var ReceivingData = req.body;
    if(!ReceivingData.Complaint_Id || ReceivingData.Complaint_Id === '' || ReceivingData.Complaint_Id === null) {
        res.status(400).send({Status: false, Message: 'Complaint Details can\'t be empty'});
    } else {
        ComplaintModel.ComplaintSchema.findOne({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.Complaint_Id)}, {}, {})
        .populate({ path: 'CreatedBy', select: ['Name'] })
        .populate({ path: 'UpdatedBy', select: ['Name'] })
        .exec((err, result) => {
            if(err) {
                res.status(417).send({Status: false, Message: 'Error in finding Complaint'});
            } else {
                res.status(200).send({Status: true, Response: result});
            }
        });
    }
}

// Complaint Edit
exports.AppComplaint_Edit = (req, res) => {
    ComplaintUpload(req, res, function(UploadErr){
        if(UploadErr instanceof multer.MulterError) {
            console.log('Multer Err , ' + UploadErr);
        } else if(UploadErr) {
            console.log('Unknown Err , ' + UploadErr);
        } else {
            var ReceivingData = req.body;
            if(!ReceivingData.Complaint_Id || ReceivingData.Complaint_Id === '' || ReceivingData.Complaint_Id === null) {
                res.status(400).send({Status: false, Message: 'Complaint Details can\'t be empty' });
            } else if(!ReceivingData.Name || ReceivingData.Name === '' || ReceivingData.Name === null) {
                res.status(400).send({Status: false, Message: 'Name can\'t be empty' });
            } else if(!ReceivingData.MobileNumber || ReceivingData.MobileNumber === '' || ReceivingData.MobileNumber === null) {
                res.status(400).send({Status: false, Message: 'Mobile Number can\'t be empty' });
            } else if(!ReceivingData.ComplaintType || ReceivingData.ComplaintType === '' || ReceivingData.ComplaintType === null) {
                res.status(400).send({Status: false, Message: 'ComplaintType can\'t be empty' });
            } else if(!ReceivingData.Complaint || ReceivingData.Complaint === '' || ReceivingData.Complaint === null) {
                res.status(400).send({Status: false, Message: 'Complaint can\'t be empty' });
            } else if(!ReceivingData.Message || ReceivingData.Message === '' || ReceivingData.Message === null) {
                res.status(400).send({Status: false, Message: 'Message can\'t be empty' });
            } else if(!ReceivingData.Place || ReceivingData.Place === '' || ReceivingData.Place === null) {
                res.status(400).send({Status: false, Message: 'Place Details can\'t be empty' });
            } else {
                var tempComplaintImage = {};
                var tempComplaintVideo = {};
                var tempComplaintAudio = {};
                if(req.files.ComplaintImage !== null && req.files.ComplaintImage !== undefined && req.files.ComplaintImage !== '') {
                    tempComplaintImage = { filename: req.files.ComplaintImage[0].filename, mimetype: req.files.ComplaintImage[0].mimetype, size: req.files.ComplaintImage[0].size};
                }
                if(req.files.ComplaintVideo !== null && req.files.ComplaintVideo !== undefined && req.files.ComplaintVideo !== '') {
                    tempComplaintVideo = { filename: req.files.ComplaintVideo[0].filename, mimetype: req.files.ComplaintVideo[0].mimetype, size: req.files.ComplaintVideo[0].size};
                }
                if(req.files.ComplaintAudio !== null && req.files.ComplaintAudio !== undefined && req.files.ComplaintAudio !== '') {
                    tempComplaintAudio = { filename: req.files.ComplaintAudio[0].filename, mimetype: req.files.ComplaintAudio[0].mimetype, size: req.files.ComplaintAudio[0].size};
                }
                var tempUserId = (!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) ? null : mongoose.Types.ObjectId(ReceivingData.User_Id);
                ComplaintModel.ComplaintSchema.updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.Complaint_Id)}, 
                {$set: {
                    Name :  ReceivingData.Name,
                    MobileNumber: ReceivingData.MobileNumber,
                    ComplaintType : mongoose.Types.ObjectId(ReceivingData.ComplaintType),
                    Complaint : ReceivingData.Complaint,
                    Message : ReceivingData.Message,
                    ComplaintImage: tempComplaintImage,
                    ComplaintVideo : tempComplaintVideo,
                    ComplaintAudio : tempComplaintAudio,
                    Place : ReceivingData.Place,
                    UpdatedAt: new Date(),
                    IfDeleted: false,
                    UpdatedBy : tempUserId 
                }}, {})
                .exec((err, result) => {
                    if(err) {
                        res.status(417).send({Status: false, Message: 'Error in finding Complaint'});
                    } else {
                        res.status(200).send({Status: true, Response: result});
                    }
                });
            }
        }
    });
}

// Complaint delete
exports.AppComplaint_Delete = (req, res) => {
    var ReceivingData = req.body;
    if(!ReceivingData.Complaint_Id || ReceivingData.Complaint_Id === '' || ReceivingData.Complaint_Id === null) {
        res.status(400).send({Status: false, Message: 'Complaint Details can\'t be empty'});
    } else {
        var tempUserId = (!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) ? null : mongoose.Types.ObjectId(ReceivingData.User_Id);
        ComplaintModel.ComplaintSchema.updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.Complaint_Id)}, 
        {$set: {
            IfDeleted: true, 
            UpdatedBy: tempUserId
        }}, {})
        .exec((err, result) => {
            if(err) {
                res.status(417).send({Status: false, Message: 'Error in finding Complaint'});
            } else {
                res.status(200).send({Status: true, Response: result});
            }
        });
    }
}

