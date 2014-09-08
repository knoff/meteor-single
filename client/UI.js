Single = Single||{};
Single.UI = {};
Single.UI.Schemas={};
var Schema = function(name){
	return {name:name};
}
Single.UI.addSchema=function(name,schema){
	if(this.Schemas[name]) return false;
	console.log(new Schema(name));
	return true;
};