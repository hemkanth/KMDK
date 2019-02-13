var mongoose = require('mongoose');
var MembersModel = require('../../web/models/Members.model.js');
var multer = require('multer');
var axios = require('axios');

// ******************************** Multer **********************************
// Image
var MemberImageStorage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './Uploads/Advertisement');
    },
    filename: (req, res, cb) => {
        cb(null, 'Advertisement_' + Date.now() + '.png');
    }
});

var MemberImageUpload = multer({
    storage: MemberImageStorage,
    fileFilter: (req, file, cb) => {
        let fileSplit = file.originalname.split(".");
        let extension = (fileSplit[fileSplit.length - 1]).toLowerCase();
        if(extension !== 'png' && extension !== 'jpg' && extension !== 'gif' && extension !== 'jpeg' && extension !== 'mp4' && extension !== 'mp3' && extension !== 'wav') {
            return callback("some files are unsupported format");
        }
        cb(null, true);
    }
}).single('MemberImage');

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
                    var RandomNumber = Math.floor(1000 + Math.random() * 9000);
                    Promise.all([
                        axios({
                            method: 'post',
                            url: 'http://api.mVaayoo.com/mvaayooapi/MessageCompose?user=kongu@eazibiztech.com:kongusms&senderID=KMDKAP&receipientno='+ result.MobileNumber +'&dcs=0&msgtxt=Dear Member, Your OTP is ' + RandomNumber + ' .&state=4 ',
                        }),
                        MembersModel.MembersSchema.updateMany({IfDeleted: false, ActiveStatus: true, MobileNumber: { $regex : new RegExp("^" + ReceivingData.MobileNumber + "$", "i") }},{$set: {OTP: RandomNumber}}),

                    ]).then(response => {
                        res.status(200).send({Status: true, Message: 'Enter The OTP'}); 
                    }).catch(Err => {
                        res.status(417).send({Status: false, Message: 'Error in updating OTP'});
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
                    MembersModel.MembersSchema.updateMany({IfDeleted: false, ActiveStatus: true, MobileNumber: { $regex : new RegExp("^" + ReceivingData.MobileNumber + "$", "i") }},{$set: {OTP: null}})
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
    MemberImageUpload(req, res, function(UploadErr){
        if(UploadErr instanceof multer.MulterError) {
            console.log('Multer Err , ' + UploadErr);
        } else if(UploadErr) {
            console.log('Unknown Err , ' + UploadErr);
        } else {
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
            } else if(!ReceivingData.State_Id || ReceivingData.State_Id === '' || ReceivingData.State_Id === null) {
                res.status(400).send({Status: false, Message: 'State details can\'t be empty' });
            } else if(!ReceivingData.District_Id || ReceivingData.District_Id === '' || ReceivingData.District_Id === null) {
                res.status(400).send({Status: false, Message: 'District details can\'t be empty' });
            } else if(!ReceivingData.Zone_Id || ReceivingData.Zone_Id === '' || ReceivingData.Zone_Id === null) {
                res.status(400).send({Status: false, Message: 'Zone details can\'t be empty' });
            } else if(!ReceivingData.Branch_Id || ReceivingData.Branch_Id === '' || ReceivingData.Branch_Id === null) {
                res.status(400).send({Status: false, Message: 'Branch details can\'t be empty' });
            } else {
                MembersModel.MembersSchema.find({}, {MemberIdLength: 1}, {$sort: {MemberIdLength: -1}, limit: 1})
                .exec((LengthErr, LengthResult) => {
                    if(LengthErr) {
                        res.status(417).send({Status: false, Message: 'Error in generating Member ID Number' });
                    } else {
                        var number = (LengthResult.length > 0) ? parseInt(LengthResult[0].MemberIdLength) + 1 : 1;
                        var LastNumber = number.toString().padStart(4);
                        var ReferenceId = 'KMDK' + LastNumber;
                        var tempMemberImage = {};
                        if(req.file !== null && req.file !== undefined && req.file !== '') {
                            tempMemberImage = { filename: req.file.filename, mimetype: req.file.mimetype, size: req.file.size};
                        }
                        var tempSubCaste  = (ReceivingData.If_Committee) ? ReceivingData.SubCaste : null; 
                        var ReceivingDataUser_Id = (ReceivingData.User_Id === '' || ReceivingData.User_Id === null) ? null : mongoose.Types.ObjectId(ReceivingData.User_Id); 
                        var Create_Members = new MembersModel.MembersSchema({
                            MemberImage: tempMemberImage,
                            MemberIdLength: parseInt(LastNumber),
                            MemberReferenceId: ReferenceId,
                            Name: ReceivingData.Name,
                            Education: ReceivingData.Education,
                            Address: ReceivingData.Address,
                            City: ReceivingData.City,
                            MobileNumber: ReceivingData.MobileNumber,
                            State: mongoose.Types.ObjectId(ReceivingData.State_Id),
                            District: mongoose.Types.ObjectId(ReceivingData.District_Id),
                            Zone: mongoose.Types.ObjectId(ReceivingData.Zone_Id),
                            Branch: mongoose.Types.ObjectId(ReceivingData.Branch_Id),
                            If_Committee: ReceivingData.If_Committee,
                            SubCaste: tempSubCaste,
                            If_Official: false,
                            State_Authority: false,
                            District_Authority: false,
                            Zone_Authority: false,
                            Branch_Authority: false,
                            Can_Add: false,
                            Can_View: true,
                            Can_Edit: false,
                            Can_Approval: false,
                            Volunteer: ReceivingData.Volunteer,
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
                });
            }
        }
    });
}

// App List Member
exports.AppMembers_List = (req, res) => {
    var ReceivingData = req.body;

    MembersModel.MembersSchema
    .find({IfDeleted: false, ActiveStatus: true}, {}, {$sort: {UpdatedAt: -1}})
    .populate({ path: 'State', select: ['StateName'] })
    .populate({ path: 'District', select: ['DistrictName'] })
    .populate({ path: 'Zone', select: ['ZoneName'] })
    .populate({ path: 'Branch', select: ['BranchName'] })
    .populate({ path: 'CreatedBy', select: ['Name'] })
    .populate({ path: 'UpdatedBy', select: ['Name'] })
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
        .populate({ path: 'CreatedBy', select: ['Name'] })
        .populate({ path: 'UpdatedBy', select: ['Name'] })
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
