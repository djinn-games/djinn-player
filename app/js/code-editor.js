var DjinnCompiler = require('djinn-parser');

var DEFAULT_PRG =
`PROGRAM hello
BEGIN
    log("Hello, World!")
END
`;

var compiler = new DjinnCompiler();
window.DJINN = require('./vm');

function Editor(sourceEl, consoleEl) {
    this.sourceEl = sourceEl;
    this.consoleEl = consoleEl;

    this.inputEl = sourceEl.querySelector('textarea');
    this.outputEl = consoleEl.querySelector('textarea');

    var storedSrc = localStorage.getItem('source');
    this.inputEl.value = storedSrc || DEFAULT_PRG;

    this.sourceEl.addEventListener('submit', function (evt) {
        evt.preventDefault();
        localStorage.setItem('source', this.inputEl.value);
        this.runProgram(this.inputEl.value);
    }.bind(this));

    this.consoleEl.addEventListener('submit', function (evt) {
        evt.preventDefault();
        this.clearConsole();
    }.bind(this));

    DJINN.on('log', this.logMessage.bind(this));
}

Editor.prototype.runProgram = function (source) {
    var jsCode = compiler.compile(source);
    this.clearConsole();
    DJINN.run(jsCode);
};

Editor.prototype.logMessage = function (msg) {
    this.outputEl.value += `${msg}\n`;
};

Editor.prototype.clearConsole = function () {
    this.outputEl.value = '';
};


module.exports = Editor;
