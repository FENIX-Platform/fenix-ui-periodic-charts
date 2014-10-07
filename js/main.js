require.config({

    paths: {
        text:                       'libs/text',
        i18n:                       'libs/i18n',
        jquery:                     '//fenixapps.fao.org/repository/js/jquery/1.10.2/jquery-1.10.2.min',
        mustache:                   '//cdnjs.cloudflare.com/ajax/libs/mustache.js/0.8.1/mustache',
        highcharts:                 '//fenixapps.fao.org/repository/js/highcharts/4.0.4/js/highcharts',
        highcharts_exporting:       '//fenixapps.fao.org/repository/js/highcharts/4.0.4/js/modules/exporting',
        FENIX_UI_PERIODIC_CHARTS:   'fenix-ui-periodic-charts/fenix-ui-periodic-charts'
    },

    shim: {
        highcharts: {
            deps: ['jquery']
        },
        highcharts_exporting: {
            deps: ['highcharts']
        },
        FENIX_UI_PERIODIC_CHARTS: {
            deps: [
                'text',
                'i18n',
                'jquery',
                'mustache',
                'highcharts',
                'highcharts_exporting'
            ]
        }
    }

});

require(['FENIX_UI_PERIODIC_CHARTS'], function (FENIX_UI_PERIODIC_CHARTS) {
    var module = new FENIX_UI_PERIODIC_CHARTS({
        render_to: 'chart_placeholder'
    });
    module.add_time_series('This is the time series', [
        [Date.UTC(1982, 6,  1), 3.14],
        [Date.UTC(1982, 6,  2), 2.78],
        [Date.UTC(1982, 6,  3), 4.75],
        [Date.UTC(1982, 6,  4), 3.75],
        [Date.UTC(1982, 6,  5), 6.75],
        [Date.UTC(1982, 6,  6), 4.75],
        [Date.UTC(1982, 6,  7), 7.75],
        [Date.UTC(1982, 6,  8), 8.75],
        [Date.UTC(1982, 6,  9), 2.75],
        [Date.UTC(1982, 6, 10), 7.75],
        [Date.UTC(1982, 6, 11), 3.75],
        [Date.UTC(1982, 6, 12), 7.75],
        [Date.UTC(1982, 6, 13), 4.75],
        [Date.UTC(1982, 6, 14), 9.75],
        [Date.UTC(1982, 6, 15), 3.75],
        [Date.UTC(1982, 6, 16), 4.75],
        [Date.UTC(1982, 6, 17), 9.75],
        [Date.UTC(1982, 6, 18), 5.75],
        [Date.UTC(1982, 6, 19), 9.75],
        [Date.UTC(1982, 6, 20), 2.75],
        [Date.UTC(1982, 6, 21), 8.75],
        [Date.UTC(1982, 6, 22), 0.75],
        [Date.UTC(1982, 6, 23), 5.75],
        [Date.UTC(1982, 6, 24), 2.75],
        [Date.UTC(1982, 6, 25), 8.75],
        [Date.UTC(1982, 6, 26), 0.75],
        [Date.UTC(1982, 6, 27), 3.75],
        [Date.UTC(1982, 6, 28), 7.75],
        [Date.UTC(1982, 6, 29), 0.75],
        [Date.UTC(1982, 6, 30), 3.75],
        [Date.UTC(1982, 6, 31), 5.75]
    ]);
    module.add_periodic_series('Period', [
        [Date.UTC(1982, 6,  18), 3.19],
        [Date.UTC(1982, 6,  19), 1.78],
        [Date.UTC(1982, 6,  20), 4.47],
        [Date.UTC(1982, 6,  21), 0.68],
        [Date.UTC(1982, 7,  21), 5.41]
    ]);
    module.plot();
});