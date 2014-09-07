SingleItems = new Meteor.Collection('single-items');
SingleItems.validation({
	property: ["relations._id","relations.url"],
	unique: true
});
SingleItems.before.insert(function(userId,doc){
	return SingleItems.valid(doc);
});
SingleItems.before.update(function(userId,doc){
	return SingleItems.valid(doc);
});