console.log "!!!"
Document.Meta.validation = []
Document.validation = (params)->
	(@Meta.validation.push _.pick params,"property","required","unique","message","value")-1
Document::validate = ()->
	#console.log this.constructor.Meta.validation
	messages=[]
	pass=yes
	for rule in this.constructor.Meta.validation
		if !_.isArray rule.property
			rule.property = [rule.property]
		if rule.required
			for property in rule.property
				if (_.indexOf (_.keys item), property) < 0
					pass = no
					messages.push rule.messages || "Property #{property} is REQUIRED"
		if rule.unique
			query=[];
			for property in rule.property
				q = {}
				val = Single.Utils.getDescendantProp this, property
				if !_.isArray val 
					val = [val]
				val = for v in val
					res={}
					res[property]=v
					res
				

Document.validate = (item)->
	if item instanceof Document
		item.validate