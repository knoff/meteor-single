class AllTrigger extends Document._Trigger
	constructor: (trigger) ->
		super ['title'], trigger or (newDocument, oldDocument) ->
			console.log oldDocument
			return unless newDocument._id
			return if _.isEqual newDocument, oldDocument
@AllTrigger = (args...) ->
	new AllTrigger args...