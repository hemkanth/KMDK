var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventsSchema = mongoose.Schema({
    EventName :  {type: String, required: true},
    EventImage: {type: Object},
    Place : {type: String, required: true},
    State: { type: Schema.Types.ObjectId, ref: 'StateSetting', required: true },
    District: { type: Schema.Types.ObjectId, ref: 'DistrictSetting', required: true },
    Zone: { type: Schema.Types.ObjectId, ref: 'ZoneSetting', required: true },
    Branch: { type: Schema.Types.ObjectId, ref: 'BranchSetting', required: true },
    Date: {type: String, required: true},
    ContactName: {type: String, required: true},
    ContactNumber: {type: String, required: true },
    CreatedBy: { type: Schema.Types.ObjectId, ref: 'Members', required: true },
    UpdatedBy: { type: Schema.Types.ObjectId, ref: 'Members', required: true },
    IfDeleted: { type: Boolean, required: true },
    CreatedAt: { type: Date },
    UpdatedAt: { type: Date },
    },
    {timestamp: true}
);

var VarEventsSchema = mongoose.Schema('Events', EventsSchema, 'Events_List');

module.exports = {
    EventsSchema : VarEventsSchema,
}