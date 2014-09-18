class SingleItems extends Document
	@Meta
		name: 'SingleItems'
#		triggers: =>
#			testTrigger: AllTrigger (newDocument,oldDocument)->
#				console.log newDocument
	@verboseName: =>
	 "Single Items"
#SingleItems.validation 
#	property: ["relations._id","relations.url"]
#	unique: true

#SingleItems.before.insert (userId,doc)->
#	SingleItems.valid doc

#SingleItems.before.update (userId,doc)->
#	SingleItems.valid doc