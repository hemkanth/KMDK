var mongoose = require('mongoose');
var multer = require('multer');
var EnquiryModel = require('../../web/models/Enquiry.model.js');

// ************************************* Enquiry ********************************************
// Create
exports.AppEnquiry_Create = (req, res) => {
    var ReceivingData = req.body;

    if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
        res.status(400).send({Status: false, Message: 'User Details can\'t be empty' });
    } else if(!ReceivingData.Name || ReceivingData.Name === '' || ReceivingData.Name === null) {
        res.status(400).send({Status: false, Message: 'Name can\'t be empty' });
    } else if(!ReceivingData.Place || ReceivingData.Place === '' || ReceivingData.Place === null) {
        res.status(400).send({Status: false, Message: 'Place Details can\'t be empty' });
    } else if(!ReceivingData.Message || ReceivingData.Message === '' || ReceivingData.Message === null) {
        res.status(400).send({Status: false, Message: 'Message Details can\'t be empty' });
    } else if(!ReceivingData.State_Id || ReceivingData.State_Id === '' || ReceivingData.State_Id === null) {
        res.status(400).send({Status: false, Message: 'State Details can\'t be empty' });
    } else if(!ReceivingData.District_Id || ReceivingData.District_Id === '' || ReceivingData.District_Id === null) {
        res.status(400).send({Status: false, Message: 'District Details can\'t be empty' });
    } else if(!ReceivingData.Zone_Id || ReceivingData.Zone_Id === '' || ReceivingData.Zone_Id === null) {
        res.status(400).send({Status: false, Message: 'Zone Details can\'t be empty' });
    } else if(!ReceivingData.Branch_Id || ReceivingData.Branch_Id === '' || ReceivingData.Branch_Id === null) {
        res.status(400).send({Status: false, Message: 'Branch Details can\'t be empty' });
    } else {
        var Create_Enquiry = new EnquiryModel.EnquirySchema({
            Name: ReceivingData.Name,
            Place: ReceivingData.Place,
            Date: new Date(),
            Message: ReceivingData.Message,
            State: mongoose.Types.ObjectId(ReceivingData.State_Id),
            District: mongoose.Types.ObjectId(ReceivingData.District_Id),
            Zone: mongoose.Types.ObjectId(ReceivingData.Zone_Id),
            Branch: mongoose.Types.ObjectId(ReceivingData.Branch_Id),
            CreatedAt: new Date(),
            UpdatedAt: new Date(),
            IfDeleted: false,
            CreatedBy: mongoose.Types.ObjectId(ReceivingData.User_Id),
            UpdatedBy : mongoose.Types.ObjectId(ReceivingData.User_Id) 
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
    EnquiryModel.EnquirySchema.find({IfDeleted: false}, {}, {})
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
    } else if(!ReceivingData.State_Id || ReceivingData.State_Id === '' || ReceivingData.State_Id === null) {
        res.status(400).send({Status: false, Message: 'State Details can\'t be empty' });
    } else if(!ReceivingData.District_Id || ReceivingData.District_Id === '' || ReceivingData.District_Id === null) {
        res.status(400).send({Status: false, Message: 'District Details can\'t be empty' });
    } else if(!ReceivingData.Zone_Id || ReceivingData.Zone_Id === '' || ReceivingData.Zone_Id === null) {
        res.status(400).send({Status: false, Message: 'Zone Details can\'t be empty' });
    } else if(!ReceivingData.Branch_Id || ReceivingData.Branch_Id === '' || ReceivingData.Branch_Id === null) {
        res.status(400).send({Status: false, Message: 'Branch Details can\'t be empty' });
    } else {
        EnquiryModel.EnquirySchema.updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.Enquiry_Id)},
        {$set: {
            Name: ReceivingData.Name,
            Place: ReceivingData.Place,
            Message: ReceivingData.Message,
            State: mongoose.Types.ObjectId(ReceivingData.State_Id),
            District: mongoose.Types.ObjectId(ReceivingData.District_Id),
            Zone: mongoose.Types.ObjectId(ReceivingData.Zone_Id),
            Branch: mongoose.Types.ObjectId(ReceivingData.Branch_Id),
            UpdatedAt: new Date(),
            UpdatedBy : mongoose.Types.ObjectId(ReceivingData.User_Id)
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
    if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
        res.status(400).send({Status: false, Message: 'User Details can\'t be empty' });
    } else if(!ReceivingData.Enquiry_Id || ReceivingData.Enquiry_Id === '' || ReceivingData.Enquiry_Id === null) {
        res.status(400).send({Status: false, Message: 'Enquiry Details can\'t be empty' });
    } else {
        EnquiryModel.EnquirySchema.updateMany({IfDeleted: false, _id: mongoose.Types.ObjectId(ReceivingData.Enquiry_Id)},
        {$set: {
            IfDeleted: true,
            UpdatedAt: new Date(),
            UpdatedBy : mongoose.Types.ObjectId(ReceivingData.User_Id)
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