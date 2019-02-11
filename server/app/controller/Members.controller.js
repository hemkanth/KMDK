var mongoose = require('mongoose');
var MembersModel = require('../../web/models/Members.model.js');
var smsGateway = require('sms-gateway-nodejs')('ntrinquier@provider.com', 'p4ssw0rd')

// **************************************** Members *******************************************

// Member Validate on login
exports.AppMembersLogin_Validate = (req, res) => {
    var ReceivingData = req.body;
    if(!ReceivingData.MobileNumber || ReceivingData.MobileNumber === '' || ReceivingData.MobileNumber === null) {
        res.status(400).send({Status: false, Message: 'Mobile Number can\'t be empty' });
    } else{
        MembersModel.MembersSchema.findOne({IfDeleted: false, ActiveStatus: true, MobileNumber: { $regex : new RegExp("^" + ReceivingData.MobileNumber + "$", "i")}, Member_Status: "Approved" },{})
        .exec((err, result) => {
            if(err) {
                console.log(err);
                res.status(417).send({Status: false, Message: 'Error in Login' });
            } else {
                if (result === null) {
                    res.status(200).send({Status: false, Message: 'Not yet approved'});
                } else {
                    var RandomNumber = Math.floor(100000 + Math.random() * 900000);
                    // smsGateway.message.sendMessageToNumber('2012', '09597989109', 'RandomNumber')
                    // .then((response) => {
                    // // do something with response
                    //     console.log(response);
                    // })
                    // .catch((error) => {
                    // // handle error
                    // console.log(error);
                    // });
                    MembersModel.MembersSchema.updateMany({IfDeleted: false, ActiveStatus: true, MobileNumber: { $regex : new RegExp("^" + ReceivingData.MobileNumber + "$", "i") }},{$set: {OTP: RandomNumber}})
                    .exec((err_1, result_1) => {
                        if(err_1) {
                            res.status(417).send({Status: false, Message: 'Error in updating OTP'});
                        } else {
                            res.status(200).send({Status: true, Message: 'Enter The OTP', Response: RandomNumber});
                        }
                     });
                }
            }
        });
    } 
}

// Member login validate OTP
exports.AppMembersOTP_Validate = (req, res) => {
    var ReceivingData = req.body;
    if(!ReceivingData.MobileNumber || ReceivingData.MobileNumber === '' || ReceivingData.MobileNumber === null) {
        res.status(400).send({Status: false, Message: 'Mobile Number can\'t be empty' });
    } else if(!ReceivingData.OTP || ReceivingData.OTP === '' || ReceivingData.OTP === null) {
        res.status(400).send({Status: false, Message: 'OTP can\'t be empty' });
    } else {
        MembersModel.MembersSchema.findOne({IfDeleted: false, ActiveStatus: true, MobileNumber: { $regex : new RegExp("^" + ReceivingData.MobileNumber + "$", "i")}, Member_Status: "Approved", OTP: { $regex : new RegExp("^" + ReceivingData.OTP + "$", "i")}}, {})
        .exec((err, result) => {
            if(err) {
                res.status(417).send({Status: false, Message: 'Error in OTP validation' });
            } else {
                if (result === null) {
                    res.status(200).send({Status: false, Message: 'OTP Invalid'});
                } else {
                    MembersModel.MembersSchema.updateMany({IfDeleted: false, ActiveStatus: true, MobileNumber: { $regex : new RegExp("^" + ReceivingData.MobileNumber + "$", "i") }},{$set: {OTP: RandomNumber}})
                    .exec((err_1, result_1) => {
                        if(err_1) {
                            res.status(417).send({Status: true, Message: 'Error in updating OTP'});
                        } else {
                            res.status(200).send({Status: true, Response: result});
                        }
                    });
                }
            }
        });
    }
}

