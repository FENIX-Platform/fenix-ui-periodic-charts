require.config({

    paths: {
        text:                       'libs/text',
        i18n:                       'common/libs/i18n',
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
        }
    }

});

require(['FENIX_UI_PERIODIC_CHARTS'], function (FENIX_UI_PERIODIC_CHARTS) {
    FENIX_UI_PERIODIC_CHARTS.init({});
});