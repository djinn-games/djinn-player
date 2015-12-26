let sys = {};

sys.log = function (msg) {
    console.log(msg);
    this.emit('log', msg);
};

module.exports = sys;
