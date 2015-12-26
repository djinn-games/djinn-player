'use strict';

var Editor = require('./code-editor.js');

window.onload = function () {
    console.log('djinn 0.0.1');

    var editor = new Editor(
        document.getElementById('code-editor'),
        document.getElementById('console'));
};
