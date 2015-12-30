'use strict';

require('./test-code-editor.js');
require('./vm/');

beforeEach(function () {
    this.root = document.createElement('div');
    this.root.id = 'test';
    document.body.appendChild(this.root);
});

afterEach(function () {
    this.root.parentNode.removeChild(this.root);
});
