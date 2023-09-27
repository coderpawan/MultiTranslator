/*!
 * gtranslator.js 1.0 (https://github.com/xc0d3rz/npm-gtranslator)
 * Copyright 2016-2017 xc0d3rz(x.c0d3rz000@gmail.com)
 * Licensed under the MIT license
 */
(function () {
    var GTranslator = function () {
        this.settings.params = deepExtend(this.settings.params, arguments[0]);
        if (typeof arguments[1] == "function") {
            this.success = arguments[1];
        }
        if (typeof arguments[2] == "function") {
            this.error = arguments[2];
        }
        this.request();
    };

    /**
     *
     * @param out
     * @returns {*|{}}
     * @copyright http://youmightnotneedjquery.com/
     */
    var deepExtend = function (out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];

            if (!obj)
                continue;

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object')
                        out[key] = deepExtend(out[key], obj[key]);
                    else
                        out[key] = obj[key];
                }
            }
        }

        return out;
    };

    /**
     *
     * @type {{host: string, path: string, method: string, params: {sl: string, tl: string, dt: string, q: string, client: string, ie: string, oe: string}}}
     */
    GTranslator.prototype.settings = {
        host: "https://translate.googleapis.com/translate_a/",
        path: "single",
        method: "GET",
        params: {
            sl: "auto",
            tl: "fr",
            dt: "t",
            q: "",
            client: "gtx",
            ie: "UTF-8",
            oe: "UTF-8"
        }

    };
    /**
     *
     * @param data
     * @returns {string}
     * copyright http://stackoverflow.com/a/111545
     */
    GTranslator.prototype.encodeQueryData = function (data) {
        var ret = [];
        for (var d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    };
    /**
     *
     * @returns {string}
     */
    GTranslator.prototype.beforeSend = function () {
        return this.settings.host + this.settings.path + "?" + this.encodeQueryData(this.settings.params);
    };
    /**
     *
     * @returns {Arguments}
     */
    GTranslator.prototype.success = function () {
        return arguments
    };
    /**
     *
     * @returns {boolean}
     */
    GTranslator.prototype.error = function () {
        console.error.apply(this, arguments);
        return false;
    };
    /**
     * Request Maker!
     */
    GTranslator.prototype.request = function () {
        var
            request = require("request"),
            gtranslator = this;
        request({
            url: gtranslator.beforeSend(),
            method: gtranslator.settings.method,
            headers: {"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36"}
        }, function (err, res, body) {
            if (!err && res.statusCode >= 200 && res.statusCode < 400) {
                var result = JSON.parse(body), args = {};
                if (result.length > 0) {
                    if (result[0].length > 0 && result[0][0].length > 0) {
                        args = {res: result[0][0][0], sl: result[2]};
                    }
                }
                gtranslator.success(args);
            }
        })
            .on("error", this.error);
    };
    module.exports = GTranslator;

}.call(this));
