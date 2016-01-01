'use strict';

var VM = require('../../app/js/vm');

describe('VM', function () {
    describe('Internal methods', function () {
        describe('Check division by zero', function () {
            it('throws an error only if given a zero value', function () {
                expect(function () {
                    VM.__checkDivByZero(0);
                }).to.throw(/division by zero/i);

                expect(function () {
                    VM.__checkDivByZero(1);
                }).not.to.throw(Error);
            });
        });
    });

    describe('System methods', function () {
        it('logs a message and emits an event', sinon.test(function () {
           this.stub(console, 'log');
           let spy = this.spy();
           VM.on('log', spy);

           VM.log('Waka waka');

           expect(console.log.calledWith('Waka waka')).to.be.true;
           expect(spy.calledOnce).to.be.true;
        }));
    });
});
