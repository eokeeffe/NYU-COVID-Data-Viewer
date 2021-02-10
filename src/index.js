"use strict";

const sqlite3 = require("sqlite3");
const reverse = require("./reverse");
const find = require("./location").find;

const Geocoder = function (options) {
    this.options = options || {};

    if (!this.options.database) {
        this.options.database = `${__dirname}/../data/db.sqlite`;
    }

    this.db = new sqlite3.Database(this.options.database, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            err.message = `Failed to open ${this.options.database}\n${(err.message || "")}`;
            throw err;
        }
    });
};

Geocoder.prototype.reverse = function (latitude, longitude) {
    return reverse(this, latitude, longitude);
};

Geocoder.prototype.location = function () {
    return {
        find: (locationId) => find(this, locationId)
    };
};

module.exports = Geocoder;
