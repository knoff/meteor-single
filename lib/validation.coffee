Document.Meta.validation = []
Document.validation = (params)->
	(@Meta.validation.push _.pick params,"property","required","unique","message","value")-1
Document::validate = ()->
	#console.log this.constructor.Meta.validation
	messages=[]
	pass=yes
	collection = this.constructor
	for rule in collection.Meta.validation
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
				if val.length > 0
					q["$or"]=val
					query.push q
			if query.length > 0
				fres = collection.documents.find {$and:query}
			else
				fres = colelction.documents.find {_id:null}
			if fres.count()>1 or (fres.count() is 1 and fres.fetch()[0]._id isnt this._id)
				pass = no
				messages.push rule.message or "Properties #{property.toString()} NOT UNIQUE" 
		if rule.value
			for property in rule.property
				val = Single.Utils.getDescendantProp this, property
				if not _.isArray val
					val = [val]
				if _.isArray rule.value
					oneof = no
					for value in val
						all = no
						for ruleValue in rule.value
							if value is ruleValue
								all = yes
						oneof = all
					if not oneof
						pass = no
						messages.push rule.message or "Property #{property} must be oneof #{rule.value.toString()}"
				else
					if _.isRegExp rule.value
						for value in val
							if not rule.value.test value
								pass = no
								messages.push rule.messages of "Property #{property} must match #{rule.value.toString()}"
	{result:pass, messages:messages}
Document::valid = ()->
	this.validate().result
Document.valid = (item)->
	if item instanceof Document
		return item.valid
	else
		return no
Document.validate = (item)->
	if item instanceof Document
		item.validate