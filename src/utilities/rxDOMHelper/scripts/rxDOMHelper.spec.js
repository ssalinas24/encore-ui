/* jshint node: true */

describe('rxDOMHelper', function () {
    var rxjq;

    var windowMock = {
        getComputedStyle: sinon.stub()
            .returns({ width: '10px', height: '20px' })
    };

    beforeEach(function () {
        module('encore.ui.utilities');

        module(function ($provide) {
            $provide.value('$window', windowMock);
        });

        inject(function (rxDOMHelper) {
            rxjq = rxDOMHelper;
        });
    });

    it('should accept raw DOM objects', function () {
        var div = angular.element('<div></div>'),
            raw = div[0];

        rxjq.width(raw);
        expect(windowMock.getComputedStyle).to.have.been.calledWith(raw);
    });

    it('should accept jquery lite objects and convert them to raw DOM', function () {
        var div = angular.element('<div></div>'),
            raw = div[0];

        rxjq.width(div);
        expect(windowMock.getComputedStyle).to.have.been.calledWith(raw);
    });

    it('should allow query selectors for finding nested objects', function () {
        var el = angular.element('<div><span><h1 class="my-title">Title!</h1></span></div>'),
            title = rxjq.find(el, '.my-title');

        expect(title.text()).to.equal('Title!');
        expect(title[0].nodeName).to.equal('H1');
    });

    it('should wrap a single element', function () {
        var span = $('<span class="hi">Test</span>');
        var div = $('<div></div>');
        rxjq.wrapAll(div[0], span[0]);
        expect(div.find('span').text()).to.equal('Test');
        expect(div.find('span').hasClass('hi')).to.be.true;
    });

    it('should wrap embedded elements', function () {
        var span = $('<span class="hi"><span class="foo">Test</span></span>');
        var div = $('<div></div>');
        rxjq.wrapAll(div[0], span[0]);
        expect(div.find('span.hi span.foo').text()).to.equal('Test');
        expect(div.find('span.hi span.foo').hasClass('foo')).to.be.true;
    });

    it('should work for select elements', function () {
        var select = $('<select><option class="foo">Foo</option><option class="bar">Bar</option></select>');
        var div = $('<div></div>');
        rxjq.wrapAll(div[0], select[0]);
        expect(div.find('select > option.foo').text()).to.equal('Foo');
        expect(div.find('select > option.foo').hasClass('foo')).to.be.true;
        expect(div.find('select > option.bar').text()).to.equal('Bar');
        expect(div.find('select > option.bar').hasClass('bar')).to.be.true;
    });
});
