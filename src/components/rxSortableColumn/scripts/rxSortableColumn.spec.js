describe('rxSortableColumn', function () {
    var scope, compile, el;
    var validTemplate = '<rx-sortable-column reverse="false">Yo!</rx-sortable-column>';

    beforeEach(function () {
        // load module
        module('encore.ui.rxSortableColumn');

        // load templates
        module('templates/rxSortableColumn.html');

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });

        el = helpers.createDirective(validTemplate, compile, scope);
    });

    afterEach(function () {
        el = null;
    });

    it('should render template correctly', function () {
        expect(el).not.be.empty;
        expect(el.find('div')).not.be.empty;
        expect(el.find('div').text()).to.contain('Yo!');
        expect(el.find('i')).not.be.empty;
        expect(el.find('i').hasClass('bg')).to.be.true;
    });
});
