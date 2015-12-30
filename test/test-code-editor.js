'use strict';

var Editor = require('../app/js/code-editor.js');

describe('Code editor', function () {
    beforeEach(function () {
        // create editor DOM
        let editorEl = document.createElement('div');
        editorEl.innerHTML = `
            <form data-qa="source"><textarea></textarea></form>
            <form data-qa="console"><textarea></textarea></form>`;
        this.root.appendChild(editorEl);

        this.editor = new Editor(
            editorEl.querySelector('[data-qa=source]'),
            editorEl.querySelector('[data-qa=console]'));
    });

    it('logs a message in output element', function () {
        this.editor.logMessage('Waka waka');
        expect(this.editor.outputEl.value).to.equal('Waka waka\n');
    });

    it('clears the console', function () {
        this.editor.outputEl.value = 'Wiii';
        this.editor.clearConsole();
        expect(this.editor.outputEl.value).to.be.empty;
    });

    it('loads a default program', sinon.test(function () {
       this.stub(localStorage, 'getItem').returns(undefined);
       this.editor.inputEl.value = '';
       let editor = new Editor(this.editor.sourceEl, this.editor.consoleEl);
       expect(editor.inputEl.value).not.to.be.empty;
    }));

    it('loads a previously saved program', sinon.test(function () {
        this.stub(localStorage, 'getItem').returns('Waka waka');
        this.editor.inputEl.value = '';
        let editor = new Editor(this.editor.sourceEl, this.editor.consoleEl);
        expect(editor.inputEl.value).to.equal('Waka waka');
    }));
});
