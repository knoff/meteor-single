Package.describe({
  summary: " \* Fill me in! *\ ",
  version: "0.0.1",
  git: " \* Fill me in! *\ "
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.1');
  api.use('iron:router@0.9.1');
  api.addFiles('lib/router.js');
});

Package.onTest(function(api) {
});
