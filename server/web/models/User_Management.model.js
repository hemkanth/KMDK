var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Division Types schema
var DivisionTypesSchema = mongoose.Schema({
   Division_Name: { type: String, required: true, unique: true },
   If_Delete: { type: Boolean, required: true }
}, 
{ 
   timestamps: true
});

var VarDivisionTypesSchema = mongoose.model('DivisionTypes', DivisionTypesSchema, 'DivisionTypes_List');

// Exports Schema
module.exports = {
   DivisionTypesSchema : VarDivisionTypesSchema,
};