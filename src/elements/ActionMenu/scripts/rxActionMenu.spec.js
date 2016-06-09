describe('rxActionMenu', function () {
    describe('directive:rxActionMenu', function () {
        var el, scope, compile, document;

        beforeEach(function () {
            // load module
            module('encore.ui.elements');

            // load templates
            module('templates/rxActionMenu.html');

            // Inject in angular constructs
            inject(function ($rootScope, $compile, $templateCache, $document) {
                compile = $compile;
                document = $document;
                scope = $rootScope.$new();
            });
        });

        describe('(hideable is true)', function () {
            beforeEach(function () {
                var hideableTemplate = '<rx-action-menu></rx-action-menu>';
                el = helpers.createDirective(hideableTemplate, compile, scope);
            });

            it('should display action list when cog is clicked', function () {
                var cog = el.find('i').eq(0);
                helpers.clickElement(cog[0]);

                // "displayed" property should now be true
                expect(cog.scope().displayed).to.be.true;

                // action list div within template should be displayed
                var div = el.find('div.action-list').eq(0);
                // action list use should custom style for hidable lists
                expect(div.hasClass('action-list-hideable')).to.be.true;
                expect(div.hasClass('ng-hide')).to.be.false;
            });

            it('should show cog but hide action list', function () {
                // cog element should be displayed
                var cog = el.find('i.fa-cog').eq(0);
                expect(cog.hasClass('ng-hide'), 'hide').to.be.false;

                // "displayed" property should be false by default
                expect(cog.scope().displayed).to.be.false;

                // action list div within template should not be displayed
                var div = el.find('div.action-list').eq(0);
                expect(div.hasClass('ng-hide')).to.be.true;
            });

            it('should hide action list when cog is clicked a second time', function () {
                var cog = el.find('i').eq(0);
                helpers.clickElement(cog[0]);
                helpers.clickElement(cog[0]);

                // "displayed" property should now be true
                expect(cog.scope().displayed).to.be.false;

                // action list div within template should be displayed
                var div = el.find('div.action-list').eq(0);
                expect(div.hasClass('ng-hide')).to.be.true;
            });
        });

        describe('(two hideables, both true)', function () {
            beforeEach(function () {
                var hideableTemplate =  '<rx-action-menu></rx-action-menu>' +
                                        '<rx-action-menu></rx-action-menu>';
                el = helpers.createDirective(hideableTemplate, compile, scope);
            });

            it('should only show one action list at a time when cogs in two places are clicked', function () {
                var firstCog = el.find('i').eq(0);
                var secondCog = el.find('i').eq(1);
                helpers.clickElement(firstCog[0]);
                helpers.clickElement(secondCog[0]);

                expect(firstCog.scope().displayed).to.be.false;
                expect(secondCog.scope().displayed).to.be.true;

                // action list div within template should be displayed
                var div = el.find('div.action-list').eq(0);
                expect(div.hasClass('ng-hide')).to.be.true;
                div = el.find('div.action-list').eq(1);
                expect(div.hasClass('ng-hide')).to.be.false;
            });
        });

        describe('allow document dismiss ', function () {
            beforeEach(function () {
                var template = '<rx-action-menu hideable="true"></rx-action-menu>';
                el = helpers.createDirective(template, compile, scope);
            });

            it('should hide actions when we click anywhere else on document', function () {
                var cog = el.find('i').eq(0);
                helpers.clickElement(cog[0]);
                expect(cog.scope().displayed).to.be.true;

                $(document).click();

                expect(cog.scope().displayed).to.be.false;
            });
        });

        describe('disallow global document dismiss', function () {
            beforeEach(function () {
                var template = '<rx-action-menu global-dismiss="false"></rx-action-menu>';
                el = helpers.createDirective(template, compile, scope);
            });

            it('should hide actions when we click anywhere else on document', function () {
                var cog = el.find('i').eq(0);
                helpers.clickElement(cog[0]);
                expect(cog.scope().displayed).to.be.true;

                $(document).click();

                expect(cog.scope().displayed).to.be.true;
            });
        });
    });
});
