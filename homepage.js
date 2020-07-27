module.exports = function(Widget) {
    Widget.defineWidgetAreas = function(areas, callback) {
        areas = areas.concat([{
                'name': 'Custom HP Content',
                'template': 'homepage.tpl',
                'location': 'hp-content'
            },
            {
                'name': 'Custom HP Header',
                'template': 'homepage.tpl',
                'location': 'hp-header'
            }
        ]);

        callback(null, areas);
    };

    Widget.serveHomepage = function(params) {
        params.res.render('homepage', {
            template: {
                name: 'homepage'
            }
        });
    };

    Widget.addListing = function(data, callback) {
        data.routes.push({
            route: 'customHP',
            name: 'Custom Homepage'
        });
        callback(null, data);
    };
}