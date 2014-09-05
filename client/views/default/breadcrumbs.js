Template["default-breadcrumbs"].helpers({
	active: function(){
		return Session.get("CurrentPage")._id===this._id;
	}
});