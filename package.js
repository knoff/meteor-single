Package.describe({
  summary: "CMF specifically designed for Meteor",
  version: "0.1.1-dev",
  git: "https://github.com/knoff/meteor-single"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.1');
  api.use('templating@1.0.5', ['client']);
  api.use('iron:router@0.9.1');
  api.use('peerlibrary:peerdb',['client','server']);
  api.use('matb33:collection-hooks@0.7.3');
  api.use('jquery',['client']);
  api.use('underscore', ['client', 'server']);
  api.use('coffeescript',['client','server']);
  api.addFiles('lib/utils.js',['client','server']);
  //api.addFiles('lib/validation.js',['client','server']);
  api.addFiles('lib/validation.coffee',['client','server']);
  api.addFiles('lib/triggers.coffee',['client','server']);
  //api.addFiles('collections/single-items.js',['client','server']);
  api.addFiles('collections/single-items.coffee',['client','server']);
  //api.addFiles('lib/router.js',['client','server']);
  api.addFiles('lib/router.coffee',['client','server']);
  api.addFiles('client/templates/template.html','client');
  api.addFiles('client/templates/template.js','client');
  api.addFiles('client/templates/single-page.html','client');
  api.addFiles('client/templates/single-404.html','client');
  api.addFiles('client/template-helpers.js','client');
  api.addFiles('client/UI.js','client');
  api.export('SingleItems',['client','server']);
  api.export('Single',['client']);
});

Package.onTest(function(api) {
});
