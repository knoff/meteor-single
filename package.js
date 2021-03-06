Package.describe({
  summary: "CMF specifically designed for Meteor",
  version: "0.1.0",
  git: "https://github.com/knoff/meteor-single"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.1');
  api.use('templating@1.0.5', ['client']);
  api.use('iron:router@0.9.1');
  api.use('matb33:collection-hooks@0.7.3');
  api.use('jquery',['client']);
  api.use('underscore', ['client', 'server']);
  api.addFiles('lib/validation.js',['client','server']);
  api.addFiles('collections/single-items.js',['client','server']);
  api.addFiles('lib/router.js',['client','server']);
  api.addFiles('client/templates/template.html','client');
  api.addFiles('client/templates/template.js','client');
  api.addFiles('client/templates/single-page.html','client');
  api.addFiles('client/templates/single-404.html','client');
  api.addFiles('client/template-helpers.js','client');
  api.export('SingleItems',['client','server']);
  api.export('getDescendantProp',['client','server']);
});

Package.onTest(function(api) {
});
