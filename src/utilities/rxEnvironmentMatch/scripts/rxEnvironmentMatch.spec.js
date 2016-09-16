describe('rxEnvironmentMatch', function () {
    var urlMatch, _location, setUrl;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function ($filter, Environment, $location) {
            urlMatch = $filter('rxEnvironmentMatch');
            _location = $location;

            setUrl = function (url) {
                sinon.stub(_location, 'absUrl').returns(url);
            };
        });
    });

    describe('unified-preprod', function () {
        it('should match for staging.encore', function () {
            // override current environment
            setUrl('https://staging.encore.rackspace.com');
            expect(urlMatch('unified-preprod'), 'staging.encore.rackspace.com').to.be.true;
            expect(urlMatch('!unified-preprod'), 'negate staging.encore.rackspace.com').to.be.false;
        });

        it('should match for preprod.encore', function () {
            setUrl('https://preprod.encore.rackspace.com');
            expect(urlMatch('unified-preprod'), 'preprod.encore.rackspace.com').to.be.true;
            expect(urlMatch('!unified-preprod'), 'negate preprod.encore.rackspace.com').to.be.false;
        });

        it('should not match for encore.rackspace.com', function () {
            setUrl('https://encore.rackspace.com');
            expect(urlMatch('unified-preprod'), 'encore.rackspace.com').to.be.false;
            expect(urlMatch('!unified-preprod'), 'negate encore.rackspace.com').to.be.true;
        });

        it('should not match for localhost', function () {
            setUrl('https://localhost:9000/foo/bar');
            expect(urlMatch('unified-preprod'), 'localhost').to.be.false;
            expect(urlMatch('!unified-preprod'), 'negate localhost').to.be.true;
        });
    });

    describe('preprod', function () {
        it('should match for preprod.encore', function () {
            setUrl('https://preprod.encore.rackspace.com');
            expect(urlMatch('preprod'), 'preprod.encore.rackspace.com').to.be.true;
            expect(urlMatch('!preprod'), 'negate preprod.encore.rackspace.com').to.be.false;
        });

        it('should not match for staging.encore', function () {
            // override current environment
            setUrl('https://staging.encore.rackspace.com');
            expect(urlMatch('preprod'), 'staging.encore.rackspace.com').to.be.false;
            expect(urlMatch('!preprod'), 'negate staging.encore.rackspace.com').to.be.true;
        });

        it('should not match for encore.rackspace.com', function () {
            setUrl('https://encore.rackspace.com');
            expect(urlMatch('preprod'), 'encore.rackspace.com').to.be.false;
            expect(urlMatch('!preprod'), 'encore.rackspace.com').to.be.true;
        });

        it('should not match for localhost', function () {
            setUrl('https://localhost:9000/foo/bar');
            expect(urlMatch('preprod'), 'localhost').to.be.false;
            expect(urlMatch('!preprod'), 'localhost').to.be.true;
        });
    });

    describe('local', function () {
        it('should not match for preprod.encore', function () {
            setUrl('https://preprod.encore.rackspace.com');
            expect(urlMatch('local'), 'preprod.encore.rackspace.com').to.be.false;
            expect(urlMatch('!local'), 'negate preprod.encore.rackspace.com').to.be.true;
        });

        it('should not match for staging.encore', function () {
            // override current environment
            setUrl('https://staging.encore.rackspace.com');
            expect(urlMatch('local'), 'staging.encore.rackspace.com').to.be.false;
            expect(urlMatch('!local'), 'negate staging.encore.rackspace.com').to.be.true;
        });

        it('should not match for encore.rackspace.com', function () {
            setUrl('https://encore.rackspace.com');
            expect(urlMatch('local'), 'encore.rackspace.com').to.be.false;
            expect(urlMatch('!local'), 'negate encore.rackspace.com').to.be.true;
        });

        it('should match for localhost', function () {
            setUrl('https://localhost:9000/foo/bar');
            expect(urlMatch('local'), 'localhost').to.be.true;
            expect(urlMatch('!local'), 'negate localhost').to.be.false;
        });
    });

    describe('production', function () {
        it('should not match for preprod.encore', function () {
            setUrl('https://preprod.encore.rackspace.com');
            expect(urlMatch('unified-prod'), 'preprod.encore.rackspace.com').to.be.false;
            expect(urlMatch('!unified-prod'), 'negate preprod.encore.rackspace.com').to.be.true;
        });

        it('should not match for staging.encore', function () {
            // override current environment
            setUrl('https://staging.encore.rackspace.com');
            expect(urlMatch('unified-prod'), 'staging.encore.rackspace.com').to.be.false;
            expect(urlMatch('!unified-prod'), 'negate staging.encore.rackspace.com').to.be.true;
        });

        it('should match for encore.rackspace.com', function () {
            setUrl('https://encore.rackspace.com');
            expect(urlMatch('unified-prod'), 'encore.rackspace.com').to.be.true;
            expect(urlMatch('!unified-prod'), 'negate encore.rackspace.com').to.be.false;
        });

        it('should not match for localhost', function () {
            setUrl('https://localhost:9000/foo/bar');
            expect(urlMatch('unified-prod'), 'localhost').to.be.false;
            expect(urlMatch('!unified-prod'), 'negate localhost').to.be.true;
        });
    });

    describe('unified', function () {
        it('should match for preprod.encore', function () {
            setUrl('https://preprod.encore.rackspace.com');
            expect(urlMatch('unified'), 'preprod.encore.rackspace.com').to.be.true;
            expect(urlMatch('!unified'), 'negate preprod.encore.rackspace.com').to.be.false;
        });

        it('should match for staging.encore', function () {
            // override current environment
            setUrl('https://staging.encore.rackspace.com');
            expect(urlMatch('unified'), 'staging.encore.rackspace.com').to.be.true;
            expect(urlMatch('!unified'), 'negate staging.encore.rackspace.com').to.be.false;
        });

        it('should match for encore.rackspace.com', function () {
            setUrl('https://encore.rackspace.com');
            expect(urlMatch('unified'), 'encore.rackspace.com').to.be.true;
            expect(urlMatch('!unified'), 'negate encore.rackspace.com').to.be.false;
        });

        it('should not match for localhost', function () {
            setUrl('https://localhost:9000/foo/bar');
            expect(urlMatch('unified'), 'localhost').to.be.false;
            expect(urlMatch('!unified'), 'negate localhost').to.be.true;
        });
    });
});
