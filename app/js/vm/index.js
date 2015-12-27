'use strict';

var EventEmitter = require('events');
var _ = require('lodash');

let VM = {};

VM.emitter = new EventEmitter();

VM.run = function (source) {
    /*jshint -W061 */
    eval(source);
    /*jshint +W061 */
};

VM.on = function (evt, callback) {
    this.emitter.on(evt, callback);
};

VM.emit = function () {
    this.emitter.emit.apply(this.emitter, arguments);
};

// plug in functions
_.extend(VM, require('./internal.js'));
_.extend(VM, require('./sys.js'));

module.exports = VM;
