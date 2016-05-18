describe('utilities:rxModalFooterTemplates', function () {
    var rxModalFooterTemplates;

    function wrap (html) {
        return _.template('<div ng-switch="state">${html}</div>', {
            html: html
        });
    }

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function (_rxModalFooterTemplates_) {
            rxModalFooterTemplates = _rxModalFooterTemplates_;
        });
    });

    _.each(['local', 'global'], function (type) {
        it('should store the templates of ' + type + ' states', function () {
            var fooHtml = '<div>foo</div>';
            rxModalFooterTemplates.add('test', fooHtml, { global: type === 'global' });
            expect(rxModalFooterTemplates.flush()).to.equal(wrap(fooHtml));
        });
    });

    it('should concatenate multiple templates', function () {
        var fooHtml = '<div>foo</div>';
        var barHtml = '<div>bar</div>';
        rxModalFooterTemplates.add('foo', fooHtml, { global: false });
        rxModalFooterTemplates.add('bar', barHtml, { global: false });
        expect(rxModalFooterTemplates.flush()).to.equal(wrap(fooHtml + barHtml));
    });

    it('should overwrite global states with local ones', function () {
        var state = 'test';
        var globalHtml = '<div>foo</div>';
        var localHtml = '<div>bar</div>';
        rxModalFooterTemplates.add(state, globalHtml, { global: true });
        rxModalFooterTemplates.add(state, localHtml, { global: false });
        expect(rxModalFooterTemplates.flush()).to.equal(wrap(localHtml));
    });
});