// App Mobile Number Validate
exports.AppMembersMobileNumber_Validate = (req, res) => {
    var ReceivingData = req.body;
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
// App Create Member
exports.AppMembers_Create = (req, res) => {
    var ReceivingData = req.body;

    if(!ReceivingData.Name || ReceivingData.Name === '' || ReceivingData.Name === null) {
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
        var ReceivingDataUser_Id = (ReceivingData.User_Id === '' || ReceivingData.User_Id === null) ? null : mongoose.Types.ObjectId(ReceivingData.User_Id); 
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
            CreatedBy: ReceivingDataUser_Id,
            UpdatedBy: ReceivingDataUser_Id,
            IfDeleted: false,
            ActiveStatus: true,
            Member_Status: 'Requested',
            Status: 'Requested',
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

// App List Member
exports.AppMembers_List = (req, res) => {
    var ReceivingData = req.body;

    MembersModel.MembersSchema
    .find({IfDeleted: false, ActiveStatus: true}, {}, {$sort: {CreatedAt: -1}})
    .populate({ path: 'State', select: ['StateName'] })
    .populate({ path: 'District', select: ['DistrictName'] })
    .populate({ path: 'Zone', select: ['ZoneName'] })
    .populate({ path: 'Branch', select: ['BranchName'] })
    .exec((err, result) =>{
        if(err) {
            res.status(417).send({Status: false, Message: 'Error in listing Member'});
        } else {
            res.status(200).send({Status: true, Response: result});
        }
    });
}

// App member View 
exports.AppMembers_View = (req, res) => {
    var ReceivingData = req.body;

    if(!ReceivingData.Member_Id || ReceivingData.Member_Id === '' || ReceivingData.Member_Id === null) {
        res.status(400).send({Status: false, Message: 'Member Details can\'t be empty' });
    } else {
        MembersModel.MembersSchema
        .findOne({IfDeleted: false, ActiveStatus: true, _id: mongoose.Types.ObjectId(ReceivingData.Member_Id)}, {})
        .populate({ path: 'State', select: ['StateName'] })
        .populate({ path: 'District', select: ['DistrictName'] })
        .populate({ path: 'Zone', select: ['ZoneName'] })
        .populate({ path: 'Branch', select: ['BranchName'] })
        .exec((err, result) => {
            if(err) {
                res.status(417).send({Status: false, Message: 'Error in Finding Member'});
            } else {
                res.status(200).send({Status: true, Response: result});
            }
        });
    }
}
// App member Approve 
exports.AppMembers_Approve = (req, res) => {
    var ReceivingData = req.body;

    if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
        res.status(400).send({Status: false, Message: 'User Details can\'t be empty' });
    } else if(!ReceivingData.Member_Id || ReceivingData.Member_Id === '' || ReceivingData.Member_Id === null) {
        res.status(400).send({Status: false, Message: 'Member Details can\'t be empty' });
    } else {
        MembersModel.MembersSchema
        .updateMany({IfDeleted: false, ActiveStatus: true, _id: mongoose.Types.ObjectId(ReceivingData.Member_Id)}, {$set: {Member_Status: 'Approved', Status: 'Approved', UpdatedBy: mongoose.Types.ObjectId(ReceivingData.User_Id)}})
        .exec((err, result) => {
            if(err) {
                res.status(417).send({Status: false, Message: 'Error in Approving Member'});
            } else {
                res.status(200).send({Status: true, Message: 'Successfully Member Approved'});
            }
        });
    }
}

// App member Reject 
exports.AppMembers_Reject = (req, res) => {
    var ReceivingData = req.body;

    if(!ReceivingData.User_Id || ReceivingData.User_Id === '' || ReceivingData.User_Id === null) {
        res.status(400).send({Status: false, Message: 'User Details can\'t be empty' });
    } else if(!ReceivingData.Member_Id || ReceivingData.Member_Id === '' || ReceivingData.Member_Id === null) {
        res.status(400).send({Status: false, Message: 'Member Details can\'t be empty' });
    } else {
        MembersModel.MembersSchema
        .updateMany({IfDeleted: false, ActiveStatus: true, _id: mongoose.Types.ObjectId(ReceivingData.Member_Id)}, {$set: {Member_Status: 'Rejected', Status: 'Rejected', UpdatedBy: mongoose.Types.ObjectId(ReceivingData.User_Id)}})
        .exec((err, result) => {
            if(err) {
                res.status(417).send({Status: false, Message: 'Error in Rejecting Member'});
            } else {
                res.status(200).send({Status: true, Message: 'Successfully Member Rejected'});
            }
        });
    }
}