define(['jquery',
        'mustache',
        'text!fenix-ui-periodic-charts/json/chart_template.json',
        'highcharts',
        'highcharts_exporting'], function ($, Mustache, chart_template, highcharts) {

    'use strict';

    function FENIX_UI_PERIODIC_CHARTS(config) {

        /* Module's configuration. */
        this.CONFIG = {
            render_to: null,
            periodic_series_name: null,
            periodic_series_values: [],
            time_series_name: null,
            time_series_values: [],
            default_colors: ['#379bcd', '#76BE94', '#744490', '#E10079', '#2D1706', '#F1E300', '#F7AE3C', '#DF3328']
        };

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Cast configuration files to JSON. */
        chart_template = $.parseJSON(chart_template);

    }

    FENIX_UI_PERIODIC_CHARTS.prototype.add_periodic_series = function(name, values) {
        this.CONFIG.periodic_series_values = values;
        this.CONFIG.periodic_series_name = name;
    };

    FENIX_UI_PERIODIC_CHARTS.prototype.add_time_series = function(name, values) {
        this.CONFIG.time_series_values = values;
        this.CONFIG.time_series_name = name;
    };

    FENIX_UI_PERIODIC_CHARTS.prototype.plot = function() {
        this.init_plot();
    };

    FENIX_UI_PERIODIC_CHARTS.prototype.init_plot = function() {

        /* This... */
        var _this = this;

        /* Load chart template. */
        var template_payload = chart_template;

        /* Add load function. Data will be plottetd after chart's rendering. */
        var custom_payload = {
            chart: {
                events: {
                    load: function () {
                        _this.add_series_to_the_plot(this.series);
                    }
                }
            },
            colors: this.CONFIG.default_colors
        };

        /* Initialize series. */
        custom_payload.series = [];

        /* Series 0: periodic series. */
        custom_payload.series[0] = {};

        /* Series 1: time series. */
        custom_payload.series[1] = {};

        /* Merge the template and the custom settings. */
        template_payload = $.extend(true, {}, template_payload, custom_payload);

        /* Render the (empty) chart. */
        $('#' + this.CONFIG.render_to).highcharts(template_payload);

    };

    FENIX_UI_PERIODIC_CHARTS.prototype.add_series_to_the_plot = function(series) {

        /* Add the time series to the chart. */
        series[1].setData(this.CONFIG.time_series_values);
        series[1].update({name: this.CONFIG.time_series_name}, true);

        series[0].setData(this.CONFIG.periodic_series);

    };

    /* Return the module. */
    return FENIX_UI_PERIODIC_CHARTS;

});
