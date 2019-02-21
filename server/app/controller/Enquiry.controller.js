var mongoose = require('mongoose');
var multer = require('multer');
var EnquiryModel = require('../../web/models/Enquiry.model.js');

// ************************************* Enquiry ********************************************
// Create
exports.AppEnquiry_Create = (req, res) => {
    var ReceivingData = req.body;

    if(!ReceivingData.Name || ReceivingData.Name === '' || ReceivingData.Name === null) {
        res.status(400).send({Status: false, Message: 'Name can\'t be empty' });
    } else if(!ReceivingData.Place || ReceivingData.Place === '' || ReceivingData.Place === null) {
        res.status(400).send({Status: false, Message: 'Place Details can\'t be empty' });
    } else if(!ReceivingData.Message || ReceivingData.Message === '' || ReceivingData.Message === null) {
        res.status(400).send({Status: false, Message: 'Message Details can\'t be empty' });
    } else {
        var tempUserId = (!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) ? null : mongoose.Types.ObjectId(ReceivingData.User_Id);
        var Create_Enquiry = new EnquiryModel.EnquirySchema({
            Name: ReceivingData.Name,
            Place: ReceivingData.Place,
            Date: new Date(),
            Message: ReceivingData.Message,
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
            IfDeleted: false,
            CreatedBy: tempUserId,
            UpdatedBy : tempUserId 
        });
        Create_Enquiry.save((err, result) => {
            if(err) {
                res.status(417).send({Status: false, Message: 'Error in saving enquiry'});
            } else {
                res.status(200).send({Status: true, Message: 'Successfully Enquiry Created'});
            }
        });
    }
};

// List
exports.AppEnquiry_List = (req, res) => {
    var ReceivingData = req.body;
    EnquiryModel.EnquirySchema.find({IfDeleted: false}, {}, {$sort: {UpdatedAt: -1}})
    .populate({ path: 'CreatedBy', select: ['Name'] })
    .populate({ path: 'UpdatedBy', select: ['Name'] })
    .exec((err, result) => {
        if(err) {
            res.status(417).send({Status: false, Message: 'Error in finding enquiry'});
        } else {
            res.status(200).send({Status: true, Response: result});
        }
    });
};

// View
exports.AppEnquiry_View = (req, res) => {
    var ReceivingData = req.body;
    if(!ReceivingData.Enquiry_Id || ReceivingData.Enquiry_Id === '' || ReceivingData.Enquiry_Id === null) {
        res.status(400).send({Status: false, Message: 'Enquiry Details can\'t be empty' });
    } else {
        EnquiryModel.EnquirySchema.findOne({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.Enquiry_Id)}, {}, {})
        .populate({ path: 'CreatedBy', select: ['Name'] })
        .populate({ path: 'UpdatedBy', select: ['Name'] })
        .exec((err, result) => {
            if(err) {
                res.status(417).send({Status: false, Message: 'Error in finding enquiry'});
            } else {
                res.status(200).send({Status: true, Response: result});
            }
        });
    }
};

// Edit
exports.AppEnquiry_Edit = (req, res) => {
    var ReceivingData = req.body;
    if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
        res.status(400).send({Status: false, Message: 'User Details can\'t be empty' });
    } else if(!ReceivingData.Enquiry_Id || ReceivingData.Enquiry_Id === '' || ReceivingData.Enquiry_Id === null) {
        res.status(400).send({Status: false, Message: 'Enquiry Details can\'t be empty' });
    } else if(!ReceivingData.Name || ReceivingData.Name === '' || ReceivingData.Name === null) {
        res.status(400).send({Status: false, Message: 'Name can\'t be empty' });
    } else if(!ReceivingData.Place || ReceivingData.Place === '' || ReceivingData.Place === null) {
        res.status(400).send({Status: false, Message: 'Place Details can\'t be empty' });
    } else if(!ReceivingData.Message || ReceivingData.Message === '' || ReceivingData.Message === null) {
        res.status(400).send({Status: false, Message: 'Message Details can\'t be empty' });
    } else {
        var tempUserId = (!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) ? null : mongoose.Types.ObjectId(ReceivingData.User_Id);
        EnquiryModel.EnquirySchema.updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.Enquiry_Id)},
        {$set: {
            Name: ReceivingData.Name,
            Place: ReceivingData.Place,
            Message: ReceivingData.Message,
            UpdatedAt: new Date(),
            UpdatedBy : tempUserId
        }})
        .exec((err, result) => {
            if(err) {
                res.status(417).send({Status: false, Message: 'Error in updating enquiry'});
            } else {
                res.status(200).send({Status: true, Message: 'Successfully Enquiry Updated'});
            }
        });
    }
};

// Delete
exports.AppEnquiry_Delete = (req, res) => {
    var ReceivingData = req.body;
    if(!ReceivingData.Enquiry_Id || ReceivingData.Enquiry_Id === '' || ReceivingData.Enquiry_Id === null) {
        res.status(400).send({Status: false, Message: 'Enquiry Details can\'t be empty' });
    } else {
        var tempUserId = (!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) ? null : mongoose.Types.ObjectId(ReceivingData.User_Id);
        EnquiryModel.EnquirySchema.updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.Enquiry_Id)},
        {$set: {
            IfDeleted: true,
            UpdatedAt: new Date(),
            UpdatedBy : tempUserId
        }})
        .exec((err, result) => {
            if(err) {
                res.status(417).send({Status: false, Message: 'Error in deleting enquiry'});
            } else {
                res.status(200).send({Status: true, Message: 'Successfully Enquiry deleted'});
            }
        });
    }
};