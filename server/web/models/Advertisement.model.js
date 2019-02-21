var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdvertisementSchema = mongoose.Schema({
    AdvertisementType: {type: Schema.Types.ObjectId, ref: 'AdvertisementTypeSetting', required: true},
    Advertisement: {type: String,required: true},
    Message: {type: String, required: true},
    AdvertisementImage: {type: Object},
    Place : {type: String, required: true},
    Latitude: {type: String, required: true},
    Longitude: {type: String, required: true},
    CreatedBy: { type: Schema.Types.ObjectId, ref: 'Members'},
    UpdatedBy: { type: Schema.Types.ObjectId, ref: 'Members'},
    IfDeleted: { type: Boolean, required: true },
    CreatedAt: { type: Date },
    UpdatedAt: { type: Date },
    },
    {timestamp: true}
);

var VarAdvertisementSchema = mongoose.model('Advertisement', AdvertisementSchema, 'Advertisement_List');

module.exports = {
    AdvertisementSchema : VarAdvertisementSchema
}