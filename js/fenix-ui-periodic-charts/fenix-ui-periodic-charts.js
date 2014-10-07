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
            periodic_series_period_type: 'day',
            time_series_name: null,
            time_series_values: [],
            default_colors: ['#379bcd', '#76BE94', '#744490', '#E10079', '#2D1706', '#F1E300', '#F7AE3C', '#DF3328']
        };

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Cast configuration files to JSON. */
        chart_template = $.parseJSON(chart_template);

    }

    FENIX_UI_PERIODIC_CHARTS.prototype.add_periodic_series = function(name, values, period_type) {
        this.CONFIG.periodic_series_values = values;
        this.CONFIG.periodic_series_name = name;
        this.CONFIG.periodic_series_period_type = period_type;
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

        /* Add the periodic series to the chart. */
        series[0].setData(this.create_periodic_series());
//        series[0].setData(this.CONFIG.periodic_series_values);
        series[0].update({name: this.CONFIG.periodic_series_name}, true);

    };

    FENIX_UI_PERIODIC_CHARTS.prototype.create_periodic_series = function() {

        /* Initiate variables. */
        var periodic_series = this.CONFIG.periodic_series_values;
        var original_periodic_series = this.CONFIG.periodic_series_values;
        var periodic_series_length = this.CONFIG.periodic_series_values.length;
        var min_date = Date.UTC(3014, 11, 31);
        var max_date = Date.UTC(0, 0, 1);

        /* Find minimum and maximum dates. */
        for (var i = 0 ; i < this.CONFIG.time_series_values.length ; i++) {
            if (this.CONFIG.time_series_values[i][0] < min_date)
                min_date = this.CONFIG.time_series_values[i][0];
            if (this.CONFIG.time_series_values[i][0] > max_date)
                max_date = this.CONFIG.time_series_values[i][0];
        }

        /* Create fake values backwards. */
        var current_date = this.CONFIG.periodic_series_values[0][0];
        var counter = 0;
        current_date = new Date(current_date);
        while (current_date > min_date) {
            // TODO This is the function for the 'daily' data, implement other kind of steps
            current_date.setDate(current_date.getDate() - 1);
            var new_date = current_date.getTime();
            var idx = this.CONFIG.periodic_series_values.length - 1 - counter++;
            var new_value = this.CONFIG.periodic_series_values[idx][1];
            if (counter == periodic_series_length)
                counter = 0;
            periodic_series.splice(0, 0, [new_date, new_value]);
        }

        /* Create fake values onwards. */
        var current_date = this.CONFIG.periodic_series_values[this.CONFIG.periodic_series_values.length - 2][0];
        var counter = 0;
        current_date = new Date(current_date);
        while (current_date < max_date) {
            // TODO This is the function for the 'daily' data, implement other kind of steps
            current_date.setDate(current_date.getDate() + 1);
            periodic_series.push([current_date.getTime(), this.CONFIG.periodic_series_values[counter++][1]]);
        }

        /* Return the periodic series. */
        return periodic_series;

    };

    /* Return the module. */
    return FENIX_UI_PERIODIC_CHARTS;

});
395712000000
395625600000