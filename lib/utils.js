Single = Single||{};
Single.Utils = {};
Single.Utils.getDescendantProp=function(obj,desc){
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
		obj = Single.Utils.getDescendantProp(obj,desc);
	}
	return obj;
};
Single.Utils.setDescendantProp=function(obj,desc,val){
	var arr = desc.split(".");
	//obj = _.clone(obj);
	var prop = arr.shift();
	if(_.isArray(obj)){
		obj = _.flatten(obj);
		for(var i=0; i<obj.length; i++){
			obj[i]=obj[i][prop];
		}
	}else{
		if(!_.isObject(obj[prop])){
			obj[prop]=val;
		}
	  obj=obj[prop];
	}
	if(_.isObject(obj)&&arr.length>0){
		desc = arr.join('.');
		obj = Single.Utils.setDescendantProp(obj,desc,val);
	}
	return obj;
}
Single.Utils.getDescendantSingleItem=function(obj,desc,found,name){
	var arr = desc.split(".");
	var prop = arr.shift();
	if (_.isUndefined(obj)) return {obj:obj,found:found};
	if(obj._id){
		name=prop;
		found = obj;
	}
	obj=obj[prop];
	if(_.isObject(obj)&&arr.length>0){
		desc=arr.join(".");
		var res = Single.Utils.getDescendantSingleItem(obj,desc,found,name);
		obj=res.obj;
		found=res.found;
		name = res.name;

	}
	return {obj:obj,found:found,name:name}
}

if(Meteor.isClient){
	$.fn.getStyleObject = function(){
    var dom = this.get(0);
    var style;
    var returns = {};
    if(window.getComputedStyle){
      var camelize = function(a,b){
        return b.toUpperCase();
      };
      style = window.getComputedStyle(dom, null);
      for(var i = 0, l = style.length; i < l; i++){
        var prop = style[i];
        var camel = prop.replace(/\-([a-z])/g, camelize);
        var val = style.getPropertyValue(prop);
        returns[camel] = val;
      };
      return returns;
    };
    if(style = dom.currentStyle){
      for(var prop in style){
        returns[prop] = style[prop];
      };
      return returns;
    };
    return this.css();
  }
  $.fn.copyCSS = function(source){
  	var styles = $(source).getStyleObject();
  	this.css(styles);
	}
}