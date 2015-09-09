/* jshint node: true */

describe('rxNotify', function () {
    var scope, compile, rootScope, el, el2, notifySvc, interval;
    var validTemplate = '<rx-notifications></rx-notifications>';
    var messageText1 = 'My Message 1';
    var messageText2 = 'My Message 2';
    var defaultStack = 'page';
    var otherStack = 'other';

    beforeEach(function () {
        // load module
        module('encore.ui.rxNotify');
        module('encore.ui.rxSpinner');

        // load templates
        module('templates/rxNotifications.html');
        module('templates/rxNotification.html');

        // Inject in angular constructs
        inject(function ($rootScope, $compile, $interval, rxNotify) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
            notifySvc = rxNotify;
            interval = $interval;
        });

        el = helpers.createDirective(validTemplate, compile, scope);
    });

    afterEach(function () {
        el = null;
    });

    describe('Service: rxNotify', function () {
        it('should add to default stack', function () {
            // create message w/o an options
            notifySvc.add(messageText1);

            // expect message to be first in page stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);
        });

        it('should not add message if `text` is empty', function () {
            // create message w/o text
            notifySvc.add('');

            // validate message not added
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            // test that if someone really wants an empty message, they can get it
            // create message w/ a single space
            notifySvc.add(' ');

            // validate message added
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);
        });

        it ('should not add message if `repeat` is false and message already in stack', function () {
            //create message w text
            notifySvc.add(messageText1, { repeat: false });

            // expect message to be first in page stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);

            // create another message w same text
            notifySvc.add(messageText1, { repeat: false });

            // expect stack to only have one message
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);
        });

        it ('should treat messages with same text and different types as different', function () {
            //create message w text
            notifySvc.add(messageText1, { repeat: false, type: 'error' });

            // expect message to be first in page stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);

            // create another message w same text
            notifySvc.add(messageText1, { repeat: false });

            // expect stack to only have one message
            expect(notifySvc.stacks[defaultStack].length).to.equal(2);
        });

        it('should add unique id to message and return it on add', function () {
            // create message
            var msg = notifySvc.add(messageText1);

            // expect message to be first in page stack
            expect(notifySvc.stacks[defaultStack][0].id).to.eql(msg.id);
        });

        it('should allow type specification', function () {
            var defaultType = 'info';

            // create message with no type
            notifySvc.add(messageText1);

            // validate message in stack of default type
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);
            expect(notifySvc.stacks[defaultStack][0].type).to.equal(defaultType);

            // create message with different type
            var messageType = 'warning';
            notifySvc.add(messageText2, {
                type: messageType
            });

            // validate message in stack of type
            expect(notifySvc.stacks[defaultStack][1].text).to.equal(messageText2);
            expect(notifySvc.stacks[defaultStack][1].type).to.equal(messageType);
        });

        it('should add to new stack', function () {
            // create message w/specified stack
            notifySvc.add(messageText1, {
                stack: otherStack
            });

            // validate message in new stack
            expect(notifySvc.stacks[otherStack][0].text).to.equal(messageText1);

            // validate message not in default stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should delete old messages from stack on clear', function () {
            // add message to default stack
            notifySvc.add(messageText1);

            // add message to different stack
            notifySvc.add(messageText2, {
                stack: otherStack
            });

            // validate messages in stacks
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);
            expect(notifySvc.stacks[otherStack][0].text).to.equal(messageText2);

            // run 'clear' method
            notifySvc.clear(defaultStack);

            // validate first message not in default stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            // validate other message still on other stack
            expect(notifySvc.stacks[otherStack][0].text).to.equal(messageText2);
        });

        it('should not throw errors when clearing non existent stacks', function () {
            // validate clear not throw error on non existent stack
            var clearNonexistent = function () {
                notifySvc.clear('nonexistent');
            };

            var clearExistent = function () {
                notifySvc.clear(defaultStack);
            };

            expect(notifySvc.stacks[defaultStack]).to.be.an.array;
            expect(notifySvc.stacks.nonexistent).to.be.undefined;
            expect(clearNonexistent).to.not.throw(Error);
            expect(clearExistent).to.not.throw(Error);
        });

        it('should be dismissable', function () {
            // add message to be dismissed
            var msg = notifySvc.add(messageText1);

            // add other message
            notifySvc.add(messageText2);

            // validate both in stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);
            expect(notifySvc.stacks[defaultStack][1].text).to.equal(messageText2);

            // run 'dismiss' method passing in message id
            notifySvc.dismiss(msg);

            // wait until before timeout
            interval.flush(650);

            // validate dismissed message not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);

            // validate other message is still in stack and in first position
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText2);
        });

        it('should fire ondismiss function if set', function () {
            // add message to be dismissed
            var dismissedResultA = false;
            var dismissedResultB = false;

            var msg = notifySvc.add(messageText1, {
                ondismiss: function () {
                    dismissedResultA = true;
                }
            });

            // add other message
            notifySvc.add(messageText2, {
                ondismiss: function () {
                    dismissedResultB = true;
                }
            });

            // run 'dismiss' method passing in message id
            notifySvc.dismiss(msg);

            // wait until before timeout
            interval.flush(650);

            // validate dismissed message not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);

            // validate other message is still in stack and in first position
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText2);

            // validate ondismiss only ran for A, not B
            expect(dismissedResultA).to.be.true;
            expect(dismissedResultB).to.be.false;
        });

        it('should disappear after a timeout', function () {
            // add message w/ 1 second timeout
            notifySvc.add(messageText1, {
                timeout: 1
            });

            // wait until before timeout
            interval.flush(650);

            // validate still in stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);

            // wait until after timeout
            interval.flush(650);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should wait until shown to start timeout', function () {
            // add message w/ 1 second timeout and show on route change
            notifySvc.add(messageText1, {
                timeout: 1,
                show: 'next'
            });

            // wait until timeout expires (if it were shown immediately)
            interval.flush(1500);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            // simulate route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate now in stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);

            // wait until after timeout
            interval.flush(1001);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should remain if timeout not set', function () {
            // add message w/o timeout
            notifySvc.add(messageText1);

            // flush timeouts crazy amount of time (can't pass in nothing otherwise it throws error)
            interval.flush(100000);

            // validate still in stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(messageText1);
        });

        it('should dismiss on routeChange', function () {
            // add message
            var msg = notifySvc.add(messageText1);

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // simulate route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should only dismiss manually when manual', function () {
            // add message with hide set to 'manual'
            var msg = notifySvc.add(messageText1, {
                dismiss: 'manual'
            });

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // simulate route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate still in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // run 'dismiss' method passing in message id
            notifySvc.dismiss(msg);

            // wait until before timeout
            interval.flush(650);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should dismiss on variable == true', function () {
            // set expression to equal true (showing)
            scope.loaded = false;

            // add message w/ dismiss property
            var msg = notifySvc.add(messageText1, {
                dismiss: [scope, 'loaded']
            });

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // change variable to true
            scope.loaded = true;
            scope.$digest();

            // wait until before timeout
            interval.flush(650);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should dismiss message waiting on scope update if scope destroyed', function () {
            // set expression to equal true (showing)
            scope.loaded = false;

            // add message w/ dismiss property
            var msg = notifySvc.add(messageText1, {
                dismiss: [scope, 'loaded']
            });

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            scope.$destroy();

            // wait until before timeout
            interval.flush(650);

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should show on next on routeChange when set', function () {
            // add message with show set to 'next'
            var msg = notifySvc.add(messageText1, {
                show: 'next'
            });

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            // simulate route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // simulate another route change
            rootScope.$broadcast('$routeChangeSuccess');

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should show on variable == true', function () {
            // set expression to equal false
            scope.error = false;

            // add message w/ show expression
            var msg = notifySvc.add(messageText1, {
                show: [scope, 'error']
            });

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            // change variable to true
            scope.error = true;
            scope.$digest();

            // validate in stack
            expect(notifySvc.stacks[defaultStack][0]).to.eql(msg);

            // simulate a route change to dismiss message
            rootScope.$broadcast('$routeChangeSuccess');

            // validate not in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });
    });

    describe('Directive: rxNotification', function () {
        beforeEach(function () {
            var rxNotificationTemplate = '<rx-notification type="warning">' + messageText1 + '</rx-notification>';
            el2 = helpers.createDirective(rxNotificationTemplate, compile, scope);
        });

        it('should have warning CSS class when setting type attribute to warning', function () {
            // Find the second div and check for class. Why won't it take div.rx-notification?
            var newEl = el2.find('div').eq(1);
            expect(newEl.hasClass('notification-warning')).to.be.true;
        });

        it('should contain the message', function () {
            var newEl = el2.find('span').eq(1);
            expect(newEl.text()).to.contain(messageText1);
        });

        it('should add notification to stack and remove original element', function () {
            var stackTemplate = '<div><rx-notification stack="page" type="info">' + messageText1 +
                                    '</rx-notification></div>';

            // Before compiling this notification, stack should be empty
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
            el2 = helpers.createDirective(stackTemplate, compile, scope);

            // Stack should now have the contents of the notification directive
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);
            expect(notifySvc.stacks[defaultStack][0].type).to.equal('info');
            expect(notifySvc.stacks[defaultStack][0].text).to.contain(messageText1);

            // el2 is now <div></div> and it should have no children
            expect(el2.children().length).to.equal(0);
        });
    });

    describe('Directive: rxNotifications', function () {
        it('should show only from specific stack', function () {
            // add message (to default stack)
            notifySvc.add(messageText1);

            scope.$digest();

            // validate message is shown
            expect(el.text()).to.contain(messageText1);

            // add other message to different stack
            notifySvc.add(messageText2, {
                stack: otherStack
            });

            scope.$digest();

            // validate other message not shown
            expect(el.text()).to.not.contain(messageText2);
        });

        it('should be hidden when no messages available', function () {
            // validate hidden (via class)
            expect(el.hasClass('ng-hide')).to.be.true;
        });

        it('should be dismiss messages via click', function () {
            // add message
            notifySvc.add(messageText1);

            scope.$digest();

            // validate message is shown
            expect(el.text()).to.contain(messageText1);

            // trigger click on element
            helpers.clickElement(el[0].querySelector('.notification-dismiss'));

            // wait until before timeout
            interval.flush(650);

            // validate no longer exists
            expect(el.text()).to.not.contain(messageText1);
        });

        it('should show spinner when loading set', function () {
            // add message
            notifySvc.add(messageText1, {
                loading: true
            });

            scope.$digest();

            // validate message is shown
            expect(el.text()).to.contain(messageText1);

            // validate spinner is shown
            expect(el.find('div').find('div')[0]).to.exist;

            // validate 'dismiss' action not found
            expect(el[0].querySelector('.notification-dismiss')).to.not.exist;
        });
    });

    describe('Service: rxPromiseNotifications', function () {
        var prom, rpn, q;
        var loadingMsg = 'loading';
        var successMsg = 'success';
        var errorMsg = 'error';

        beforeEach(function () {
            inject(function (rxPromiseNotifications, $q) {
                rpn = rxPromiseNotifications;
                q = $q;
            });

            prom = q.defer();
        });

        afterEach(function () {
            prom = null;
        });

        it('should show loading message immediately', function () {
            // create message w/o an options
            rpn.add(prom.promise, {
                loading: loadingMsg
            });

            // expect loading message to be in stack
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(loadingMsg);
            expect(notifySvc.stacks[defaultStack][0].loading).to.equal(true);
        });

        it('should dismiss loading message after promise resolves', function () {
            rpn.add(prom.promise, {
                loading: loadingMsg
            });

            prom.resolve();

            scope.$digest();

            // wait until before timeout
            interval.flush(650);

            // expect loading message to no longer be in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should allow for no loading message to be set', function () {
            rpn.add(prom.promise, {
                success: successMsg
            });

            // expect no messages to be in the stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should show success message after promise is resolved successfully', function () {
            rpn.add(prom.promise, {
                success: successMsg
            });

            prom.resolve();

            scope.$digest();

            // expect success message to be the only thing showing
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(successMsg);
        });

        it('should show error message after promise is rejected', function () {
            rpn.add(prom.promise, {
                error: errorMsg
            });

            prom.reject();

            scope.$digest();

            // expect error message to be the only thing showing
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);
            expect(notifySvc.stacks[defaultStack][0].text).to.equal(errorMsg);
        });

        it('should not show messages if route is changed before promise is resolved', function () {
            rpn.add(prom.promise, {
                loading: loadingMsg,
                success: successMsg
            });

            // expect loading to be showing
            expect(notifySvc.stacks[defaultStack].length).to.equal(1);

            // simulate a route change
            rootScope.$broadcast('$routeChangeStart');

            scope.$digest();

            // wait until before timeout
            interval.flush(650);

            // expect loading message to no longer be in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);

            prom.resolve();

            scope.$digest();

            // expect no messages to be in stack
            expect(notifySvc.stacks[defaultStack].length).to.equal(0);
        });

        it('should show in custom stack', function () {
            rpn.add(prom.promise, {
                loading: loadingMsg,
                error: errorMsg
            }, otherStack);

            expect(notifySvc.stacks[otherStack][0].text).to.equal(loadingMsg);

            prom.reject();

            scope.$digest();

            // wait until before timeout
            interval.flush(650);

            // expect error message to be the only thing showing
            expect(notifySvc.stacks[otherStack].length).to.equal(1);
            expect(notifySvc.stacks[otherStack][0].text).to.equal(errorMsg);
        });

        it('should convert expression to string based on response data', function () {
            rpn.add(prom.promise, {
                loading: loadingMsg,
                error: errorMsg + '{{message}}'
            }, otherStack);

            expect(notifySvc.stacks[otherStack][0].text).to.equal(loadingMsg);

            prom.reject({
                message: 'test'
            });

            scope.$digest();

            // wait until before timeout
            interval.flush(650);

            // expect error message to be the only thing showing
            expect(notifySvc.stacks[otherStack].length).to.equal(1);
            expect(notifySvc.stacks[otherStack][0].text).to.equal(errorMsg + 'test');
        });
    });
});
