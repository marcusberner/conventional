
var fs = require('fs'),
	path = require('path');

module.exports = function (app, options, addWidgetRenderers, renderTemplate) {

	return function (callback) {

		var templatePath = path.join(options.routePath, '500.html');
		if (!fs.existsSync(templatePath)) return callback();

		app.use(function(err, req, res, next){

			var internalRequestContext = {},
				requestContext = {
					request: req
				};
			addWidgetRenderers(internalRequestContext, requestContext);
			renderTemplate(templatePath, internalRequestContext, { error: err.message }, function (err, html) {
				if (err) return next(err);
				res.status(500);
				res.set({
					'Content-Type': 'text/html'
				});
				res.send(html);
			});

		});

		callback();

	};

};
