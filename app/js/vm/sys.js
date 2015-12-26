let sys = {};

sys.log = function (msg) {
    console.log(msg);
    this.emit('log', msg);
    return msg;
};

module.exports = sys;
