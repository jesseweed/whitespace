exports.index = function(app) {

	app.res.render('watch', {
		title : app.site.name,
		site: app.site
  });

};
