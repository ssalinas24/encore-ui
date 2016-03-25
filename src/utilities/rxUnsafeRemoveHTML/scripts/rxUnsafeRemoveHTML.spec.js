/* jshint node: true */
describe('rxUnsafeRemoveHTML', function () {
    var unsafeRemove;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function ($filter) {
            unsafeRemove = $filter('rxUnsafeRemoveHTML');
        });
    });

    it('should strip HTML tags from the title', function () {
        var title = 'New Title <span>Alpha</span>';
        var expectedTitle = 'New Title Alpha';

        expect(unsafeRemove(title)).to.equal(expectedTitle);
    });

    it('should protect against null input', function () {
        expect(unsafeRemove(null)).to.equal('');
    });

    it('should strip attributes from HTML tags', function () {
        var title = 'New Title <span class="foo">Alpha</span>';
        var expectedTitle = 'New Title Alpha';

        expect(unsafeRemove(title)).to.equal(expectedTitle);
    });

    it('should handle escaped characters', function () {
        var title = 'New Title <span class="foo">&lt;Alpha&gt;</span>';
        var expectedTitle = 'New Title <Alpha>';

        expect(unsafeRemove(title)).to.equal(expectedTitle);
    });

    it('should strip deeply nested HTML tags', function () {
        var input = '<div><span>Hello <div><div>World</div></div></span>!</div>';
        var expected = 'Hello World!';
        expect(unsafeRemove(input)).to.equal(expected);
    });
});
