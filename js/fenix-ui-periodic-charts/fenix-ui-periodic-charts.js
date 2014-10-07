define(['jquery',
        'mustache',
        'highcharts',
        'highcharts_exporting'], function ($, Mustache) {

    'use strict';

    function FENIX_UI_PERIODIC_CHARTS() {

        this.CONFIG = {

        };

    }

    FENIX_UI_PERIODIC_CHARTS.prototype.init = function(config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        alert('welcome');

    };

    return new FENIX_UI_PERIODIC_CHARTS();

});
