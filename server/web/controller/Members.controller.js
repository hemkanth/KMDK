var mongoose = require('mongoose');
var MembersModel = require('../models/Members.model.js');

// **************************************** Members *******************************************
// Mobile Number Validate
exports.MembersMobileNumber_Validate = (req, res) => {
    var ReceivingData = req.body.Info;
    if(!ReceivingData.MobileNumber || ReceivingData.MobileNumber === '' || ReceivingData.MobileNumber === null) {
        res.status(400).send({Status: false, Message: 'Mobile Number can\'t be empty' });
    } else {
        MembersModel.MembersSchema.findOne({IfDeleted: false, ActiveStatus: true, MobileNumber: { $regex : new RegExp("^" + ReceivingData.MobileNumber + "$", "i") }},{})
        .exec((err, result) => {
            if(err) {
                res.status(417).send({Status: false, Message: 'Error in mobile number validation' });
            } else {
                if (result === null) {
                    res.status(200).send({Status: true, CanSave: true});
                } else {
                    res.status(200).send({Status: true, CanSave: false});
                }
            }
        });
    }
}
// Create
exports.Members_Create = (req, res) => {
    var ReceivingData = req.body.Info;

    if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
        res.status(400).send({Status: false, Message: 'User details can\'t be empty' });
    } else if(!ReceivingData.Name || ReceivingData.Name === '' || ReceivingData.Name === null) {
        res.status(400).send({Status: false, Message: 'Name details can\'t be empty' });
    } else if(!ReceivingData.Education || ReceivingData.Education === '' || ReceivingData.Education === null) {
        res.status(400).send({Status: false, Message: 'Education details can\'t be empty' });
    } else if(!ReceivingData.Address || ReceivingData.Address === '' || ReceivingData.Address === null) {
        res.status(400).send({Status: false, Message: 'Address details can\'t be empty' });
    } else if(!ReceivingData.City || ReceivingData.City === '' || ReceivingData.City === null) {
        res.status(400).send({Status: false, Message: 'City details can\'t be empty' });
    } else if(!ReceivingData.MobileNumber || ReceivingData.MobileNumber === '' || ReceivingData.MobileNumber === null) {
        res.status(400).send({Status: false, Message: 'User details can\'t be empty' });
    } else {
        var Create_Members = new MembersModel.MembersSchema({
            Name: ReceivingData.Name,
            Education: ReceivingData.Education,
            Address: ReceivingData.Address,
            City: ReceivingData.City,
            MobileNumber: ReceivingData.MobileNumber,
            State: mongoose.Types.ObjectId(ReceivingData.State_Id),
            District: mongoose.Types.ObjectId(ReceivingData.District_Id),
            Zone: mongoose.Types.ObjectId(ReceivingData.Zone_Id),
            Branch: mongoose.Types.ObjectId(ReceivingData.Branch_Id),
            If_Official: false,
            State_Authority: false,
            District_Authority: false,
            Zone_Authority: false,
            Branch_Authority: false,
            Can_Add: false,
            Can_View: true,
            Can_Edit: false,
            Can_Approval: false,
            CreatedBy: ReceivingData.User_Id,
            UpdatedBy: ReceivingData.User_Id,
            IfDeleted: false,
            ActiveStatus: true,
            Member_Status: 'Requested',
            Status: 'Requested',
            OTP: null,
            CreatedAt: new Date(),
            UpdatedAt: new Date()
        });
        Create_Members.save((err, result) => {
            if(err) {
                res.status(417).send({Status: false, Message: 'Error in Creating New Member'});
            } else {
                res.status(200).send({Status: true, Message: 'Successfully new Member created'});
            }
        });
    }
}

// List
exports.Members_List = (req, res) => {
    var ReceivingData = req.body.Info;

    if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
        res.status(400).send({Status: false, Message: 'User details can\'t be empty' });
    } else {
        MembersModel.MembersSchema
        .find({IfDeleted: false, ActiveStatus: true}, {}, {$sort: {CreatedAt: -1}})
        .exec((err, result) =>{
            if(err) {
                res.status(417).send({Status: false, Message: 'Error in listing Member'});
            } else {
                res.status(200).send({Status: true, Response: result});
            }
        });
    }
}
