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
Meteor.startup(function(){
	Template['single-page'].events={
		'click [single-edit]': function(event){
			var element = $(event.currentTarget);
			switch(element.attr("single-type")){
				default :
				  var editor = $('<input type="text" class="single-editor"/>');
				  editor.val(Single.Utils.getDescendantProp(Blaze.getData(event.currentTarget),$(event.currentTarget).attr('single-edit')))
				  editor.copyCSS(element);
				  editor.css({border: "#ccc 1px solid"});
				  editor.bind("focusout",function(){
				  	var val = editor.val();
				  	element.css({display:"block"});
				  	editor.remove();
				  	var found=Single.Utils.getDescendantSingleItem(
				  			Blaze.getData(event.currentTarget),
				  			$(event.currentTarget).attr('single-edit')
				  		);
				  	if(!_.isUndefined(found.found)){
				  		Single.Utils.setDescendantProp(
				  			Blaze.getData(event.currentTarget),
				  			$(event.currentTarget).attr('single-edit'),
				  			val
				  		);
				  		var newVal={};
				  		newVal[found.name]=val;
				  		SingleItems.update({_id:found.found._id},{$set:newVal});
				  	}
				  })
				  //console.log(editor);
					element.after(editor);
					element.css({display:"none"});
				break;
			}
			//$(event.CurrentTarget).after()
			//console.log($(event.currentTarget).attr('single-edit'));
			//console.log(Single.Utils.getDescendantProp(Blaze.getData(event.currentTarget),$(event.currentTarget).attr('single-edit')));
			//var object = Blaze.getData(event.currentTarget);
			//Single.Utils.setDescendantProp(object,$(event.currentTarget).attr('single-edit'),"test")
			//console.log(Single.Utils.getDescendantProp(Blaze.getData(event.currentTarget),$(event.currentTarget).attr('single-edit')));
		}
	}
});