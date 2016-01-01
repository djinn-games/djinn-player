var proxiquire = require('proxyquireify')(require);

var Editor = proxiquire('../app/js/code-editor.js', {
    'djinn-parser': function CompilerStub () {}
});

describe('Code editor', function () {
    'use strict';
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

    it('logs compiler errors', sinon.test(function () {
        this.stub(this.editor._compiler, 'compile').throws('Line 42 random error');
        let spy = this.spy(this.editor, 'logMessage');

        this.editor.runProgram('');
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(sinon.match(/line 42/i))).to.be.true;
    }));
});
