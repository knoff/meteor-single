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
			var view = $(event.currentTarget);
			var editor = view.clone();
			view.after(editor);
			var display = view.css("display");
			view.css({display:"none"});
			editor.removeAttr("single-edit").removeAttr("single-type");
			if(!(editor.attr('contenteditable')==="true")){
				editor.attr('contenteditable',true);
				editor.blur(function(event){
					editor.attr('contenteditable',false);
					var found=Single.Utils.getDescendantSingleItem(
		  			Blaze.getData(view[0]),
		  		view.attr('single-edit')
		  		);
		  		var val = editor.html();
					if(!_.isUndefined(found.found)){
			  		Single.Utils.setDescendantProp(
			  			Blaze.getData(view[0]),
			  			view.attr('single-edit'),
			  			val
			  		);
			  		var newVal={};
			  		newVal[found.name]=val;
			  		SingleItems.update({_id:found.found._id},{$set:newVal});
			  		editor.remove();
			  		view.css({display:display});
		  		}
				})
			}
			editor.focus();
		}
	}
});