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
			var editor = $(event.currentTarget);
			console.log((editor.attr('contenteditable')==="true"));
			if(!(editor.attr('contenteditable')==="true")){
				editor.attr('contenteditable',true);
				editor.blur(function(event){
					console.log(editor.html());
					editor.attr('contenteditable',false);
					var found=Single.Utils.getDescendantSingleItem(
		  			Blaze.getData(event.currentTarget),
		  			$(event.currentTarget).attr('single-edit')
		  		);
		  		var val = editor.html();
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
			}
			/*
			var element = $(event.currentTarget);
			switch(element.attr("single-type")){
				case "textarea" :
					var editor = $('<textarea class="single-editor"></textarea>');
//					var lastScroll=0;
					editor.bind("keyup",function(){
//						lastScroll = (editor[0].scrollHeight>lastScroll)?editor[0].scrollHeight:lastScroll;
						var height=(editor.val().split("\n").length*parseFloat(editor.css("line-height")));
						editor.css({height: height+"px" });
					})
				break;
				default :
				  var editor = $('<input type="text" class="single-editor"/>');
				break;
			}
			var val = Single.Utils.getDescendantProp(Blaze.getData(event.currentTarget),$(event.currentTarget).attr('single-edit'));
			val = val.replace(/\n\n/g,"\n");
			editor.val(val);
		  editor.copyCSS(element);
		  editor.css({border: "#ccc 1px solid"});
		  editor.bind("focusout",function(){
		  	var val = editor.val();
		  	val = val.replace(/\n/g,"\n\n");
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
		  });
		  switch(element.attr("single-type")){
				default :
				  //var editor = $('<input type="text" class="single-editor"/>');
				break;
			}
		  //console.log(editor);
			element.after(editor);
			element.css({display:"none"});
			//$(event.CurrentTarget).after()
			//console.log($(event.currentTarget).attr('single-edit'));
			//console.log(Single.Utils.getDescendantProp(Blaze.getData(event.currentTarget),$(event.currentTarget).attr('single-edit')));
			//var object = Blaze.getData(event.currentTarget);
			//Single.Utils.setDescendantProp(object,$(event.currentTarget).attr('single-edit'),"test")
			//console.log(Single.Utils.getDescendantProp(Blaze.getData(event.currentTarget),$(event.currentTarget).attr('single-edit')));
			*/
		}
	}
});