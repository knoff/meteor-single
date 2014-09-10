Meteor.startup(function(){
	Template.registerHelper('contexted',function(value){
		if (value){
			if($.isArray(value)){
				for(var i=0; i<value.length; i++){
					value[i].parentContext = this;
				}
			}
			return value
		}else{
			this.context = this.context || {};
			this.context.parentContext = this;
			this.context.helpers = this.context.helpers||{};
			this.context.helpers.TemplateContext = this.name;
			return [this.context];
		}
	})
	Template.registerHelper('safe',function(field){
		if(!_.isString(getDescendantProp(this.))){}
			
	})
});