var DEFAULT_PRG =
`PROGRAM hello
BEGIN
    print("Hello, World!")
END
`;

function Editor(sourceEl, consoleEl) {
    this.sourceEl = sourceEl;
    this.consoleEl = consoleEl;

    this.inputEl = sourceEl.querySelector('textarea');

    var storedSrc = localStorage.getItem('source');
    this.inputEl.value = storedSrc || DEFAULT_PRG;

    this.sourceEl.addEventListener('submit', function (evt) {
        evt.preventDefault();
        localStorage.setItem('source', this.inputEl.value)
        this.runProgram(this.inputEl.value)
    }.bind(this));
}

Editor.prototype.runProgram = function () {

};


module.exports = Editor;
