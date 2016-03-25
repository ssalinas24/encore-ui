/* jshint node: true */

describe('rxNestedElement', function () {
    var subject, result;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function (rxNestedElement) {
            subject = rxNestedElement;
        });
    });

    it('should return a function', function () {
        expect(subject).to.be.a.function;
    });

    describe('result when called without options', function () {
        beforeEach(function () {
            result = subject();
        });

        it('should be an object', function () {
            expect(result).to.be.an.object;
        });

        it('should define "controller"', function () {
            expect(result.controller).to.be.defined;
        });

        it('should not define "link"', function () {
            expect(result.link).to.not.be.defined;
        });

        it('should define "restrict"', function () {
            expect(result.restrict).to.be.defined;
        });

        it('should restrict "E"', function () {
            expect(result.restrict).to.eq('E');
        });

        it('should not define "require"', function () {
            expect(result.require).to.not.be.defined;
        });
    });

    describe('result when called with options', function () {
        var opts = {
            parent: 'foobar',
            // yes, this isn't valid with angular
            // but we're only testing if it overrides the default
            restrict: 'Z'
        };

        beforeEach(function () {
            result = subject(opts);
        });

        it('should restrict "Z"', function () {
            expect(result.restrict).to.eq('Z');
        });

        it('should define "require"', function () {
            expect(result.require).to.be.defined;
        });

        it('should have expected require', function () {
            expect(result.require).to.eq('^foobar');
        });

        it('should define "link"', function () {
            expect(result.link).to.be.defined;
        });

        it('should define "link" as a function', function () {
            expect(result.link).to.be.a.function;
        });
    });
});
