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
	Template.registerHelper('safe',function(data){
		//console.log(field);
		//if(!_.isString(field)) return '';
		//var val=_.isString(Single.Utils.getDescendantProp(this,field))
		if(!data){
			return '';
		}
		return new Spacebars.SafeString(data);
	});
	Template.registerHelper('fields',function(object){
		console.log(object);
		if(_.isObject(object)){
			var keys = _.keys(object);
			keys = _.map(keys,function(val){
				if(val!="_id"){
					return {name:val,value:object[val]};
				}
			})
		}

		return keys;
	});
});