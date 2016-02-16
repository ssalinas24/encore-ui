/* jshint node: true */
describe('quarks:Auth', function () {
    var auth, identity, permission, session, token;

    token = {
        'access': { 'token': { 'id': 'somecrazyid', 'expires': '2014-03-20T19:47:36.711Z',
        'tenant': { 'id': '655062', 'name': '655062' }, 'RAX-AUTH:authenticatedBy': ['PASSWORD'] }}
    };

    beforeEach(function () {
        module('encore.ui.quarks');

        inject(function ($injector) {
            permission = $injector.get('Permission');
            session = $injector.get('Session');
            identity = $injector.get('Identity');

            identity.loginWithJSON = sinon.stub().returns(token);
            session.getToken = sinon.stub().returns(token);
            session.storeToken = sinon.stub();
            session.logout = sinon.stub();
            session.isCurrent = sinon.stub().returns(true);
            session.isAuthenticated = sinon.stub().returns(true);
            permission.getRoles = sinon.stub().returns([{ 'name': 'admin' }]);

            auth = $injector.get('Auth');
        });
    });

    describe('service:Auth', function () {
        it('login() should get a token', function () {
            var result = auth.login({ username: 'bruce.wayne', password: 'batmanRulez' });
            expect(result.access).not.be.empty;
            expect(identity.loginWithJSON).to.be.called;
        });

        it('loginWithJSON() should get a token', function () {
            var result = auth.loginWithJSON({ username: 'bruce.wayne', apiToken: '1-800-BAT-MANN' });
            expect(result.access).not.be.empty;
            expect(identity.loginWithJSON).to.be.called;
        });

        it('getToken() should return a token', function () {
            var result = auth.getToken();
            expect(result).not.be.empty;
            expect(result.access).not.be.empty;
            expect(session.getToken).to.be.called;
        });

        it('storeToken() should store a token', function () {
            auth.storeToken(token);
            expect(session.storeToken).to.be.called;
        });

        it('logout() should log off user via session.logout', function () {
            auth.logout();
            expect(session.logout).to.be.called;
        });

        it('isCurrent() should check token via session.isCurrent', function () {
            expect(auth.isCurrent()).to.be.true;
            expect(session.isCurrent).to.be.called;
        });

        it('isAuthenticated() should check token via session.isAuthenticated', function () {
            expect(auth.isAuthenticated()).to.be.true;
            expect(session.isAuthenticated).to.be.called;
        });

        it('getRoles() should retrieve user roles via permission.getRoles', function () {
            expect(auth.getRoles().length).to.eq(1);
            expect(permission.getRoles).to.be.called;
        });

        it('hasRole() should validate user has role via permission.hasRole', function () {
            expect(auth.hasRole('admin')).to.be.true;
            expect(auth.hasRole('fakeRole')).to.be.false;
            expect(permission.getRoles).to.be.called;
        });
    });
});
