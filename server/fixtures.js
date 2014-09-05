Items.remove({});
var items =[]
items.push(Items.insert({
	url:"1",
	title: "Тест 1",
	parents:[null]
}));
items.push(Items.insert({
	url:"1.1",
	title: "Тест 1.1",
	parents:[items[0]]
}));
items.push(Items.insert({
	url:"1.1.1",
	title: "Тест 1.1.1",
	parents:[items[1]]
}));
items.push(Items.insert({
	url:"1.2",
	title: "Тест 1.2",
	parents:[items[0]]
}));
items.push(Items.insert({
	url:"2",
	title: "Тест 2",
	parents:[null]
}));
items.push(Items.insert({
	url:"2.1",
	title: "Тест 2.1",
	parents:[items[4]]
}));
