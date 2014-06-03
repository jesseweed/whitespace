exports.render = function(app,view) {

  var colors = require('colors'),
      tesla = require('../../lib/tesla')(app),
      uri = require('../../lib/uri')(app, app.req );

  tesla.log('SUCCESS: '.green + 'app/views/'.yellow + view.yellow + ' has been loaded');

  app.res.render(view, {
      title : app.site.name,
      site: app.site,
      challenge: {
        category: uri.controller(),
        id: uri.action()
      }
  });

};
