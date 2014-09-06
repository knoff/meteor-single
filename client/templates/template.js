Template.template.helpers({
	contexted:function(){
		this.context = this.context || {};
		this.context.helpers = this.context.helpers||{};
		this.context.helpers.TemplateContext = this.name;
		return [this.context];
	},
	template: function(){
		var template = this.template?this.template:"default";
		var ctemplate = this.helpers&&this.helpers.TemplateContext ? this.helpers.TemplateContext : "default";
		var templates = ["default"];
		if(template!=="default") templates.push(template+"-default");
		if(ctemplate!=="default") templates.push("default-"+ctemplate);
		if(!(template==="default"||template==="default")) templates.push(ctemplate+"-"+template);
		for(var i = templates.length-1; i>=0; i--){
			if(Template[templates[i]]) return Template[templates[i]];
		}
		return null
	}
});
