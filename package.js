Package.describe({
  summary: "CMF specifically designed for Meteor",
  version: "0.0.1",
  git: "https://github.com/knoff/meteor-single"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.1');
  api.use(['templating'], 'client');
  api.use('iron:router@0.9.1');
  api.use('jquery','client');
  api.addFiles('collections/single-items.js');
  api.addFiles('lib/router.js');
  api.addFiles('client/templates/template.html','client');
  api.addFiles('client/templates/template.js','client');
  api.addFiles('client/templates/single-page.html','client');
  api.addFiles('client/templates/single-404.html','client');
  api.addFiles('client/template-helpers.js','client');
  api.export('SingleItems',['client','server']);
});

Package.onTest(function(api) {
});
