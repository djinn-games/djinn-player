'use strict';

let internal = {};

internal.__checkDivByZero = function (x) {
    if (x === 0) {
        throw new Error('Division by zero');
    }

    return x;
};


module.exports = internal;
