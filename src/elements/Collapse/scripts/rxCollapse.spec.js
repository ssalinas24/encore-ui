describe('rxCollapse', function () {
    var scope, compile, el, elCollapsed, elExanded;
    var validTemplate = '<rx-collapse title="Filter results"></rx-collapse>';
    var otherTemplate1 = '<rx-collapse expanded="false"></rx-collapse>';
    var otherTemplate2 = '<rx-collapse expanded="true"></rx-collapse>';

    beforeEach(function () {
        // load module
        module('encore.ui.elements');

        // load templates
        module('templates/rxCollapse.html');

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });

        el = helpers.createDirective(validTemplate, compile, scope);
        elCollapsed = helpers.createDirective(otherTemplate1, compile, scope);
        elExanded = helpers.createDirective(otherTemplate2, compile, scope);
    });

    it('should render template', function () {
        expect(el).to.not.be.empty;
        expect(el.find('rx-collapse')).to.not.be.empty;
    });

    it('should expand and collapse', function () {
        expect(el.find('.double-chevron-cell').hasClass('expanded')).to.be.true;

        el.find('.double-chevron').click();
        expect(el.find('.double-chevron-cell').hasClass('expanded')).to.be.false;
    });

    it('should show custom title', function () {
        expect(el.find('.rx-collapse-title').text()).to.equal('Filter results');
    });

    it('should show See Less as default title', function () {
        expect(elExanded.find('.toggle-title').text()).to.equal('See Less');
    });

    it('should show See More as the title', function () {
        expect(elCollapsed.find('.toggle-title').text()).to.equal('See More');
    });

    it('should show down chevron when not expanded and show up when expanded', function () {
        expect(elCollapsed.find('.fa').hasClass('fa-angle-double-up')).to.be.false;

        elCollapsed.find('.sml-title').click();
        expect(elCollapsed.find('.fa').hasClass('fa-angle-double-up')).to.be.true;
    });
});
