getDescendantProp=function(obj,desc){
	var arr = desc.split(".");
	obj = _.clone(obj);
	var prop = arr.shift();
	if(_.isArray(obj)){
		obj = _.flatten(obj);
		for(var i=0; i<obj.length; i++){
			obj[i]=obj[i][prop];
		}
	}else{
	  obj=obj[prop];
	}
	if(_.isObject(obj)&&arr.length>0){
		desc = arr.join('.');
		obj = getDescendantProp(obj,desc);
	}
	return obj;
}
_.extend(Meteor.Collection.prototype,{
	validation:function(params){
		var res = this.__validation.push(_.pick(params,"property","required","unique","message","value"));
		return this.__validation[res-1];
	},
	validate:function(item){
		var rule={};
		var messages=[];
		var pass = true;
		for(var i=0; i<this.__validation.length; i++){
			rule = this.__validation[i];
			if(!_.isArray(rule.property)){
				rule.property = [rule.property]
			}
			// required
			if(rule.required){
				for(var k=0; k<rule.property.length; k++){
					if(_.indexOf(_.keys(item),rule.property[k])<0){
						pass=false;
						messages.push(rule.message||"Property \""+rule.property[k]+"\" is REQUIRED");
					}
				}
			}
			// Unique
			if(rule.unique){
				var query = [];
				for(var k=0; k<rule.property.length; k++){
					var q={}
					var val = getDescendantProp(item,rule.property[k]);
					if(!_.isArray(val)){
						val = [val];
					}
					val = _.map(val,function(val){
						var res = {};
						res[rule.property[k]]=val
						return res;
					})
					
					q["$or"]=val;
					query.push(q);
				}
				var fres=this.find({$and:query})
				if(fres.count()>1||(fres.count()==1&&fres.fetch()[0]._id!=item._id)){
					pass=false;
					messages.push(rule.message||"Properties \""+rule.property.toString()+"\" NOT UNIQUE");
				}
			}
			// Value
			if(rule.value){
				for(var k=0; k<rule.property.length; k++){
					var val = getDescendantProp(item,rule.property[k]);
					if(!_.isArray(val)){
						val = [val];
					}
					if(_.isArray(rule.value)){
						var oneof=false;
						for(var l = 0; l<val.length; l++){
							var all = false;
							for(var j=0; j<rule.value.length; j++){
							  if(val[l] === rule.value[j]){
							  	all = true;
							  }else{
							  	console.log(val[l],rule.value[j],all);
							  }
							}
							oneof = all
						}
						if(!oneof){
							pass=false;
							messages.push(rule.message||"Property \""+rule.property[k]+"\" must be one of "+rule.value.toString());
						}
					}else{
						if(_.isRegExp(rule.value)){
							for(var l = 0; l<val.length; l++){
							  if(!rule.value.test(val[l])){
							  	pass=false;
							messages.push(rule.message||"Property \""+rule.property[k]+"\" must match "+rule.value.toString());
							  }
							}
						}
					}
				}
			}
		}
		return {result:pass, messages:messages};
	},
	valid:function(item){
		return this.validate(item).result;
	},
	__validation:[]
});